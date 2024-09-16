const myLibrary = []
const main = document.querySelector("main")

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

function addBookToLibrary(book) {
  myLibrary.push(book)
}

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 300, "read")

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

addBookToLibrary(theHobbit)
showTable()

//Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want. You will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. This is where event.preventDefault(); will come in handy. Check out the documentation for event.preventDefault and see how you can solve this issue!

const dialog = document.createElement("dialog")
dialog.innerHTML = `<form><label for='title'>Title</label><input type='text' id='title'><label for='author'>Author</label><input type ='text' id='author'><label for='pages'>No. of pages</label><input type='number' id='pages'>

<label for='read'>Read</label><input type='radio' name='readStatus' id='read' value='read'>

<label for="notReadYet">Not read yet</label><input type='radio' name='readStatus' value='not read yet' id='notReadYet'><input type="submit" id="submit" value="Add book"></form>`
main.appendChild(dialog)

const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", function (event) {
  event.preventDefault()
  book = new Book(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.querySelector("input[type=radio][name=readStatus]:checked").value
  )
  addBookToLibrary(book)
  console.log(myLibrary)
  showTable()
  dialog.close()
})

/*function createBook() {
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value
  let read = document.querySelector(
    "input[type=radio][name=readStatus]:checked"
  ).value
  return (book = new Book(title, author, pages, read))
}*/

const newBookBtn = document.createElement("button")
newBookBtn.setAttribute("id", "newBookBtn")
newBookBtn.textContent = `NEW BOOK`
newBookBtn.addEventListener("click", () => {
  dialog.showModal()
})

main.appendChild(dialog)
main.appendChild(newBookBtn)
