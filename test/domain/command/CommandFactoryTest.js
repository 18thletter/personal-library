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
  describe('#createCommand()', () => {
    it('should create an AddCommand', () => {
      assert.ok(CommandFactory.createCommand('add', ['"title"', '"author"'], null) instanceof AddCommand);
    });

    it('should create an ReadCommand', () => {
      assert.ok(CommandFactory.createCommand('read', ['"title"'], null) instanceof ReadCommand);
    });

    it('should create an ShowAllCommand', () => {
      assert.ok(CommandFactory.createCommand('show all', [], null) instanceof ShowAllCommand);
    });

    it('should create an ShowUnreadCommand', () => {
      assert.ok(CommandFactory.createCommand('show unread', [], null) instanceof ShowUnreadCommand);
    });

    it('should create an ShowAllByCommand', () => {
      assert.ok(CommandFactory.createCommand('show all by', ['"author"'], null) instanceof ShowAllByCommand);
    });

    it('should create an ShowUnreadByCommand', () => {
      assert.ok(CommandFactory.createCommand('show unread by', ['"author"'], null) instanceof ShowUnreadByCommand);
    });

    it('should create an UndoCommand', () => {
      assert.ok(CommandFactory.createCommand('undo', [], null) instanceof UndoCommand);
    });
  });
});