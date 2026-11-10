// run with: node make-thumbs.cjs
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = './images/catalogue-items';
const SIZE = 600; // cards show ~250-300px, so 600 covers sharp phone screens

async function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { await walk(full); continue; }
        if (!/\.webp$/i.test(entry.name) || /-thumb\.webp$/i.test(entry.name)) continue;
        const out = full.replace(/\.webp$/i, '-thumb.webp');
        if (fs.existsSync(out)) continue;
        await sharp(full).resize(SIZE, SIZE, { fit: 'cover' }).webp({ quality: 78 }).toFile(out);
        console.log('made', out);
    }
}
walk(ROOT).then(() => console.log('done'));