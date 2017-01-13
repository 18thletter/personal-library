var Book = require('../book/Book');

/**
 * This class uses two objects to store the books.
 * 
 * booksByTitle, which is a hash table structured like this:
 * {
 *   title1: { book: Book1, index: 0 },
 *   title2: { book: Book2, index: 1 },
 *   title3: { book: Book3, index: 0 },
 *   title4: { book: Book4, index: 1 },
 *   ...
 * }
 * The capital Books are Book objects. The indexes are to locate the position within
 * the array of books for the booksByAuthor object.
 * 
 * The booksByAuthor object is a hash table structured like this:
 * {
 *   author1: {
 *     read: [ Book3 ],
 *     unread: [ Book1, Book4 ]
 *   },
 *   author2: {
 *     read: [ Book2 ],
 *     unread: []
 *   },
 *   ...
 * }
 * The unread and read structures are arrays indexed by integers containing Books.
 */
module.exports = class Library {
  constructor() {
    this.booksByTitle = {};
    this.booksByAuthor = {};
  }

  addBook(title, author) {
    if (this.booksByTitle[title]) {
      throw new Error('"' + title + '" by ' + author + ' is already in the library!');
    }

    // Create a book
    var book = new Book(title, author);

    // Add it to the titles hash
    this.booksByTitle[title] = {};
    this.booksByTitle[title]['book'] = book;

    // Lazy instantiate the books hash by author
    if (!this.booksByAuthor[book.author]) {
      this.booksByAuthor[book.author] = {
        read: [],
        unread: []
      };
    }
    // Get the index where the book was pushed and save it in the titles hash
    var lengthOfUnread = this.booksByAuthor[book.author]['unread'].push(book);
    this.booksByTitle[title]['index'] = lengthOfUnread - 1;
  }

  removeBook(title) {
    if (!this.booksByTitle[title]) {
      throw new Error('"' + title + '" is not in your library.');
    }

    var book = this.booksByTitle[title];
    var readOrUnread = book['book'].isRead ? 'read' : 'unread';
    this.booksByAuthor[book['book'].author][readOrUnread].splice(book['index'], 1);
    delete this.booksByTitle[title];
  }

  readBook(title) {
    if (!this.booksByTitle[title]) {
      throw new Error('"' + title + '" is not in your library.');
    }

    var book = this.booksByTitle[title];
    if (book['book'].isRead) {
      throw new Error("You've already read \"" + title + '". Great job!');
    }

    book['book'].read();
    this.booksByAuthor[book['book'].author]['unread'].splice(book['index'], 1);
    var lengthOfRead = this.booksByAuthor[book['book'].author]['read'].push(book['book']);
    book['index'] = lengthOfRead - 1;

    return book['book'];
  }

  unreadBook(title) {
    if (!this.booksByTitle[title]) {
      throw new Error('"' + title + '" is not in your library.');
    }

    var book = this.booksByTitle[title];
    if (!book['book'].isRead) {
      throw new Error('You have not read "' + title + '" yet.');
    }

    book['book'].unread();
    this.booksByAuthor[book['book'].author]['read'].splice(book['index'], 1);
    var lengthOfRead = this.booksByAuthor[book['book'].author]['unread'].push(book['book']);
    book['index'] = lengthOfRead - 1;

    return book['book'];
  }

  getAllBooks() {
    var books = [];
    for (var title in this.booksByTitle) {
      books.push(this.booksByTitle[title]['book']);
    }
    return books;
  }

  getUnreadBooks() {
    var books = [];
    for (var author in this.booksByAuthor) {
      books.push.apply(books, this.booksByAuthor[author]['unread']);
    }
    return books;
  }

  getBooksByAuthor(author) {
    var books = [];
    if (this.booksByAuthor[author]) {
      books.push.apply(books, this.booksByAuthor[author]['read']);
      books.push.apply(books, this.booksByAuthor[author]['unread']);
    }
    return books;
  }

  getUnreadBooksByAuthor(author) {
    var books = [];
    if (this.booksByAuthor[author]) {
      books.push.apply(books, this.booksByAuthor[author]['unread']);
    }
    return books;
  }
}