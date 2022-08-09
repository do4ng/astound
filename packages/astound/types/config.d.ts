import { Plugin } from './plugins';
import { ServerOptions } from './server';

export interface Config {
  /**
   * default: `./app`
   */
  app?: string;

  /**
   * (exclude body, head)
   * default: `#app`
   */
  type?: string;

  /**
   * default: `['node_modules', '.git']`
   */
  ignores?: string[];

  /**
   * allow typescript
   */
  ts?: boolean;

  /**
   * default: `./public`
   */
  public?: string;

  server?: ServerOptions;

  plugins?: Array<Plugin | string>;
}
