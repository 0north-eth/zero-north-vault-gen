// api/generateExe.js
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import { getEntropySeed } from '../zkEntropyKernel.js';

export default async function handler(req, res) {
  try {
    // 1) New per-call seed
    const seed = getEntropySeed();
    const tmpDir = os.tmpdir();
    const outExe = path.join(tmpDir, `vault-${seed}.exe`);

    // 2) Ensure temp folder exists
    await fs.ensureDir(tmpDir);

    // 3) Build a native EXE with pkg
    await new Promise((resolve, reject) => {
      exec(
        `npx pkg templates/base_vault.js --target node18-win-x64 --output "${outExe}"`,
        (err, stdout, stderr) => (err ? reject(err) : resolve())
      );
    });

    // 4) Read the binary EXE
    const fileBuffer = await fs.readFile(outExe);
    // 5) Clean up temp file
    await fs.remove(outExe);

    // 6) Stream it back with proper headers
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="vault-${seed}.exe"`
    );
    res.statusCode = 200;
    res.end(fileBuffer);
  } catch (err) {
    console.error('EXE generation error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
