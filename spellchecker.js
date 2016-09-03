const webFrame = require('electron').webFrame;
const spellchecker = require('spellchecker');
console.log('spellchecker loaded');
webFrame.setSpellCheckProvider('en-US', false, {
  spellCheck (text) {
    return !(spellchecker.isMisspelled(text))
  }
});
