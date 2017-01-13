module.exports = class ShowUnreadCommand {
  execute(library) {
    var output = '';
    var books = library.getUnreadBooks();
    if (books.length === 0) {
      output = 'There are no unread books in your library.';
    }
    for (var i in books) {
      output += books[i].toString() + "\n";
    }
    return output;
  }
}
