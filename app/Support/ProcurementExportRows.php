<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;

final class ProcurementExportRows
{
    public static function snapshot(Builder $query): Builder
    {
        $id = $query->getModel()->qualifyColumn('id');
        $maximum = (clone $query)->reorder()->max($id) ?? 0;

        return (clone $query)->where($id, '<=', $maximum);
    }

    /** Read bounded batches without OFFSET or retaining all document/items models. */
    public static function rows(Builder $query, string $order = 'id'): \Generator
    {
        if (! in_array($order, ['id', 'sequence_number'], true)) {
            throw new \InvalidArgumentException('Unsupported export order.');
        }
        $id = $query->getModel()->qualifyColumn('id');
        $column = $query->getModel()->qualifyColumn($order);
        $lastId = null;
        $lastValue = null;
        do {
            $page = (clone $query)->reorder()->orderByDesc($column);
            if ($order !== 'id') {
                $page->orderByDesc($id);
            }
            if ($lastId !== null) {
                if ($order === 'id') {
                    $page->where($id, '<', $lastId);
                } elseif ($lastValue === null) {
                    $page->whereNull($column)->where($id, '<', $lastId);
                } else {
                    $page->where(fn ($part) => $part->where($column, '<', $lastValue)->orWhereNull($column)
                        ->orWhere(fn ($tie) => $tie->where($column, $lastValue)->where($id, '<', $lastId)));
                }
            }
            $rows = $page->limit(200)->get();
            foreach ($rows as $row) {
                $lastId = $row->id;
                $lastValue = $row->getAttribute($order);
                yield $row;
            }
        } while ($rows->count() === 200);
    }
}
