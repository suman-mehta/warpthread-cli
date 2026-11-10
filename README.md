# warpthread-cli
**Blazing‑fast concurrency and low‑level system utilities for Node.js**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/Version-1.0.0-lightgrey.svg)](https://github.com/yourname/warpthread-cli)
[![Stars](https://img.shields.io/github/stars/yourname/warpthread-cli.svg)](https://github.com/yourname/warpthread-cli/stargazers)
[![Issues](https://img.shields.io/github/issues/yourname/warpthread-cli.svg)](https://github.com/yourname/warpthread-cli/issues)

## Installation

```bash
git clone https://github.com/yourname/warpthread-cli.git
cd warpthread-cli
node src/index.js --help
```

## Quick Start

Run a CPU benchmark across all cores:

```bash
node src/index.js bench 5000000
```

Measure raw memory copy speed for a 20 MB buffer:

```bash
node src/index.js memcpy 20
```

## Terminal Showcase

```text
$ node src/index.js bench 1000000
Benchmark completed in 123.45 ms across 8 threads.
```

## Architecture

```mermaid
flowchart TD
    A["CLI Entry"] --> B["Parse Arguments"]
    B --> C{Command?}
    C -->|bench| D["Spawn Workers"]
    D --> E["Collect Results"]
    E --> F["Print Summary"]
    C -->|memcpy| G["Allocate Buffers"]
    G --> H["Copy & Time"]
    H --> F
    F --> I["process.exit(0)"]
```

## Test Results

## 🧪 Real-World Test Telemetry

> [!NOTE]
> Verified automatically using Node.js native test runner (`node:test` & `node:assert/strict`).

```bash
▶ node --test
TAP version 13
# Subtest: bench command runs and exits with code 0
ok 1 - bench command runs and exits with code 0
  ---
  duration_ms: 92.726777
  ...
# Subtest: memcpy command reports copy time
ok 2 - memcpy command reports copy time
  ---
  duration_ms: 42.705788
  ...
1..2
# tests 2
# suites 0
# pass 2
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 193.773751
```

## License

MIT © 2026 Suman Mehta