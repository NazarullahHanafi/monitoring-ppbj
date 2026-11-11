<?php

namespace App\Services;

use App\Support\ProcurementSearchText;

/** Bounded, opt-in spelling suggestions from the visible indexed vocabulary only. */
class ProcurementSearchSuggestions
{
    public function forQuery(string $term, string $scope, array $filters, array $plan, int $total, string $match = 'source'): array
    {
        // Codes, numeric specifications, punctuation and quoted searches are never corrected.
        if (! preg_match('/^[\p{L}\s]+$/uD', trim($term))) {
            return [];
        }
        $words = ProcurementSearchText::words($term);
        if (! $words || count($words) > 16) {
            return [];
        }
        $unknown = $plan['missing'] ?: ($total === 0 && count($words) === 1 ? $words : []);
        $unknown = array_slice(array_values(array_filter($unknown, fn ($word) => preg_match('/^[a-z]{4,24}$/D', $word))), 0, 3);
        $suggestions = [];
        foreach ($unknown as $word) {
            $distance = strlen($word) >= 8 ? 2 : 1;
            $exact = [];
            for ($i = 0; $i < strlen($word); $i++) {
                $exact[] = substr($word, 0, $i).substr($word, $i + 1);
                if ($i + 1 < strlen($word)) {
                    $exact[] = substr($word, 0, $i).$word[$i + 1].$word[$i].substr($word, $i + 2);
                }
            }
            // Indexed equality candidates cover a damaged/missing initial letter,
            // including vocabulary outside the curated synonym groups.
            foreach (range('a', 'z') as $letter) {
                foreach ([0, 1] as $position) {
                    $exact[] = substr_replace($word, $letter, $position, 1);
                    $exact[] = substr_replace($word, $letter, $position, 0);
                }
            }
            foreach (config('procurement_search.equivalents', []) as $group) {
                foreach ($group as $candidate) {
                    if (is_string($candidate) && $this->distance($word, $candidate) <= $distance) {
                        $exact[] = $candidate;
                    }
                }
            }
            $vocabulary = app(ProcurementUnifiedSearch::class)->vocabulary($scope, $filters);
            $candidates = (clone $vocabulary)->where(function ($query) use ($exact, $word) {
                $query->whereIn('term', array_unique($exact))->orWhere('term', 'like', substr($word, 0, 3).'%');
            })->orderBy('term')->limit(80)->pluck('term');
            // A second, still indexed prefix range is used only when the first yielded no close word.
            $close = $this->close($word, $candidates->all(), $distance);
            if (! $close) {
                $close = $this->close($word, (clone $vocabulary)->where('term', 'like', substr($word, 0, 2).'%')->orderBy('term')->limit(80)->pluck('term')->all(), $distance);
            }
            foreach (array_slice($close, 0, 2) as $candidate) {
                $query = implode(' ', array_map(fn ($value) => $value === $word ? $candidate : $value, $words));
                if (mb_strlen($query) > 255) {
                    continue;
                }
                $suggestions[] = ['word' => $word, 'replacement' => $candidate, 'query' => $query];
                if (count($suggestions) >= 4) {
                    return app(ProcurementUnifiedSearch::class)->confirmedSuggestions($suggestions, $scope, $filters, $match);
                }
            }
        }

        return app(ProcurementUnifiedSearch::class)->confirmedSuggestions($suggestions, $scope, $filters, $match);
    }

    private function close(string $word, array $candidates, int $limit): array
    {
        $values = [];
        foreach ($candidates as $candidate) {
            if ($candidate === $word || ! preg_match('/^[a-z]{4,24}$/D', $candidate)) {
                continue;
            }
            $distance = $this->distance($word, $candidate);
            if ($distance <= $limit) {
                $values[$candidate] = $distance;
            }
        }
        uksort($values, fn ($a, $b) => $values[$a] <=> $values[$b] ?: strcmp($a, $b));

        return array_keys($values);
    }

    private function distance(string $a, string $b): int
    {
        $distance = levenshtein($a, $b);
        if ($distance !== 2 || strlen($a) !== strlen($b)) {
            return $distance;
        }
        $different = [];
        for ($i = 0; $i < strlen($a); $i++) {
            if ($a[$i] !== $b[$i]) {
                $different[] = $i;
            }
        }

        return count($different) === 2 && $different[1] === $different[0] + 1 && $a[$different[0]] === $b[$different[1]] && $a[$different[1]] === $b[$different[0]] ? 1 : $distance;
    }
}
