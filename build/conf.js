const path = require('path');
const fs = require('fs');
const resolveExtensions = /\.js$/;

const getEntry = function (
  pathname,
  base = path.basename(pathname),
  entry = {}
) {
  let files = fs.readdirSync(pathname);

  let name = '';
  files.forEach(function (file) {
    if (fs.lstatSync(path.join(pathname, file)).isDirectory()) {
      getEntry(
        path.join(pathname, file),
        `${base}${ENTRY_SEPERATE}${file}`,
        entry
      );
    } else if (resolveExtensions.test(file)) {
      name = `${base}${ENTRY_SEPERATE}${file.replace(resolveExtensions, '')}`;
      entry[name] = path.join(pathname, file);
    }
  });
  return entry;
};

const SRC_PATH = path.join(__dirname, '../src');

const OUT_PATH = path.join(__dirname, '../dist');

const ENTRY_PATH = path.join(__dirname, '../src/pages');

const ENTRY_SEPERATE = '/';

const COPY_PATH = path.join(__dirname, '../src/lib');

const COPY_DEST_PATH = path.join(OUT_PATH, 'lib');

const PUBLICBASE = '';

const BASEPATH = PUBLICBASE ? PUBLICBASE + '/' : '/';

const VENDOR = ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios'];

const HOST = {
  js: '',
  css: '',
  img: '',
};
const PUBLICPATH = HOST.js ? `//${HOST.js}${BASEPATH}` : BASEPATH;
const IMGPUBLICPATH = HOST.img ? `//${HOST.img}${BASEPATH}` : BASEPATH;
const CSSPUBLICPATH = HOST.css ? `//${HOST.css}${BASEPATH}` : BASEPATH;

module.exports = {
  SRC_PATH,
  OUT_PATH,
  ENTRY_PATH,
  COPY_PATH,
  COPY_DEST_PATH,
  getEntry() {
    return getEntry(ENTRY_PATH);
  },
  ENTRY_SEPERATE,
  HOST,
  PUBLICBASE,
  BASEPATH,
  PUBLICPATH,
  IMGPUBLICPATH,
  CSSPUBLICPATH,
  VENDOR,
};
