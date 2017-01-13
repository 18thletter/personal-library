var assert = require('assert');
import ShowAllByCommand from '../../../src/domain/command/ShowAllByCommand';
import Library from '../../../src/domain/library/Library';

describe('ShowAllByCommand', () => {
  describe('#execute()', () => {
    it('should show all books by an author', () => {
      var command = new ShowAllByCommand('some author');
      var library = new Library();
      library.addBook('some book', 'some author');
      var output = command.execute(library);
      assert.equal(output, "\"some book\" by some author (unread)\n");
    });

    it('should indicate when there are no books by the author', () => {
      var command = new ShowAllByCommand('some author');
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, 'There are no books by some author in your library');
    });
  });
});


