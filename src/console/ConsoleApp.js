var co = require('co');
var prompt = require('co-prompt');
var CommandFactory = require('../domain/command/CommandFactory');
var AddCommand = require('../domain/command/AddCommand');
var ReadCommand = require('../domain/command/ReadCommand');
var ShowAllCommand = require('../domain/command/ShowAllCommand');
var ShowUnreadCommand = require('../domain/command/ShowUnreadCommand');
var ShowAllByCommand = require('../domain/command/ShowAllByCommand');
var ShowUnreadByCommand = require('../domain/command/ShowUnreadByCommand');
var UndoCommand = require('../domain/command/UndoCommand');
var Library = require('../domain/library/Library');

module.exports = class ConsoleApp {
  constructor() {
    this.previousCommand = null;
    this.library = new Library();
  }

  static getPrompt() {
    return '> ';
  }

  run() {
    var thisClass = this;

    console.log('Welcome to your library!');

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

          var command = CommandFactory.createCommand(
            parsed.command,
            parsed.args,
            thisClass.previousCommand
          );

          // Run the command
          console.log(command.execute(thisClass.library));
          if (command instanceof ReadCommand || command instanceof AddCommand) {
            thisClass.previousCommand = command;
          }

        } catch (e) {
          // Print the help text if the command is not parseable
          ConsoleApp.printHelpText();
        }
      }
    });
  }

  static parse(input) {
    var matches = input.match(/^\s*(add|read|show all|show unread|show all by|show unread by|undo|quit)\s*("(.+)")?\s*$/);
    if (matches == null) {
      throw new Error('Unable to parse');
    }

    matches = matches.filter(function(match) {
      return match != null;
    });
    var command = matches[1];
    var args = matches.slice(2);
    if (args.length > 1) {
      args = args[1].split(/"\s+"/);
    }

    return {
      command: command,
      args: args
    };
  }

  static printHelpText() {
    console.log("\nUsage\n")
    console.log(AddCommand.getDescription());
    console.log(ReadCommand.getDescription());
    console.log(ShowAllCommand.getDescription());
    console.log(ShowUnreadCommand.getDescription());
    console.log(ShowAllByCommand.getDescription());
    console.log(ShowUnreadByCommand.getDescription());
    console.log(UndoCommand.getDescription());
    console.log('quit: quits the program');
  }
}