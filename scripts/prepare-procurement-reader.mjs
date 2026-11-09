import { cp, copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, 'public/assets/document-reader/v1');
await mkdir(output, { recursive: true });
await writeFile(path.join(output, '.htaccess'), 'Options -Indexes\n<IfModule mod_mime.c>\nAddType text/javascript .mjs\nRemoveEncoding .gz\nAddType application/octet-stream .gz\n</IfModule>\n');
for (const file of ['pdf.min.mjs', 'pdf.worker.min.mjs', 'pdf.renderer.min.mjs']) {
    await copyFile(path.join(root, 'node_modules/pdfjs-dist/build', file), path.join(output, file));
}
for (const dir of ['standard_fonts', 'cmaps', 'wasm']) {
    await cp(path.join(root, 'node_modules/pdfjs-dist', dir), path.join(output, dir), { recursive: true });
}
for (const file of ['tesseract.min.js', 'worker.min.js']) {
    await copyFile(path.join(root, 'node_modules/tesseract.js/dist', file), path.join(output, file));
}
await mkdir(path.join(output, 'core'), { recursive: true });
for (const file of await readdir(path.join(root, 'node_modules/tesseract.js-core'))) {
    if (file.endsWith('.wasm.js')) await copyFile(path.join(root, 'node_modules/tesseract.js-core', file), path.join(output, 'core', file));
}
await mkdir(path.join(output, 'lang'), { recursive: true });
for (const lang of ['eng', 'ind']) {
    await copyFile(path.join(root, 'node_modules/@tesseract.js-data', lang, '4.0.0', `${lang}.traineddata.gz`), path.join(output, 'lang', `${lang}.traineddata.gz`));
}
for (const [pkg, license] of [['pdfjs-dist', 'LICENSE'], ['tesseract.js', 'LICENSE.md'], ['tesseract.js-core', 'LICENSE']]) {
    await copyFile(path.join(root, 'node_modules', pkg, license), path.join(output, `${pkg}-LICENSE`));
}
const files = {};
async function inventory(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) await inventory(full);
        else if (entry.name !== 'manifest.json') files[path.relative(output, full).replaceAll('\\', '/')] = createHash('sha256').update(await readFile(full)).digest('hex');
    }
}
await inventory(output);
await writeFile(path.join(output, 'manifest.json'), JSON.stringify({ pdfjs: '6.5.438', tesseract: '7.0.0', files }, null, 2));
console.log(`Prepared ${Object.keys(files).length} self-hosted document reader assets.`);
