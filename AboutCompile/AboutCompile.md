# コンパイラ

## watchモード
- 保存時に自動でjsにコンパイラしてくれるモード
- 保存時のコンパイルでエラーがでたとしても、無理やりコンパイルされてjsで保存されているので注意。
```bash
tsc <file name> --watch
```

## tsconfig.jsonの作成
- `tsc --init`でtsconfig.jsonを作成
- 作成されたtsconfig.jsonは、初期設定で`tsc`のみで全てのファイルがコンパイルされるようになっている。
```bash
tsc --init
```

## excludeとinclude
### exclude
- tsconfig.jsonに`exclde`をつけることで、コンパイルしないファイルを指定することが可能。
```json
// tsconfig.jsonの中に次のブロックを作成
exclude: [
    "hoge.ts"
]
```
- wildecardも対応
```json
"exclude":[
    "*.spec.ts", // カレントディレクトリ内にある.spec.tsで終わる全てのファイルが対象。
    "**/hoge.ts", // カレントディレクトリが入っているディレクトリ内の、全てのフォルダ内のhoge.tsというファイルが対象。
]
```

- node_modulesは`exclude`の中に入れる。excludeの中身が空の場合は、自動でnode_modulesは`exclude`の中に入っているように認識される。

### include
- `include`でコンパイルするファイルを指定可能。`exclude`同様にワイルドカードも使える。
```json
// tsconfig.jsonの中に次のブロックを作成
"include":[
    "hoge.json"
]
```
- `include`と`exclude`がどちらもある場合は、`include`に入っているものだけがコンパイルされる。ただし、`include`と`exclude`どちらにも入っている場合、そのファイルはコンパイルされない。
```json
"include":[
    "hoge1.ts",
    "hoge2.ts"
],
"exclude":[
        "hoge2.ts"
]
// コンパイルされるのはhoge1.tsのみ
```
### files
- `files`は`include`と同じくコンパイルするファイルを指定できるが、ワイルドカードには非対応で、ディレクトリの指定もできない。
```json
"files":[
    "hoge.ts"
]
```

## target
- どのjsのバージョンにコンパイルするかを指定する項目。
- 記載をしないとデフォルトはES3になる。
```json
"target": "es5"
```

## lib
- 各型のインターフェースが書かれているファイルを指定し、コンパイラがコンパイルするときにその指定したオブジェクトとしてコンパイルさせる項目。
```json
"lib": [
      "ES6",
      "dom"
    ]
```
- デフォルトでは`target`の内容に依存して自動で割り振られる。
```json
// targetがes6の場合
"lib":[
    "ES6",
    "DOM",
    "DOM.Iterable",
    "ScriptHost"
]
// を指定しているのと同じとなる
```

## noEmitOnError
- エラーがでたときにjsにコンパイルしないためのコマンド
```json
"noEmitOnError": true
// を指定しているのと同じとなる
```

## strict
- strictを`true`にすると、以下の8項目が全て`true`になる。
    - noImplicitAny
    - strictNullChecks
    - strictFunctionTypes
    - strictBindCallApply
    - strictPropertyInitialization
    - strictBuiltinIteratorReturn
    - noImplicitThis
    - useUnknownInCatchVariables
    - alwaysStrict