var assert = require('assert');
import ShowUnreadByCommand from '../../../src/domain/command/ShowUnreadByCommand';
import Library from '../../../src/domain/library/Library';

describe('ShowUnreadByCommand', () => {
  describe('#execute()', () => {
    it('should show all unread books by an author', () => {
      var command = new ShowUnreadByCommand('some author');
      var library = new Library();
      library.addBook('some book', 'some author');
      var output = command.execute(library);
      assert.equal(output, "\"some book\" by some author (unread)\n");
    });

    it('should indicate when there are no unread books by an author', () => {
      var command = new ShowUnreadByCommand('some author');
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, 'There are no unread books by some author in your library.');
    });
  });
});


