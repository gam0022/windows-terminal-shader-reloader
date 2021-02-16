const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const Hjson = require('hjson');
const { execSync } = require('child_process')
const process = require('process');

const toWinPath = (str) => execSync("wslpath -w " + str).toString().trim();

const settingsJson = '/mnt/c/Users/gam0022/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json';
const shaderPath = '/mnt/c/Users/gam0022/Dropbox/windows-terminal/terminal/samples/PixelShaders/Raymarching.hlsl';
const shaderPathCopy = path.join(path.dirname(shaderPath), "_Copy.hlsl");
const shaderPathWin = toWinPath(shaderPath);
const shaderPathCopyWin = toWinPath(shaderPathCopy);

console.log("shaderPathCopy: " + shaderPathCopy);
console.log("shaderPathWin: " + shaderPathWin);

let toggle = true;

// One-liner for current directory
const watcher = chokidar.watch(path.dirname(shaderPath), { ignored: /[\/\\]\./, persistent: true });

watcher.on('change', (path, status) => {
  console.log("change: " + path);
  if (path == shaderPath) {
    const jsonObject = Hjson.parse(fs.readFileSync(settingsJson, 'utf8'));
    fs.copyFileSync(shaderPath, shaderPathCopy);
    jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = toggle ? shaderPathWin : shaderPathCopyWin;
    fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, { quotes: 'all', separator: true }));
    toggle = !toggle;
  }
});

process.on('SIGINT', () => {
  console.log('Received SIGINT.');
  fs.unlinkSync(shaderPathCopy);
  process.exit();
});