var AddCommand = require('./AddCommand');
var ReadCommand = require('./ReadCommand');

module.exports = class UndoCommand {
  constructor(previousCommand) {
    this.previousCommand = previousCommand;
  }

  execute(library) {
    var output = '';
    try {
      if (this.previousCommand instanceof AddCommand) {
        library.removeBook(this.previousCommand.title);
        output = 'Removed "' + this.previousCommand.title + '" by ' + this.previousCommand.author;;
      } else if (this.previousCommand instanceof ReadCommand) {
        var book = library.unreadBook(this.previousCommand.title);
        output = '"' + book.title + '" by ' +  book.author + ' marked as unread';
      }
    } catch (e) {
      output = e.message;
    }
    return output;
  }
}
