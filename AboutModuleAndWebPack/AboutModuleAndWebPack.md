# ファイル分割

## 一般的なファイル分割方法
- ファイルを分割し、必要なファイルを`script`タグに並べる。
- `script`タグに並べる場合は順番によってエラーが出る場合もあるので注意。
```typescript
// file1.ts
class MyClass1 {

}

// file2.ts
class MyClass2 {

}

// main.ts
console.log("hello!")
```
```html
<script src="dist/file1.js" defer></script>
<script src="dist/file2.js" defer></script>
<script src="dist/main.js" defer></script>
```

## ESモジュールによるファイル分割方法
- `export`と`import`を用いる。
- `export`は`class`、`const`、`let`、`const`、`type`、`interface`にも使える。
- typescriptのコンパイル時にファイル名は変更されないので、インポートパスには`.js`をつける。
- 環境によっては`.js`は不要。
- 具体的には、ts.configの`"compilerOptions"`の`"module"`項目が`"ESNext`や`"NodeNext"`となっていると、トランスパイ後のモジュールがESMに設定されているため`.js`が必要。
- `"module"`項目が`"Commonjs"`となっているなら`.js`はなくても良い。
- `.js`となっていても同じ名前の`.ts`ファイルを探しに行くので型は正しくつく。
```typescript
export class MyClass {

}

export let myArg: str

import { MyClass } from "./path/class.js";
import { myArg } from "./path/arg.js";
```

#### `"commonjs"`
- `"module"`項目が`"Commonjs"`となっていると、`import`と`export`は`require`や`exports`に変換される。
```typescript
// typescript
import { MyClass1 } from "./path/class.js";
export class MyClass2 {

}
```
```javascript
// javascript
class_js_1 = require{"./path/class.js"};
exports.MyClass2 = MyClass2;
```

#### `"ES6"`
- `"module"`項目が`"ES6"`となっていると、`import`と`export`は`import`や`export`にそのまま変換される。
```typescript
// typescript
import { MyClass1 } from "./path/class.js";
export class MyClass2 {

}
```
```javascript
// javascript
import { MyClass1 } from "./path/class.js";
export class MyClass2 {

}
```
- index.htmlでは、main.jsのみ`script`タグをつければよく、`type="module"`とする。
```html
<script src="dist/main.js" defer  type="module"></script>

```
## serve
- serveパッケージを使用することで、local hostを立てることができる。
- 以下でインストール
```zsh
node install -g serve
```
- ローカルサーバーを建てる
```zsh
serve
```

## `as`, `*`, `default`
- `import`には`as`や`*`をつかうことができる。
```typescript
import { MyClass as MC} from "./path/.class.js";
// MCという名前でimportできる。

import * from "./path/class.js";
// class.jsで定義されているものをすべてインポートできる。

export default class MyClass {

}
// MyClassが記述されているファイルのimportはdefalutがMyClassとなる。よって以下のように記述可能。
import MC from "./path/.myClass.js";
// MCがMyClassとなる。
```

## type-only Imports
- `import`するもの前にtypeをつけることでtype-only Importが可能。
```typescript
import type { MyClass } from "./path/myClass.js";
import { myArg, type MyClass } from "./path/myFile.js"
```
- type-only Importsによってimportしたものは、値として使えなく、型としてのみ使える。
```typescript
import type { MyClass } from "./path/MyClass.js";

MyClass.module(); // 値としては使えない。
let myClass: MyClass; // 型としてのみ使える。
```

## moduleとscript
- modulて定義されているものは、`import`や`export`をしないと他のscriptやmoduleからはアクセスできないが、scriptは`import`や`export`は不要。
- ブラウザでのjavascriptにおけるmoduleとscriptの違いは、`script`タグの`type`の部分で決まる。
```html
<script src="dist/main.js" defer  type="module"></script>
<!--moduleとして扱われる-->

<script src="dist/main.js" defer  type="module"></script>
<!--scriptして扱われる-->
```
- typescriptでは、`import`や`export`があるとmoduleとしてコンパイルされ、ないとscriptとしてコンパイルされる。

