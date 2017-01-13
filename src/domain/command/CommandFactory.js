var CommandFactory = require('../../../src/domain/command/CommandFactory');
var AddCommand = require('../../../src/domain/command/AddCommand');
var ReadCommand = require('../../../src/domain/command/ReadCommand');
var ShowAllCommand = require('../../../src/domain/command/ShowAllCommand');
var ShowUnreadCommand = require('../../../src/domain/command/ShowUnreadCommand');
var ShowAllByCommand = require('../../../src/domain/command/ShowAllByCommand');
var ShowUnreadByCommand = require('../../../src/domain/command/ShowUnreadByCommand');
var UndoCommand = require('../../../src/domain/command/UndoCommand');

module.exports = class CommandFactory {
  static createCommand(command, args, previousCommand) {
    switch (command) {
      case 'add':
        return new AddCommand(args[0], args[1]);
        break;
      case 'read':
        return new ReadCommand(args[0]);
        break;
      case 'show all':
        return new ShowAllCommand();
        break;
      case 'show unread':
        return new ShowUnreadCommand();
        break;
      case 'show all by':
        return new ShowAllByCommand(args[0]);
        break;
      case 'show unread by':
        return new ShowUnreadByCommand(args[0]);
        break;
      case 'undo':
        return new UndoCommand(previousCommand);
        break;
      default:
        break;
    }
  }
}