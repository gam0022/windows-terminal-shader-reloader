# windows-terminal-shader-reloader

Windows Terminal上でHLSLのシェーダーライブコーディングするためのツールです。

- Windows Terminal 1.6から任意のHLSLのピクセルシェーダーをターミナルの背景上で実行できるようになりました。
- しかし、HLSLを変更してもHLSLの再コンパイルが実行されないため、ライブコーディングには不向きでした。
- そこで、HLSLの変更を監視して、Windows Terminalのsettings.jsonを書き換えることで、HLSL保存時にHLSLを自動再コンパイルできるようにしました。

## 使い方

```bash
# 初期設定
git clone git@github.com:gam0022/windows-terminal-shader-reloader.git
cd windows-terminal-shader-reloader
npm install

# index.js をテキストエディタで開いて、settingsJson と targetHlsl をご自身の環境に応じて修正してください
vim index.js

# 実行
node index.js
```

## Licence

MIT