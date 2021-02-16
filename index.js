const chokidar = require('chokidar');
const fs = require('fs');

const settingsJson = '/mnt/c/Users/gam0022/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json';
const shaderPath = '/mnt/c/Users/gam0022/Dropbox/windows-terminal/terminal/samples/PixelShaders';

// One-liner for current directory
chokidar.watch(shaderPath).on('change', (event, path) => {
  console.log(event, path);
  const jsonObject = JSON.parse(fs.readFileSync(settingsJson, 'utf8'));
  console.log(jsonObject);
});