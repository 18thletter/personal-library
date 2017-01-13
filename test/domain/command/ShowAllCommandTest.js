var assert = require('assert');
import ShowAllCommand from '../../../src/domain/command/ShowAllCommand';
import Library from '../../../src/domain/library/Library';

describe('ShowAllCommand', () => {
  describe('#execute()', () => {
    it('should show all books', () => {
      var command = new ShowAllCommand();
      var library = new Library();
      library.addBook('some book', 'some author');
      library.addBook('another book', 'some author');
      library.readBook('another book');
      library.addBook('third book', 'another author');
      var output = command.execute(library);
      assert.equal(output, "\"some book\" by some author (unread)\n" +
        "\"another book\" by some author (read)\n" +
        "\"third book\" by another author (unread)\n");
    });

    it('should indicate when your library is empty', () => {
      var command = new ShowAllCommand();
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, 'There are no books in your library');
    });
  });
});

