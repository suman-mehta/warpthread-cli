#!/usr/bin/env node
import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { performance } from 'node:perf_hooks';
import { randomBytes } from 'node:crypto';
import process from 'node:process';

function printHelp() {
  console.log(`warpthread-cli

Usage:
  warpthread bench <iterations>
  warpthread memcpy <sizeMB>

Commands:
  bench   Run a CPU‑bound benchmark across all CPU cores.
  memcpy  Measure raw memory copy speed for a buffer of given size.`);
}

if (process.argv.length < 3) {
  printHelp();
  process.exit(0);
}

const cmd = process.argv[2];

if (cmd === 'bench') {
  const iterations = Number(process.argv[3]) || 1e6;
  const threadCount = cpus().length;
  const perThread = Math.floor(iterations / threadCount);
  let completed = 0;
  let total = 0;
  const start = performance.now();

  for (let i = 0; i < threadCount; i++) {
    const worker = new Worker(
      `import { parentPort, workerData } from 'node:worker_threads';
       let sum = 0;
       for (let i = 0; i < workerData.iter; i++) { sum += i; }
       parentPort.postMessage(sum);`,
      { eval: true, workerData: { iter: perThread } }
    );
    worker.on('message', (msg) => {
      total += msg;
      completed++;
      if (completed === threadCount) {
        const duration = performance.now() - start;
        console.log(`Benchmark completed in ${duration.toFixed(2)} ms across ${threadCount} threads.`);
        process.exit(0);
      }
    });
    worker.on('error', (err) => {
      console.error(err);
      process.exit(1);
    });
  }
} else if (cmd === 'memcpy') {
  const sizeMB = Number(process.argv[3]) || 10;
  const size = sizeMB * 1024 * 1024;
  const src = randomBytes(size);
  const dst = Buffer.allocUnsafe(size);
  const start = performance.now();
  src.copy(dst);
  const duration = performance.now() - start;
  console.log(`Copied ${sizeMB} MB in ${duration.toFixed(2)} ms.`);
  process.exit(0);
} else {
  printHelp();
  process.exit(0);
}
