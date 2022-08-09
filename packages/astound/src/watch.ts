import { join } from 'path';
import chokidar from 'chokidar';
import { Config } from '../types/config';
import { fileData } from './router/configure';
import { newPage, removePage, updatePage } from './builder';

async function watch(config: Config = {}) {
  chokidar
    .watch(join(process.cwd(), config.app || 'app'), {
      ignoreInitial: true,
      cwd: join(process.cwd(), config.app || 'app'),
    })
    .on('all', (event, path) => {
      if (event === 'add') {
        newPage(fileData(path), config);
      } else if (event === 'change') {
        updatePage(fileData(path), config);
      } else if (event === 'unlink') {
        removePage(fileData(path), config);
      }
    });
}

export default watch;
