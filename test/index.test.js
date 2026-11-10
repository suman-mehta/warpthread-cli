import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cliPath = resolve(__dirname, '..', 'src', 'index.js');

test('bench command runs and exits with code 0', async (t) => {
  const proc = spawn('node', [cliPath, 'bench', '10000']);
  let output = '';
  for await (const chunk of proc.stdout) {
    output += chunk;
  }
  const exitCode = await new Promise((res) => proc.on('close', res));
  assert.equal(exitCode, 0);
  assert.match(output, /Benchmark completed in .* ms/);
});

test('memcpy command reports copy time', async (t) => {
  const proc = spawn('node', [cliPath, 'memcpy', '1']);
  let output = '';
  for await (const chunk of proc.stdout) {
    output += chunk;
  }
  const exitCode = await new Promise((res) => proc.on('close', res));
  assert.equal(exitCode, 0);
  assert.match(output, /Copied 1 MB in .* ms/);
});
