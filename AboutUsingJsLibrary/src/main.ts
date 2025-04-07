import {apple} from 'axios';
import { shuffle } from 'lodash';

// モジュール拡張
declare module 'axios' {
    export const apple: 'apple';
}
// htmlで直接ライブラリを読み込んで使用する場合の書き方
// import _ from 'lodash';
// declare const _: {
//     shuffle<T>(array: T[]): T[];
// }
// @ts-ignore
// console.log(_.shuffle<number>([1, 2, 3, 4, 5]));

console.log(shuffle<number>([1, 2, 3, 4, 5]));
console.log(apple);
console.log('hello! world');