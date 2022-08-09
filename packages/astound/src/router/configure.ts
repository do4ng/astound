import { basename, extname, join, parse } from 'path';
import { Config } from '../../types/config';
import files from './files';

export function fileData(file: string) {
  const f = file;
  file = join(parse(file).dir, basename(file, extname(file)));

  if (parse(file).name === 'index') {
    file = file.slice(0, -5);
  }

  const path = file.replace(/\[\.{3}.+\]/g, '*').replace(/\[(.*?)\]/g, ':$1');
  const params = file.match(/\[(.*?)\]/g)?.map((match) => match.slice(1, match.length - 1));

  return {
    path,
    params,
    ext: parse(f).ext.replace('.', ''),
    file: f.replace(/\\/g, '/'),
  };
}

export function ConfigureRoutes(config: Config) {
  return files(config).map((file) => fileData(file));
}
