<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = [
            'KOPKAR SUCOFINDO',
            'Koperasi Sucofindo',
            'PT. Gama Putra Pratama',
            'CV. Kohasima Jaya',
            'CV. Kemilau Tani Group',
            'CV. Hakim Jaya Perkasa',
            'CV. Rama Lestari Abadi',
            'CV. Rama Lestari Alam',
            'PT. Berkah Gasindo Sentosa',
            'PT. Bensra Sukses Indonesia',
            'CV. Multikreasi Bersama',
            'PT. Sinergi Utama Services',
            'CV. Archi Tama Karya',
            'PT. Merck Chemicals and Life Sciences',
            'Khairani Syahpitri Situmorang',
            'PT. Profita Abadi',
            'PT. Mutiara Labsains',
            'CV. Citra Selaras',
            'PT. Genesindo Energi Nusantara',
            'PT. Wiralab Analitika Solusindo',
            'CV. Prestasi Anak Melayu',
            'CV. Riadi Rajasa Group',
            'CV. Raafindo Kontruksi',
            'PT. Bangun Selaras Solusindo',
        ];

        foreach ($vendors as $v) {
            DB::table('vendors')->insertOrIgnore([
                'nama_vendor' => $v,
                'is_active'   => true,
                'created_at'  => now(),
                'updated_at'  => now(),
            ]);
        }
    }
}
