module.exports = class ShowAllByCommand {
  constructor(author) {
    this.author = author;
  }

  execute(library) {
    var output = '';
    var books = library.getBooksByAuthor(this.author);
    if (books.length === 0) {
      output = 'There are no books by ' + this.author + ' in your library';
    }
    for (var i in books) {
      output += books[i].toString() + "\n";
    }
    return output;
  }

  static getDescription() {
    return 'show all by "author": shows all the books by the given author';
  }
}
