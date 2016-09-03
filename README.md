# Google Calendar OSX App

Google Calendar app based on Electron

* Desktop popup notifications
* Familiar web Google Calendar interface
* Based on [Electron](http://electron.atom.io/)

## How to Build

_Note: requires node v6_

```
clone https://github.com/fujifish/calendar-app.git
cd calendar-app
npm install
npm run build
```

Copy the built application `Google Calendar.app` from `Google Calendar-darwin-x64` to your Applications directory.

## Troubleshooting

You might need to run `electron-rebuild --version 1.3.5` to make sure electron is built against the correct 
node version headers.

## License

The MIT license. Copyright (c) 2016 fujifish.
