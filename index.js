const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const Hjson = require('hjson');

const toWinPath = (str) => str.replace("/mnt/c/", "c:/");

const settingsJson = '/mnt/c/Users/gam0022/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json';
const shaderPath = '/mnt/c/Users/gam0022/Dropbox/windows-terminal/terminal/samples/PixelShaders/Raymarching.hlsl';
const shaderPathCopy = path.join(path.dirname(shaderPath), "_Copy.hlsl");
const shaderPathWin = toWinPath(shaderPath);
const shaderPathCopyWin = toWinPath(shaderPathCopy);

console.log("shaderPathCopy: " + shaderPathCopy);
console.log("shaderPathWin: " + shaderPathWin);

let toggle = true;

// One-liner for current directory
chokidar.watch(shaderPath).on('change', (event, path) => {
  const jsonObject = Hjson.parse(fs.readFileSync(settingsJson, 'utf8'));
  fs.copyFile(shaderPath, shaderPathCopy, err => {
    console.log("err: " + err);
    console.log("toggle: " + toggle);
    jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = toggle ? shaderPathWin : shaderPathCopyWin;
    toggle = !toggle;
    fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, { quotes: 'all', separator: true }));
  });
});