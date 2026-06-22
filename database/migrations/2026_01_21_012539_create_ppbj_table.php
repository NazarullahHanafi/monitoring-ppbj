<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('ppbj')) {
            Schema::create('ppbj', function (Blueprint $table) {
                $table->id();

                $table->string('ppbj_no', 50);
                $table->date('tgl_ppbj')->nullable();
                $table->date('tgl_terima_pr')->nullable();

                $table->text('uraian')->nullable();
                $table->text('note')->nullable();

                $table->string('portofolio', 100)->nullable();
                $table->string('buyer', 50)->nullable();

                $table->decimal('total_sebelum_ppn', 15, 2)->default(0);

                $table->integer('target_sla_hari')->default(0);
                $table->integer('sisa_target_sla')->default(0);
                $table->integer('realisasi_sla')->default(0);

                $table->string('metode_pengadaan', 50)->nullable();

                $table->string('spph_rfq_1', 50)->nullable();
                $table->string('rfq_2', 50)->nullable();
                $table->string('rfq_3', 50)->nullable();

                $table->date('tgl_spph')->nullable();
                $table->date('closed_date')->nullable();

                $table->string('sph', 50)->nullable();
                $table->date('tgl_sph')->nullable();

                $table->string('awarding_sp', 50)->nullable();
                $table->date('tgl_awarding_sp')->nullable();

                $table->string('penyedia_eksternal', 100)->nullable();

                $table->date('tgl_spk')->nullable();
                $table->decimal('nilai_sp_spk', 15, 2)->nullable();

                $table->decimal('persentase_realisasi', 5, 2)->default(0);

                $table->date('promised_date')->nullable();
                $table->integer('time_left')->default(0);

                $table->string('do_no', 50)->nullable();

                $table->string('bpg_no', 50)->nullable();
                $table->decimal('nilai_bpg', 15, 2)->nullable();
                $table->date('tgl_bpg')->nullable();

                $table->string('receiving_transaction', 50)->nullable();

                $table->string('bpb_no', 50)->nullable();
                $table->date('tgl_bpb')->nullable();

                $table->string('no_invoice', 50)->nullable();
                $table->date('tgl_invoice')->nullable();

                $table->decimal('progres', 5, 2)->default(0);

                $table->string('keterangan', 50)->nullable();
                $table->date('tgl_diserahkan')->nullable();

                $table->timestamps();
            });
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppbj');
    }
};
