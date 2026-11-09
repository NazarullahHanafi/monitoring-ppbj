const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('public/assets/app/attachment-intent.js', 'utf8'), context);
const { detect } = context.AttachmentIntent;

test('attachment intent recognizes references and pending details without matching ordinary procurement text', () => {
    for (const text of ['ATK terlampir', '<p>Rincian</p><p>menyusul</p>', 'lihat lampiran', 'sesuai lampiran', 'dilampirkan', 'ter lampir', 'lampiran', 'attachment to follow', 'as attached', 'detail akan menyusul']) assert.equal(detect(text), true, text);
    for (const text of ['Kertas A4', 'tanpa lampiran', 'tidak perlu lampiran', 'tidak ada lampiran', 'Pengadaan alat tulis kantor']) assert.equal(detect(text), false, text);
});
