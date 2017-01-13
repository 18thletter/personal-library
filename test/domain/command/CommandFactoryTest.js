var assert = require('assert');
import CommandFactory from '../../../src/domain/command/CommandFactory';
import AddCommand from '../../../src/domain/command/AddCommand';
import ReadCommand from '../../../src/domain/command/ReadCommand';
import ShowAllCommand from '../../../src/domain/command/ShowAllCommand';
import ShowUnreadCommand from '../../../src/domain/command/ShowUnreadCommand';
import ShowAllByCommand from '../../../src/domain/command/ShowAllByCommand';
import ShowUnreadByCommand from '../../../src/domain/command/ShowUnreadByCommand';
import UndoCommand from '../../../src/domain/command/UndoCommand';

describe('CommandFactory', () => {
  describe('#stripQuotes()', function() {
    it('should strip quotes from args', function() {
      assert.deepEqual(
        CommandFactory.stripQuotes(['"title"', '"author"']),
        ['title', 'author']
      );
    });
  });

  describe('#createCommand()', () => {
    it('should create an AddCommand', () => {
      assert.ok(CommandFactory.createCommand('add', ['"title"', '"author"']) instanceof AddCommand);
    });

    it('should create an ReadCommand', () => {
      assert.ok(CommandFactory.createCommand('read', ['"title"']) instanceof ReadCommand);
    });

    it('should create an ShowAllCommand', () => {
      assert.ok(CommandFactory.createCommand('show all', []) instanceof ShowAllCommand);
    });

    it('should create an ShowUnreadCommand', () => {
      assert.ok(CommandFactory.createCommand('show unread', []) instanceof ShowUnreadCommand);
    });

    it('should create an ShowAllByCommand', () => {
      assert.ok(CommandFactory.createCommand('show all by', ['"author"']) instanceof ShowAllByCommand);
    });

    it('should create an ShowUnreadByCommand', () => {
      assert.ok(CommandFactory.createCommand('show unread by', ['"author"']) instanceof ShowUnreadByCommand);
    });

    it('should create an UndoCommand', () => {
      assert.ok(CommandFactory.createCommand('undo', []) instanceof UndoCommand);
    });
  });
});