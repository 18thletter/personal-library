var assert = require('assert');
import Book from '../../../src/domain/book/Book';

describe('Book', () => {
  describe('#constructor()', () => {
    it('should be instantiable', () => {
      var book = new Book('title', 'author');
      assert.ok(book instanceof Book);
      assert.equal(book.title, 'title');
      assert.equal(book.author, 'author');
      assert.equal(book.isRead, false);
    });
  });

  describe('#read()', () => {
    it('should be readable', () => {
      var book = new Book('title', 'author');
      book.read();
      assert.equal(book.isRead, true);
    });

    it('should be unreadable', () => {
      var book = new Book('title', 'author');
      book.unread();
      assert.equal(book.isRead, false);
    });
  });

  describe('#toString()', () => {
    it('should have an overridden toString method', () => {
      var book = new Book('title', 'author');
      assert.equal(book.toString(), '"title" by author (unread)');
    });
  });
});
