module.exports = class AddCommand {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  execute(library) {
    var output = '';
    try {
      library.addBook(this.title, this.author);
      output = 'Added "' + this.title + '" by ' + this.author;
    } catch (e) {
      output = e.message;
    }
    return output;
  }

  static getDescription() {
    return 'add "title" "author":  adds a book to the library';
  }
}