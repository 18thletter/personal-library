module.exports = class ShowAllCommand {
  execute(library) {
    var output = '';
    var books = library.getAllBooks();
    if (books.length === 0) {
      output = 'There are no books in your library';
    }
    for (var i in books) {
      output += books[i].toString() + "\n";
    }
    return output;
  }
}
