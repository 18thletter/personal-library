var co = require('co');
var prompt = require('co-prompt');

module.exports = class ConsoleApp {
  static getPrompt() {
    return '> ';
  }

  run() {
    co(function *() {
      var input = '';
      while(input !== 'quit') {
        var input = yield prompt(ConsoleApp.getPrompt());
        process.stdin.pause();
      }
    });
  }

  static getHelpText() {
    return 'help!!';
  }
}