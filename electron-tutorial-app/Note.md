# Electron Tutorial

## Start

* `npm init`
* `touch main.js // initで指定してもよい`
* `touch index.html`
* `package.json`を書き換える

```javascript
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Installing Electron

`npm install --save-dev electron`

## Electron Development in a Nutshell

* APIすべてを利用する: `const electron = require('electron')`
* ライフサイクル管理: `electron.app`
* ウィンドウ関連: `electron.BrowserWindow`

## Running your app

* 最低限`main.js, index.html, package.json`を作成
* `npm start`