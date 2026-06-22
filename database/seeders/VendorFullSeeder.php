<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VendorFullSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('vendors')->insertOrIgnore([
            ['nama_vendor'=>'CV. Archi Tama Karya','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Citra Selaras','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Kohasima Jaya, CV. Kemilau Tani Group, CV. Hakim Jaya Perkasa, CV. Rama Lestari Abadi','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Multi Kreasi Bersama','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Multikreasi Bersama','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Prestasi Anak Melayu','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Raafindo Kontruksi','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. Riadi Rajasa Group','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'CV. XX','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'KOPKAR SUCOFINDO','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'Khairani Syahpitri Situmorang','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'Kop Sucofindo Pusat','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'Koperasi Sucofindo','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'Kopkar Sucofindo','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT Gama Putra Pratama','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Bangun Selaras Solusindo','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Bensra Sukses Indonesia','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Berkah Gasindo Sentosa','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Gama Putra Pratama','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Genesindo Energi Nusantara, CV. Kohasima Jaya, CV. Rama Lestari Abadi','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Genesindo Energi Nusantara, CV. Rama Lestari Alam, CV. Kohasima Jaya','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Merck Chemicals and Life Sciences','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Mutiara Labsains','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Profita Abadi','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Sinergi Utama','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Sinergi Utama Services','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['nama_vendor'=>'PT. Wiralab Analitika Solusindo','is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
        ]);
        $this->command->info('Vendors: ' . DB::table('vendors')->count() . ' records.');
    }
}
