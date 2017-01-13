import CommandFactory from '../../../src/domain/command/CommandFactory';
import AddCommand from '../../../src/domain/command/AddCommand';
import ReadCommand from '../../../src/domain/command/ReadCommand';
import ShowAllCommand from '../../../src/domain/command/ShowAllCommand';
import ShowUnreadCommand from '../../../src/domain/command/ShowUnreadCommand';
import ShowAllByCommand from '../../../src/domain/command/ShowAllByCommand';
import ShowUnreadByCommand from '../../../src/domain/command/ShowUnreadByCommand';
import UndoCommand from '../../../src/domain/command/UndoCommand';

module.exports = class CommandFactory {
  static createCommand(command, args) {
    args = CommandFactory.stripQuotes(args);
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
        return new UndoCommand();
        break;
      default:
        break;
    }
  }

  static stripQuotes(args) {
    return args.map((arg) => {
      return arg.replace(/^"/, '').replace(/"$/, '');
    });
  }
}