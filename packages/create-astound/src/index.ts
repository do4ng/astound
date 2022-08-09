#!/usr/bin/env node

import 'colors';
import inquirer from 'inquirer';
import fse from 'fs-extra';
import { join } from 'path';

async function main() {
  const app = await inquirer.prompt([
    {
      name: 'name',
      message: 'Project Name',
      default: 'my-app',
    },
    {
      name: 'typescript',
      type: 'list',
      message: 'What language do you use?',
      choices: ['typescript', 'javascript'],
    },
  ]);

  if (app.typescript) {
    fse.copySync(join(__dirname, '../template/with-typescript'), process.cwd());
  } else {
    fse.copySync(join(__dirname, '../template/with-javascript'), process.cwd());
  }
  fse.copySync(join(__dirname, '../template/__'), process.cwd());
  const pkg = JSON.parse(fse.readFileSync(join(process.cwd(), 'package.json')).toString());
  pkg.name = app.name;
  fse.writeFileSync(join(process.cwd(), 'package.json'), JSON.stringify(pkg, null, 2));
}
main();
