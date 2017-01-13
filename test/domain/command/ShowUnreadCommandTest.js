var assert = require('assert');
import ShowUnreadCommand from '../../../src/domain/command/ShowUnreadCommand';
import Library from '../../../src/domain/library/Library';

describe('ShowUnreadCommand', () => {
  describe('#execute()', () => {
    it('should show all unread books', () => {
      var command = new ShowUnreadCommand();
      var library = new Library();
      library.addBook('some book', 'some author');
      var output = command.execute(library);
      assert.equal(output, "\"some book\" by some author (unread)\n");
    });

    it('should indicate when there are no unread books', () => {
      var command = new ShowUnreadCommand();
      var library = new Library();
      var output = command.execute(library);
      assert.equal(output, 'There are no unread books in your library.');
    });
  });
});

