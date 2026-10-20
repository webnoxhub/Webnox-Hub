// Dependency-free publishing allowlist. Run from any directory with Node 22+.
// Internal notes, source tooling, credentials and future functions never enter dist.
import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Unsafe output path');
await rm(output, { recursive: true, force: true });
await mkdir(output);
await cp(path.join(root, 'index.html'), path.join(output, 'index.html'));
await cp(path.join(root, 'robots.txt'), path.join(output, 'robots.txt'));
await mkdir(path.join(output, 'pages'));
for (const entry of await readdir(path.join(root, 'pages'), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
        await cp(path.join(root, 'pages', entry.name), path.join(output, 'pages', entry.name));
    }
}
for (const file of ['css/style.css', 'js/main.js', 'images/logo.png']) {
    const destination = path.join(output, 'assets', file);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(root, 'assets', file), destination);
}
// A manual upload does not read the source netlify.toml: include equivalent headers.
await writeFile(path.join(output, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Robots-Tag: noindex
`);
console.log(`Prepared public files in ${output}`);
