import 'colors';

const info = (msg) => console.log(`${'info'.blue.bold} ${msg}`);
const warn = (msg) => console.log(`${'warning'.yellow.bold} ${msg}`);
const error = (msg) => console.log(`${'error'.red.bold} ${msg}`);

export { info, warn, error };
