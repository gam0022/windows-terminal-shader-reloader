const chokidar = require('chokidar');
const fs = require('fs');
const Hjson = require('hjson');

const settingsJson = '/mnt/c/Users/gam0022/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json';
const shaderPath = '/mnt/c/Users/gam0022/Dropbox/windows-terminal/terminal/samples/PixelShaders';
const winShaderPath = "C:\\Users\\gam0022\\Dropbox\\windows-terminal\\terminal\\samples\\PixelShaders\\";
const shaderHlsl = 'Raymarching.hlsl';

// One-liner for current directory
chokidar.watch(shaderPath).on('change', (event, path) => {
  console.log(event, path);
  const jsonObject = Hjson.parse(fs.readFileSync(settingsJson, 'utf8'));
  console.log(jsonObject);
  console.log(jsonObject.profiles['defaults']['experimental.pixelShaderPath']);

  jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = winShaderPath + "Invert.hlsl";
  fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, {quotes: 'all', separator: true}));

  setTimeout(function() {
    jsonObject.profiles['defaults']['experimental.pixelShaderPath'] = winShaderPath + shaderHlsl;
    fs.writeFileSync(settingsJson, Hjson.stringify(jsonObject, {quotes: 'all', separator: true}));
  }, 500);
});