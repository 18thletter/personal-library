var assert = require('assert');
import UndoCommand from '../../../src/domain/command/UndoCommand';
import AddCommand from '../../../src/domain/command/AddCommand';
import ReadCommand from '../../../src/domain/command/ReadCommand';
import ShowAllCommand from '../../../src/domain/command/ShowAllCommand';
import Library from '../../../src/domain/library/Library';

describe('UndoCommand', () => {
  describe('#execute()', () => {
    it('should undo an add command', () => {
      var previous = new AddCommand('some title', 'some author');
      var command = new UndoCommand(previous);
      var library = new Library();
      previous.execute(library);
      var output = command.execute(library);
      assert.equal(output, 'Removed "some title" by some author');
    });

    it('should undo a read command', () => {
      var previous = new ReadCommand('some title');
      var command = new UndoCommand(previous);
      var library = new Library();
      library.addBook('some title', 'some author');
      previous.execute(library);
      var output = command.execute(library);
      assert.equal(output, '"some title" by some author marked as unread');
    });

    it('should do nothing on the first command', () => {
      var previous = null;
      var command = new UndoCommand(previous);
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, '');
    });
  });
});
