var co = require('co');
var prompt = require('co-prompt');

module.exports = class ConsoleApp {
  constructor() {
    this.previousCommand = null;
  }

  static getPrompt() {
    return '> ';
  }

  run() {
    var thisClass = this;
    co(function *() {
      var input = '';
      while(true) {
        // Get the input
        var input = yield prompt(ConsoleApp.getPrompt());
        process.stdin.pause();

        if (input == null || input.trim() === '') {
          continue;
        }

        try {
          // Create a command
          var parsed = ConsoleApp.parse(input);

          if (parsed.command === 'quit') {
            console.log('Bye!');
            break;
          }
        } catch (e) {
          // Print the help text if the command is not parseable
          console.log(ConsoleApp.getHelpText());
        }
      }
    });
  }

  static parse(input) {
    var matches = input.match(/^\s*(add|read|show all|show unread|show all by|show unread by|undo|quit)\s*("\w+")?\s*("\w+")?\s*$/);
    if (matches == null) {
      throw 'error';
    }

    matches = matches.filter(function(match) {
      return match != null;
    });
    var command = matches[1];
    var args = matches.slice(2);

    return {
      command: command,
      args: args
    };
  }

  static getHelpText() {
    return 'help!!';
  }
}