## webpack
- javascriptやpngなどをまとめるときに使うバンドル。
- まず以下でインストール
```zsh
npm init -y
npm install --save-dev webpack webpack-cli
```
- `npm install ~`を行うとpackage-lock.jsonとpackage.jsonが作成される。これらがあれば、`npm install`で必要な依存関係をインストールできる。
- `--save-dev`でテスト環境用のパッケージとしてインストールできる。


- `webpack`コマンドを使用してバンドルファイルを作成するので、このコマンドに名前をつける。
```json
// package.json
"scripts": {
    "build": "webpack"
  }
```
- webpack.config.jsを作成し、中に以下を記入。
- `__dirname`でカレントディレクトリを表す。
```javascript
module.exports = {
    entry: './dist/main.js',
// webpackのエントリポイントを指定。
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    }
    // バンドルされたファイルの出力先を指定。
}
```
- webpackよって、複数のjavascriptモジュールを一つのbundle.jsにまとめることができる（"build": "webpack"とした時の例）。
```zsh
npm run build
```
- `tsc`をしてからこのコマンドをすることで、tsモジュール-> jsモジュール->bundle.jsの流れで一つのファイルにコンパイルすることができる。

## ts-loader
- ts-loaderとは、tsモジュールからバンドルに一度で変換するパッケージ。まずはインストール。
```zsh
npm install --save-dev ts-loader
```
- webpack.config.jsを以下のように変更。
```javascript
module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            // .tsで終わるファイルに対して、
            use: 'ts-loader',
            // ts-loaderを用いる。
            exclude: /node_modules/,
            // ただし、node_modulesの中の.tsで終わるファイルは例外。
        },
        ]
    }
}
```
- バンドルjsファイルは全てのファイルをひとつにまとめるので、`import`、`export`は消滅する。よって、
```typescript
import { MyClass } from "./myClass.ts";
```
としてしまって、
```zsh
npm run build
```
を実行すると動く。しかしtypescriptコンパイラは通らないので、エディタ上はエラーが出てしまう。
- 一方、
```typescript
import { MyClass } from "./myClass";
```
このようにすると、`"module"`が`"ES6"`であれば自動で.tsを補完してくれ、コンパイラはエラーを出さない。しかし今度は、
```zsh
npm run build
```
がエラーを出してしまう。そこで、以下をwebpack.config.jsに加える。
```javascript
resolve: {
        extensions: ['.ts', '.js'],
    }
```
これによって、
```zsh
npm run build
```
を実行した時にファイルパスが見つからないと、左から順（この場合なら".ts" -> ".js"）にファイルパスの末尾に付け加えてファイルを探しに行く。

- ts.configでの`"moduleResolution"`を`"Bundler"`にすると、ファイルパスが見つからなかった時に、一般のバンドラーと同じ挙動（.tsをつける->.jsをつける）となる。


## RnD環境(webpack-dev-server)
- webpack-dev-serverでRnD用の環境を構築できる。
```bash
npm install --save-dev webpack-dev-server webpack-cli
```
- package.jsonで`"webpack-dev-serve"`コマンドを割り当てて動かす。
- index.htmlやstyle.cssなどは、publicというディレクトリを作成しその中で管理しなければならない。
```json
// pakage.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "build:dev": "webpack-dev-server"
  },
```
- webpack-dev-serverを使うとlocalサーバーをたてられる。
- bundle.jsはディレクトリには作成されず、メモリ内で保存される。
- デフォルト設定だと、メモリ内部で保存されるのは/bundle.jsになってしまう。このときwebpack.config.jsに以下を追加すれば./dist/bundle.jsとしてメモリ内部で保存される。
```javascript
// webpackage.js
output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
        publicpath: '/dist/',
    }
```


## productionとdevelopentで設定を分ける
- webpack.config.jsに、`"mode"; "development"`を追加すると、開発環境用のbundleファイルが作成される。
```javascript
module.exports = {
    mode: 'development',
    // other settings
    },
```
- productionとdevelopmentで設定を分けたいときは、configファイルを二つ作って、productionは`"webpack"`コマンドを、developmentは`"webpack-dev-server"`コマンドを割り当てれば良い。
```json
// package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.prod-config.js",
    "build:dev": "webpack-dev-server --config webpack.dev-config.js"
  },
```
