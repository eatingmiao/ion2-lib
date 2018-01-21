'use strict';
import * as del from 'del';
import { dest, src, start, task } from 'gulp';
import * as runSequence from 'run-sequence';
import {exec} from "child_process";
import * as inlineTemplates from 'gulp-inline-ng2-template';
import {writeFileSync} from "fs";

const INLINE_TEMPLATES = {
  TMP: './tmp',
  TS_SRC: './src/lib/**/*.ts',
  PROJECT_ROOT : '../..',
  TARGETDIST : './dist',
  CONFIG: {
    base: './src/lib',
    target: 'es6',
    useRelativePaths: true,
  }
};

task('prepareReleasePackage', (done: (err: any) => void) => {
  runSequence(
    'clean',
    'inline-templates',
    'compile.release',
    'release.sass',
    'copy.assets',
    'release.preparePackageJsonTemplate',
    'copy.readme',
    'cleantmp',
    done
  );
});
task('clean', (done: Function) => {
  del([INLINE_TEMPLATES.TARGETDIST]).then(() => {
    done();
  }).catch(err => {
    done(err);
  });
});
task('cleantmp', (done: Function) => {
  del([INLINE_TEMPLATES.TMP]).then(() => {
    done();
  }).catch(err => {
    done(err);
  });
});

task('inline-templates', function() {
  return src(INLINE_TEMPLATES.TS_SRC)
    .pipe(inlineTemplates(INLINE_TEMPLATES.CONFIG))
    .pipe(dest(INLINE_TEMPLATES.TMP));
});

task('compile.release', function(callback) {
  exec('npm run ngcompile', function (error, stdout, stderr) {
    callback(error)
  });
});
task('release.sass', function () {
  return src([INLINE_TEMPLATES.CONFIG.base+'/**/*.scss']).pipe(dest(INLINE_TEMPLATES.TARGETDIST));
});
task('copy.assets', function () {
  return src([INLINE_TEMPLATES.CONFIG.base+'/assets/**/*']).pipe(dest(INLINE_TEMPLATES.TARGETDIST+'/assets/'));
});
task('release.preparePackageJsonTemplate', () => {
  let templatePackageJSON = require(`${INLINE_TEMPLATES.PROJECT_ROOT}/scripts/package.json`);
  const sourcePackageJSON = require(`${INLINE_TEMPLATES.PROJECT_ROOT}/package.json`);
  // copy source package.json data to template
  templatePackageJSON.name = sourcePackageJSON.name;
  templatePackageJSON.version = sourcePackageJSON.version;
  templatePackageJSON.description = sourcePackageJSON.description;
  templatePackageJSON.keywords = sourcePackageJSON.keywords;

  // copy source dependencies versions to the template's peerDependencies
  // only copy dependencies that show up as peerDependencies in the template
  for (let dependency in sourcePackageJSON.dependencies) {

    // if the dependency is in both, AND the value of the entry is empty, copy it over
    if (dependency in templatePackageJSON.peerDependencies && templatePackageJSON.peerDependencies[dependency] === '') {
      templatePackageJSON.peerDependencies[dependency] = sourcePackageJSON.dependencies[dependency];
    }
  }
  writeFileSync(`${INLINE_TEMPLATES.TARGETDIST}` + '/package.json', JSON.stringify(templatePackageJSON, null, 2));
});
task('copy.readme', function () {
  return src([INLINE_TEMPLATES.CONFIG.base+'/README.md']).pipe(dest(INLINE_TEMPLATES.TARGETDIST));
});

