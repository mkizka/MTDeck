# MTDeck
TweetDeckをスマホアプリのように使えるようにするUserScript

[動画デモ](https://streamable.com/oocea)

<img src="https://i.imgur.com/xBrApsM.png" width="300">
<img src="https://i.imgur.com/aFG6fBr.png" width="300">

## 使い方
### Android(ブラウザ拡張機能として動作)
1. [KiwiBrowser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser)をインストール
2. Kiwiに[MTDeck](https://chrome.google.com/webstore/detail/mtdeck/ednjoleioepmccklimdkcbbchlcjhpij)アドオンを追加
4. [TweetDeck](https://tweetdeck.twitter.com)を開く
5. メニューの「ホームに追加」からアプリ化

KiwiBrowserでカクカクする場合はFirefoxまたはYandexを使ってみてください  
→Firefoxアドオンは[こちら](https://addons.mozilla.org/ja/firefox/addon/mobiletweetdeck/)

### iOS(UserScriptとして動作)
1. [Safari Snippets](https://apps.apple.com/jp/app/safari-snippets/id1126048257)をインストール
2. [TweetDeck](https://tweetdeck.twitter.com)をSafariで開く
3. 共有メニューを開いて「Indect Snippet」をタップ
4. 検索に「MTDeck」と入力して最新バージョンのMTDeckをタップして適用

スクリプト本体は[dist/mtdeck.min.user.js](https://github.com/mkizka/MTDeck/raw/master/dist/mtdeck.min.user.js)にあります。標準アプリである[ショートカット](https://apps.apple.com/jp/app/%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88/id915249334)や、UserScriptに対応したブラウザである[Ohajiki](http://ohajiki.ios-web.com/)などでも動作します

## 貢献
以下のコマンドで開発できます
```bash
yarn run dev:chrome
yarn run dev:firefox
```

Issue/PRご自由にどうぞ

## 参考
[totoraj930/TJDeck](https://github.com/totoraj930/TJDeck)
