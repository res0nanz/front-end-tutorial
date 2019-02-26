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
