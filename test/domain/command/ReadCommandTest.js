var assert = require('assert');
import ReadCommand from '../../../src/domain/command/ReadCommand';
import Library from '../../../src/domain/library/Library';

describe('ReadCommand', () => {
  describe('#execute()', () => {
    it('should read a book', () => {
      var command = new ReadCommand('some book');
      var library = new Library();
      library.addBook('some book', 'some author');
      var output = command.execute(library);
      assert.equal(output, '"some book" by some author marked as read');
    });

    it('should not read a book that is not in the library', () => {
      var command = new ReadCommand('some book');
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, '"some book" is not in your library.');
    });

    it('should not read a book that has already been read', () => {
      var command = new ReadCommand('some book');
      var library = new Library();
      library.addBook('some book', 'some author');
      library.readBook('some book');
      var output = command.execute(library);
      assert.equal(output, "You've already read \"some book\". Great job!");
    });
  });
});

