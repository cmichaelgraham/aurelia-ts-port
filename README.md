# [aurelia-ts-port](https://github.com/cmichaelgraham/aurelia-ts-port)

> a spike to attempt to port aurelia code into typescript

The process is to take the ES6 Aurelia source code, maintain a local copy here for comparison when porting across new code changes:
[aurelia repo source code](https://github.com/cmichaelgraham/spike-aurelia-ts-port/tree/master/aurelia-latest)

Using the source from above, the next step in the process is to create equivalent, matching typescript source code by copying `.js` files and renaming them `.ts` extension, changing all ambient imports (`import {Router} from 'aurelia-router'`) to explicit imports (`import {Router} from '../router/index'`), making small edits to make the typescript compiler happy, and adding typescript type annotations:
[aurelia repo typescript-converted source code](https://github.com/cmichaelgraham/spike-aurelia-ts-port/tree/master/aurelia-ts)

The atom editor, with its built-in, updated, almost-typescript-1.5 atom-typescript package is used to build the `.js` files in ES5 format, identify compile-time errors, and provide intellisense.
[build output](https://github.com/cmichaelgraham/spike-aurelia-ts-port/tree/master/aurelia-ts)

## clone and build

1. clone this repo
2. run `git bash` shell, change to the main folder
3. install atom
4. install atom-typescript: run `apm install atom-typescript`
5. open the clone folder in atom
6. <f6> to build the typescript files

## process steps - to add (or update) aurelia repos (or add new files):

1. run `./get-latest.sh`
    > this is a `git bash` script to help keep the aurelia-latest up to date

  1. clones aurelia repos into `aurelia-latest-repos`
  2. copies `src` folder from each repo into corresponding folder in `aurelia-latest`
3. manually copy `.js` files from `aurelia-latest` into `aurelia-ts` (rename each to `.ts`)
4. replace ambient imports (`import {Router} from 'aurelia-router'`) to explicit imports (`import {Router} from '../router/index'`)
