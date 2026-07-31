#!/usr/bin/env node
'use strict';

const { run } = require('../.aexos-core/core/graph-dashboard/cli');

run(process.argv.slice(2)).catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
