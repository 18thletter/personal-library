module.exports = class ShowUnreadByCommand {
  constructor(author) {
    this.author = author;
  }

  execute(library) {
    var output = '';
    var books = library.getUnreadBooksByAuthor(this.author);
    if (books.length === 0) {
      output = 'There are no unread books by ' + this.author + ' in your library.';
    }
    for (var i in books) {
      output += books[i].toString() + "\n";
    }
    return output;
  }
}
