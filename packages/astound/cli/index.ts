#!/usr/bin/env node

import { start } from '@astoundjs/vite';
import { build } from '../src/builder';
import * as d from '../src/index';
import watch from '../src/watch';

const command = process.argv[2];

if (command === 'dev') {
  build(d.getConfig());
  watch(d.getConfig());
  start();
}
