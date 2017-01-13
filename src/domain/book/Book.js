module.exports = class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.isRead = false;
  }

  read() {
    this.isRead = true;
  }

  unread() {
    this.isRead = false;
  }

  toString() {
    return '"' + this.title + '" by ' + this.author + ' ('
      + (this.isRead ? 'read' : 'unread') + ')';
  }
}