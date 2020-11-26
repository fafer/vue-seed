#!/usr/bin/env node
'use strict';

const conf = require('../conf');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const meow = require('meow');
let templateDir = path.join(__dirname, '../template');
let pageTemplateDir = path.join(templateDir, 'page');
let componentTemplateDir = path.join(templateDir, 'component');

let htmlTemplate = 'index.html';

let scriptTemplate = 'index.js';

let htmlTemplatePath = path.join(pageTemplateDir, htmlTemplate);

let scriptTemplatePath = path.join(pageTemplateDir, scriptTemplate);

let htmlStr;
let scriptStr;

function addComponent(name) {
  let componentPath = path.join(
    conf.SRC_PATH,
    `components/${name.charAt(0).toUpperCase() + name.substring(1)}`
  );
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath);
    fs.copyFile(
      path.join(componentTemplateDir, 'index.scss'),
      path.join(componentPath, 'index.scss'),
      function (e) {}
    );
    fs.copyFile(
      path.join(componentTemplateDir, 'index.vue'),
      path.join(componentPath, 'index.vue'),
      function (e) {}
    );
  }
}

function add(name, title = '') {
  let addPath = path.join(conf.ENTRY_PATH, name);

  let htmlTemp;
  let scriptTemp;
  if (fs.existsSync(addPath)) {
    console.warn(`${conf.ENTRY_PATH} directory has ${name}`);
    return;
  } else {
    fs.mkdirSync(addPath);
  }
  addComponent(name);
  if (!htmlStr) htmlStr = fs.readFileSync(htmlTemplatePath).toString();
  htmlTemp = htmlStr
    .replace(/\$\{base\}/gi, conf.PUBLICBASE)
    .replace(
      /\$\{name\}/gi,
      `${path.basename(conf.ENTRY_PATH)}${conf.ENTRY_SEPERATE}${name}${
        conf.ENTRY_SEPERATE
      }${path.basename(scriptTemplate, '.js')}`
    )
    .replace(/\$\{title\}/gi, title);
  fs.writeFile(path.join(addPath, htmlTemplate), htmlTemp, (err) => {
    if (err)
      console.error(`write ${path.join(addPath, htmlTemplate)} failed`, err);
  });
  if (!scriptStr) scriptStr = fs.readFileSync(scriptTemplatePath).toString();
  scriptTemp = scriptStr
    .replace(/Name/gi, name)
    .replace(
      /\$\{Component\}/gi,
      name.charAt(0).toUpperCase() + name.substring(1)
    );
  fs.writeFile(path.join(addPath, scriptTemplate), scriptTemp, (err) => {
    if (err)
      console.error(`write ${path.join(addPath, scriptTemplate)} failed`, err);
  });
}

const cli = meow(
  `
	Usage
	  $ npm run add -- <filename>, create file

	Options
    --title, -t,page title
    --component, -c,component

  Examples
    $ npm run add -- test
    $ npm run add -- test --title=test
    $ npm run add -- test --component=test
  Help
    $ npm run add -- --help
`,
  {
    description: false,
    flags: {
      title: {
        type: 'string',
        alias: 't',
      },
      component: {
        type: 'string',
        alias: 'c',
      },
    },
  }
);

const options = {
  filename: cli.input[0],
  title: cli.flags.title,
  component: cli.flags.component,
};

if (options.component) {
  addComponent(options.component);
} else {
  if (!options.filename) {
    ora('').fail(chalk.red('please input filename'));
    cli.showHelp(0);
  } else {
    add(options.filename || '', options.title || '');
  }
}
