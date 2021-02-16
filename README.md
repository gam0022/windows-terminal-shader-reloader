# windows-terminal-shader-reloader

## これは？

Windows Terminal上でHLSLのシェーダーライブコーディングするためのツールです

- Windows Terminal 1.6から任意のHLSLのピクセルシェーダーを実行できるようになりました。
- しかし、HLSLを変更しても設定をリロードできないので、ライブコーディングには不向きでした。
- HLSLの変更を監視して、Windows Terminalのsettings.jsonを書き換えることで、HLSL保存時にHLSLを自動再コンパイルできるようにしました

## 使い方

```
# 初期設定
git clone git@github.com:gam0022/windows-terminal-shader-reloader.git
cd windows-terminal-shader-reloader
npm install

vim index.js
# index.jsをテイストエディタで編集し、settingsJson と targetHlsl をご自身の環境に応じて修正してください。

# 実行
node index.js
```

## Licence

MIT