var assert = require('assert');
import Library from '../../../src/domain/library/Library';

describe('Library', () => {
  describe('#constructor()', () => {
    it('should be instantiable', () => {
      var library = new Library();
      assert.ok(library instanceof Library);
      assert.deepEqual(library.booksByTitle, {});
      assert.deepEqual(library.booksByAuthor, {});
    });
  });

  describe('#addBook()', () => {
    it('should add a new book', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      assert.deepEqual(library.booksByTitle['The Dance of Anger'], {
        book: {
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        },
        index: 0
      });
      assert.deepEqual(library.booksByAuthor['Harriet Lerner'], {
        read: [],
        unread: [{
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        }]
      });
    });

    it('should not add a book already in the library', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      assert.throws(() => {
        library.addBook('The Dance of Anger', 'Harriet Lerner');
      }, '"The Dance of Anger" by Harriet Lerner is already in the library!');
      assert.deepEqual(library.booksByTitle['The Dance of Anger'], {
        book: {
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        },
        index: 0
      });
      assert.deepEqual(library.booksByAuthor['Harriet Lerner'], {
        read: [],
        unread: [{
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        }]
      });
    });
  });

  describe('#removeBook()', () => {
    it('should remove a book', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.removeBook('The Dance of Anger');
      assert.deepEqual(library.booksByTitle, {});
      // The lazy loaded author is still in there, but the books are empty
      assert.deepEqual(library.booksByAuthor, {
        'Harriet Lerner': {
          read: [],
          unread: []
        }
      });
    });

    it('should not remove a book that is not in the library', () => {
      var library = new Library();
      assert.throws(() => {
        library.removeBook('The Dance of Anger');
      }, Error, '"The Dance of Anger" is not in your library.')
    });
  })

  describe('#readBook()', () => {
    it('should read a book', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.readBook('The Dance of Anger');
      assert.deepEqual(library.booksByTitle['The Dance of Anger'], {
        book: {
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: true
        },
        index: 0
      });
      assert.deepEqual(library.booksByAuthor['Harriet Lerner'], {
        read: [{
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: true
        }],
        unread: []
      });
    });

    it('should not read a book that is not in the library', () => {
      var library = new Library();
      assert.throws(() => {
        library.readBook('The Dance of Anger');
      }, '"The Dance of Anger" is not in your library.')
    });

    it('should not read a book that already has been read', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.readBook('The Dance of Anger');
      assert.throws(() => {
        library.readBook('The Dance of Anger');
      }, "You've already read \"The Dance of Anger\". Great job!");
    });
  });

  describe('#unreadBook()', () => {
    it('should unread a book', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.readBook('The Dance of Anger');
      library.unreadBook('The Dance of Anger');
      assert.deepEqual(library.booksByTitle['The Dance of Anger'], {
        book: {
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        },
        index: 0
      });
      assert.deepEqual(library.booksByAuthor['Harriet Lerner'], {
        read: [],
        unread: [{
          title: 'The Dance of Anger',
          'author': 'Harriet Lerner',
          isRead: false
        }]
      });
    });

    it('should not unread a book that is not in the library', () => {
      var library = new Library();
      assert.throws(() => {
        library.unreadBook('The Dance of Anger');
      }, '"The Dance of Anger" is not in your library.')
    });

    it('should not unread a book that is unread', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      assert.throws(() => {
        library.unreadBook('The Dance of Anger');
      }, "You have not read \"The Dance of Anger\" yet.");
    });
  })

  describe('#getAllBooks()', () => {
    it('should return all books', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.addBook('title', 'author');
      library.addBook('Radical Acceptance', 'Tara Brach');
      assert.deepEqual(library.getAllBooks(), [
        {
          title: 'The Dance of Anger',
          author: 'Harriet Lerner',
          isRead: false
        },
        {
          title: 'title',
          author: 'author',
          isRead: false
        },
        {
          title: 'Radical Acceptance',
          author: 'Tara Brach',
          isRead: false
        }
      ]);
    });
  });

  describe('#getUnreadBooks()', () => {
    it('should return unread books', () => {
      var library = new Library();
      library.addBook('The Dance of Anger', 'Harriet Lerner');
      library.addBook('title', 'author');
      library.addBook('Radical Acceptance', 'Tara Brach');
      library.readBook('The Dance of Anger');
      assert.deepEqual(library.getUnreadBooks(), [
        {
          title: 'title',
          author: 'author',
          isRead: false
        },
        {
          title: 'Radical Acceptance',
          author: 'Tara Brach',
          isRead: false
        }
      ]);
    });
  });

  describe('#getBooksByAuthor()', () => {
    it('should return books by author', () => {
      var library = new Library();
      library.addBook('Radical Acceptance', 'Tara Brach');
      library.addBook('True Refuge', 'Tara Brach');
      library.readBook('Radical Acceptance');
      assert.deepEqual(library.getBooksByAuthor('Tara Brach'), [
        {
          title: 'Radical Acceptance',
          author: 'Tara Brach',
          isRead: true
        },
        {
          title: 'True Refuge',
          author: 'Tara Brach',
          isRead: false
        }
      ]);
    });

    it('should return an empty array if there are no books by the author', () => {
      var library = new Library();
      assert.deepEqual(library.getBooksByAuthor('some author'), []);
    });
  });

  describe('#getUnreadBooksByAuthor()', () => {
    it('should return unread books by author', () => {
      var library = new Library();
      library.addBook('Radical Acceptance', 'Tara Brach');
      library.addBook('True Refuge', 'Tara Brach');
      library.readBook('Radical Acceptance');
      assert.deepEqual(library.getUnreadBooksByAuthor('Tara Brach'), [
        {
          title: 'True Refuge',
          author: 'Tara Brach',
          isRead: false
        }
      ]);
    });

    it('should return an empty array if there are no books by the author', () => {
      var library = new Library();
      assert.deepEqual(library.getUnreadBooksByAuthor('some author'), []);
    });
  });
});

