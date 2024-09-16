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
//All of your book objects are going to be stored in an array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array.

function addBookToLibrary() {
  let title = prompt("Enter title")
  let author = prompt("Enter author")
  let pages = prompt("Enter number of pages")
  let read = prompt("Have you read the book?")
  let book = new Book(title, author, pages, read)
  myLibrary.push(book)
}

//Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
function showTable() {
  oldCatalog = document.querySelector("table")
  if (oldCatalog) {
    oldCatalog.parentNode.removeChild(oldCatalog)
  }
  document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `<table id="myCatalog"><thead><tr><th>
   ${Object.keys(myLibrary[0]).join("<th>")}
  </thead><tbody><tr><td>${myLibrary
    .map(e => Object.values(e).join("<td>"))
    .join("<tr><td>")}</table>`
  )
}

window.addEventListener("click", () => {
  addBookToLibrary()
  showTable()
})
