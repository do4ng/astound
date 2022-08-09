import { existsSync, rmSync } from 'fs';

export function rmdir(dir: string): void {
  if (existsSync(dir)) rmSync(dir, { recursive: true });
}
