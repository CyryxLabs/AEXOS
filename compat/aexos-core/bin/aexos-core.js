#!/usr/bin/env node
'use strict';

const path = require('path');

const binByName = {
  aexos: 'aexos.js',
  'aexos-core': 'aexos.js',
  'aexos-minimal': 'aexos-minimal.js',
  'aexos-graph': 'aexos-graph.js',
  'aexos-delegate': 'aexos-delegate.js',
};

const invokedAs = path.basename(process.argv[1] || 'aexos-core');
const targetBin = binByName[invokedAs] || 'aexos.js';

require(`@aexos-squads/core/bin/${targetBin}`);
