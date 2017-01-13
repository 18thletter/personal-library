var co = require('co');
var prompt = require('co-prompt');

export default class ConsoleApp {
  static getPrompt() {
    return '> ';
  }

  run() {
    while(true) {
      co(function *() {
        var name = yield prompt('> ');
        console.log(name);
      });
    }
  }

  static getHelpText() {
    return 'help!!';
  }
}