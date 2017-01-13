module.exports = class ReadCommand {
  constructor(title) {
    this.title = title;
  }

  execute(library) {
    var output = '';
    try {
      var book = library.readBook(this.title);
      output = '"' + this.title + '" by ' + book.author + ' marked as read';
    } catch (e) {
      output = e.message;
    }
    return output;
  }

  static getDescription() {
    return 'read "title": marks a book as read';
  }
}
