import { Config } from './config';

type Files = Array<{
  path: string;
  params: string[];
  ext: string;
  file: string;
}>;
type Module = any;

export * from './plugins';
export * from './config';
export * from './server';
export function watch(config?: Config): Promise<void>;
export function defineConfig(config?: Config): Config;
export function getConfig(cwd?: string): Config;
export function Client(): Plugin;
export function HTMLPlugin(): Plugin;
export function builder(file: Files, config: Config);
export function updatePage(file: Files, config: Config);
export function newPage(file: Files, config: Config);
export function removePage(file: Files, config: Config);
export function build(config?: Config);
export function ConfigureRoutes(config: Config): Files;
export function loadModule(file: string, config: { cfg: Config; alias: string }): Module;
