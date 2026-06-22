window.SwalHelper = {

    async prompt(options = {}) {
        const res = await Swal.fire({
            showCloseButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            confirmButtonColor: '#3B82F6',
            cancelButtonColor: '#6B7280',
            showCancelButton: true,
            ...options
        });

        if (res.dismiss) return null;
        return res.value;
    },

    loading(title = 'Loading...') {
        Swal.fire({
            title,
            html: '<div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCloseButton: false
        });
    },

    success(text = 'Berhasil') {
        return Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text,
            confirmButtonColor: '#10B981'
        });
    },

    error(text = 'Terjadi kesalahan') {
        return Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text,
            confirmButtonColor: '#EF4444'
        });
    },

    confirm(text = 'Yakin?') {
        return Swal.fire({
            icon: 'question',
            title: text,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Batal'
        }).then(r => r.isConfirmed);
    }
};
