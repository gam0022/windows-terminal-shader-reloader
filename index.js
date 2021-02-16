const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const Hjson = require('hjson');
const { execSync } = require('child_process')
const process = require('process');

// NOTE: ご自身の環境に応じて修正してください
const settingsJson = '/mnt/c/Users/gam0022/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json';
const targetHlsl = '/mnt/c/Users/gam0022/Dropbox/windows-terminal/terminal/samples/PixelShaders/Raymarching.hlsl';

// settings.json を更新するために一時ファイルを作成して切り替えます
const tmpHlsl = path.join(path.dirname(targetHlsl), "_Raymarching.hlsl");

fs.copyFileSync(targetHlsl, tmpHlsl);
const toWinPath = (str) => execSync("wslpath -w " + str).toString().trim();
const targetHlslWin = toWinPath(targetHlsl);
const tmpHlslWin = toWinPath(tmpHlsl);

let tmpToggle = true;
const watcher = chokidar.watch(path.dirname(targetHlsl), { ignored: /[\/\\]\./, persistent: true });

watcher.on('change', (path, status) => {
  console.log("change: " + path);

  if (path == targetHlsl) {
    const jsonObject = Hjson.parse(fs.readFileSync(settingsJson, 'utf8'));
    fs.copyFileSync(targetHlsl, tmpHlsl);
    jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = tmpToggle ? tmpHlslWin : targetHlslWin;
    fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, { quotes: 'all', separator: true }));
    tmpToggle = !tmpToggle;
  }
});

process.on('SIGINT', () => {
  console.log('Received SIGINT.');
  jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = targetHlslWin;
  fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, { quotes: 'all', separator: true }));
  fs.unlinkSync(tmpHlsl);
  process.exit();
});