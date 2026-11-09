(function (root) {
    'use strict';
    function detect(value) {
        let text = String(value || '').replace(/<\/?(?:p|div|li|br)\b[^>]*>/gi, ' ').replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;|&#160;/gi, ' ').toLowerCase().replace(/\s+/g, ' ');
        text = text.replace(/\b(?:tanpa|bukan|tidak\s+(?:ada|perlu)|tak\s+perlu)\s+(?:berkas\s+)?(?:lampiran|dilampirkan)\b|\blampiran\s+tidak\s+diperlukan\b/g, '');
        return /\b(?:ter\s*lampir|di\s*lampirkan|lampirkan|lampiran|(?:lihat|sesuai|mengacu\s+(?:pada|ke))\s+(?:di\s+)?lampiran|(?:rincian|rincian\s+barang|detail|daftar\s+barang|spesifikasi|dokumen)\s+(?:akan\s+)?(?:menyusul|terpisah|dilampirkan)|attached|see\s+attachment|as\s+attached|attachment\s+to\s+follow)\b/i.test(text)
            || text.replace(/^[\s.,:;()]+|[\s.,:;()]+$/g, '') === 'lampiran';
    }
    if (typeof module !== 'undefined' && module.exports) module.exports = { detect };
    else root.AttachmentIntent = { detect };
})(typeof window !== 'undefined' ? window : globalThis);
