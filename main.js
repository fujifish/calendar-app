var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var util = require('util');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var window = null;
var tray = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin')
  app.quit();
});

function createGCalendarWindow(url) {
  // Create the browser window.
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Google Calendar',
    icon: __dirname+'/calendar.png',
    "skip-taskbar": process.platform !== 'darwin'
  });

  window.maximize();

  // window.loadUrl('https://calendar.google.com/');
  window.loadUrl('file://'+__dirname+'/index.html');

  // Emitted when the window is closed.
  window.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });

  window.on('minimize', function(event) {
    window.hide();
    event.preventDefault();
  });
  return window;
}

function setupMenu() {
  var template = [
    {
      label: 'Gmail',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Find',
          accelerator: 'Command+F',
          click: function() { BrowserWindow.getFocusedWindow().webContents.send('find'); }
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: function() { BrowserWindow.getFocusedWindow().webContents.openDevTools(); }
        },
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        },
      ]
    },
  ];

  menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu); // Must be called within app.on('ready', function(){ ... });
}

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  createGCalendarWindow('file://'+__dirname+'/index.html');

  const {ipcMain} = require('electron');

  ipcMain.on('reminder', function() {
    app.dock && app.dock.setBadge('\u2022');
  });

  ipcMain.on('reminder-dismiss', function() {
    app.dock && app.dock.setBadge('');
  });

  setupMenu();

});
