import { sync } from 'fast-glob';
import { join } from 'path';
import { Config } from '../../types/config';

function getIgnore(config: Config) {
  return config.ignores || ['node_modules', '.git'];
}

export default function files(config: Config) {
  return sync('**', {
    dot: true,
    ignore: getIgnore(config),
    cwd: join(process.cwd(), config.app || 'app'),
  });
}
