class Book {
  constructor(title, description, author) {
    this.title = title;
    this.description = description;
    this.author = author;
    this.id = this.generateUniqueId();
  }

  static usedIds = [];

  generateUniqueId() {
    let newId;
    do {
      newId = (Math.random()*1000).toString(36);
    } while (Book.usedIds.includes(newId));

    Book.usedIds.push(newId);
    return newId;
  }
}


class Library {
  constructor() {
    this.books = [];
  }

  addBook(bookInfo) {
    const newBook = new Book(bookInfo.title, bookInfo.description, bookInfo.author);
    this.books.push(newBook);
    return newBook;
  }

  getBooks() {
    return this.books;
  }

  getBooksTitles() {
    const bookTitles = this.books.map(book => book.title);
    return bookTitles.join('\n');
  }

  removeBookById(id) {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return "Livro removido"
    }
    return "ID do livro não corresponde a nenhum livro da lista"
  }

  getBookById(id) {
    return this.books.find(book => book.id === id);
  }

  updateBookById(id, info) {
    const book = this.getBookById(id);
    if (book) {
      if (info.title !== undefined) {
        book.title = info.title;
      }
      if (info.description !== undefined) {
        book.description = info.description;
      }
      if (info.author !== undefined) {
        book.author = info.author;
      }
      return "Livro atualizado com sucesso";
    }
    return "ID do livro não corresponde a nenhum livro da lista";
  }
}


//Example
const myLibrary = new Library();

const book1 = myLibrary.addBook({
  title: 'Livro 1',
  description: 'Descrição do Livro 1',
  author: 'Autor 1',
});

const book2 = myLibrary.addBook({
  title: 'Livro 2',
  description: 'Descrição do Livro 2',
  author: 'Autor 2',
});

console.log(myLibrary.getBooks());
console.log(myLibrary.getBooksTitles());
console.log(myLibrary.updateBookById(book1.id, {description: 'Nova descrição'}));
console.log(myLibrary.updateBookById(2, {description: 'Nova descrição'}));
console.log(myLibrary.getBookById(book1.id));
console.log(myLibrary.removeBookById(book2.id));
console.log(myLibrary.removeBookById(2));
console.log(myLibrary.getBooks());