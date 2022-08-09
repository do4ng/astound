/* eslint-disable prefer-const */
import esbuild from 'esbuild';
import { join, relative } from 'path';
import { Config } from '../../types/config';
import { error } from '../logger';
import { mkdir } from '../mkdir';
import { generateRandom } from '../random';

export function generateModule(file: string, config: { cfg: Config; alias: string }): any {
  const root = join(process.cwd(), config.cfg.public || './public', '.astound');
  mkdir(root);

  if (!config.cfg.ts && file.endsWith('.ts')) error(`unable to read Typescript File - ${file.bold}`);

  const c = generateRandom();

  // eslint-disable-next-line no-unused-expressions
  esbuild.buildSync({
    entryPoints: [file],
    outfile: join(root, 'server', `${c}.js`),
    bundle: true,
    minify: true,
    format: 'cjs',
  }).errors;

  return c;
}

type Module = any;

export function loadModule(file: string, config: { cfg: Config; alias: string }): Module {
  const root = join(process.cwd(), config.cfg.public || './public', '.astound');
  const c = generateModule(file, config);
  return require(relative(__dirname, join(root, 'server', `${c}.js`)));
}
