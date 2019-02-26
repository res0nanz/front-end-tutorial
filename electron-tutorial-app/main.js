// インポート
const { app, BrowserWindow } = require('electron')

// gloabl window object
// ガベージコレクションによって勝手に閉じられるのを防ぐ
let win

function createWindow () {
  // window object 作成
  win = new BrowserWindow({ width: 800, height: 600 })

  // 最初に読み込むページ
  win.loadFile('index.html')

  // DevToolsを開く
  win.webContents.openDevTools()

  // windowが閉じられた時
  win.on('closed', () => {
    // windowObjectを参照
    // マルチウインドウの場合、windowは配列に格納
    // 参照をなくす。削除
    win = null
  })
}

// 初期化が済み、ウィンドウを作成する準備が整ったとき
app.on('ready', createWindow)

// すべてのウィンドウが閉じられた時に終了する
app.on('window-all-closed', () => {
  // macOSでは終了を明示的に命じるまでアクティブが普通
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOSでは他のウィンドウが開いていない時に再描画が一般的
  if (win === null) {
    createWindow()
  }
})