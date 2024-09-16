const myLibrary = []

function Book(title, author, pages, read) {
  this.Title = title
  this.Author = author
  this["No. of pages"] = pages
  this["Read?"] = read
}

Book.prototype.info = function () {
  return `${this.Title} by ${this.Author}. ${this["No. of pages"]} pages. ${this["Read?"]}.`
}

function addBookToLibrary() {
  let title = prompt("Enter title")
  let author = prompt("Enter author")
  let pages = prompt("Enter number of pages")
  let read = prompt("Have you read the book?")
  let book = new Book(title, author, pages, read)
  myLibrary.push(book)
}

addBookToLibrary()
console.log(myLibrary)
