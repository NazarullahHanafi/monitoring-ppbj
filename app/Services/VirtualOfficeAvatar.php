<?php

namespace App\Services;

class VirtualOfficeAvatar
{
    public const GAMES = ['tennis', 'badminton', 'uno', 'pingpong', 'basketball', 'billiards', 'chess', 'foosball', 'darts', 'arcade', 'bowling', 'golf', 'archery'];
    public static function costumes(): array { static $data;return $data??=json_decode(file_get_contents(resource_path('data/virtual-office-costumes.json')),true,512,JSON_THROW_ON_ERROR); }
    public const COLORS = ['emerald', 'navy', 'rose', 'cream', 'lavender', 'terracotta'];

    public static function defaults(?string $gender = null, int $seed = 0): array
    {
        return ['style' => $gender === 'female' ? 'feminine' : 'masculine', 'hair' => $gender === 'female' ? 'long' : 'short',
            'outfit' => 'blazer', 'costume'=>'none', 'color' => self::COLORS[$seed % count(self::COLORS)], 'skin' => 'warm', 'accessory' => 'none', 'game' => self::GAMES[$seed % count(self::GAMES)]];
    }

    public static function sanitize(mixed $value, ?string $gender = null, int $seed = 0): array
    {
        $defaults = self::defaults($gender, $seed);
        if (is_string($value)) {
            $value = json_decode($value, true);
        }
        if (! is_array($value)) {
            return $defaults;
        }
        foreach (self::options() as $key => $options) {
            if (in_array($value[$key] ?? null, $options, true)) {
                $defaults[$key] = $value[$key];
            }
        }
        return $defaults;
    }

    public static function options(): array
    {
        return ['style' => ['feminine', 'masculine'], 'hair' => ['short', 'bob', 'long', 'ponytail', 'hijab'],
            'outfit' => ['blazer', 'casual', 'sport', 'dress'], 'color' => self::COLORS,
            'skin' => ['light', 'warm', 'tan', 'deep'], 'accessory' => ['none', 'glasses', 'headphones'], 'costume'=>array_merge(['none'],array_column(self::costumes(),'id')), 'game' => self::GAMES];
    }
}
