var assert = require('assert');
import AddCommand from '../../../src/domain/command/AddCommand';
import Library from '../../../src/domain/library/Library';

describe('AddCommand', () => {
  describe('#execute()', () => {
    it('should add a book', () => {
      var command = new AddCommand('some book', 'some author');
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, 'Added "some book" by some author');
    });

    it('should not add a book that already is in the library', () => {
      var command = new AddCommand('some book', 'some author');
      var library = new Library();
      library.addBook('some book', 'some author');
      var output = command.execute(library);
      assert.equal(output, '"some book" by some author is already in the library!');
    });
  });
});
