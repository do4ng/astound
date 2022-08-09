import { existsSync, mkdirSync } from 'fs';

export function mkdir(dir: string): void {
  if (!existsSync(dir)) mkdirSync(dir);
}
