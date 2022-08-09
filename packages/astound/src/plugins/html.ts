import { Plugin } from '../../types';

function HTMLPlugin(): Plugin {
  return {
    name: 'html-plugin',

    transform(id: string, code: string) {
      if (id.endsWith('.html')) {
        return {
          type: 'html',
          code,
        };
      }
    },
  };
}

export default HTMLPlugin;
