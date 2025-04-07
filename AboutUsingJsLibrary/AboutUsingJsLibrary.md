# JSのモジュールを利用

## `"moduleResolution"`
- ライブラリを使用する際、tsconfig.jsonの`"moduleResolution"`を`"bundler"`にすることで、ライブラリ名だけでインポートが可能。
- bundler（など）にすると、自動でnode_modulesの同じ名前のディレクトリを探しに行ってくれる。
```json
// tsconfig.json
"module": "ES6",
"moduleResolution": "bundler", // "ES6"（など）でないと"bundler"は選択できない。
```
```zsh
npm install axios
```
```typescript
// ts file
import axios from 'axios'
```

## .d.ts
- 型定義ファイル（declaration file）で、TypeScriptにおける型情報を提供するファイル。
- 実装を含まない。
- 自分で型定義ファイルを作成したければ、tsconfig.jsonの`"declaration"`項目を`true`にすれば良い。
- webpackを使用する場合は、webpack.config.jsで`mode: 'production'とする必要がある。

## DefinitelyTyped/@typesで型定義ファイルを入手
- `npm install`でインストールしてもその型が見つからなかった場合、DefinitelyTyped/@Typesに型定義ファイルが入っていることが多い。
- https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ja.md
- 以下の手順でインストール
```zsh
npm install @types/lodash
```

## CDNなどでscriptから直接読み込んだライブラリに型定義をする
- tsファイルに型の情報を直接記載することで、型定義をする。
- このときパッケージのインポートはせず、htmlで直接インポートする。
```typescript
// main.ts
// import _ from 'lodash'; は不要
declare const _: {
    shuffle<T>(array: T[]): T[];
};
// @ts-ignore
console.log(_.shuffle<number>([1, 2, 3, 4, 5]));
```
```html
index.html
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

```

## アンビエントモジュール宣言とモジュール拡張
- 次のコードを使用することで、htmlで直接ライブラリを読み込まずに使用することができる。
```typescript
declare module 'lodash' {
    export function shuffle<T>(array: T[]): T[];
}
```
- ただしこのコードは、記載されているtsファイルがモジュールとして扱われているかスクリプトとして扱われているかによって、異なる挙動をとる。
- モジュールの場合は、モジュール拡張としての挙動となる。
- スクリプトの場合は、アンビエントモジュール宣言としての挙動となる。
- よってアンビエントモジュール宣言として使いたい場合は、インポートが一切ないtsファイルを作成し、その中で定義すると良い。