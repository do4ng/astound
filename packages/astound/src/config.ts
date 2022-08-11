import { existsSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { Config } from '../types';

export function defineConfig(config: Config = {}) {
  return config;
}

export function getConfig(cwd: string = process.cwd()): Config {
  let config = {};

  if (existsSync(join(cwd, 'astound.json'))) {
    config = JSON.parse(readFileSync(join(cwd, 'astound.json')).toString());
  } else if (existsSync(join(cwd, 'astound.config.js'))) {
    config = require(relative(__dirname, join(cwd, 'astound.config.js')));
  }

  return (config as Config) || {};
}
