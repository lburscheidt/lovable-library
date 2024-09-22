const myLibrary = [];
const main = document.querySelector("main");
const newBookBtn = document.createElement("button");
newBookBtn.setAttribute("id", "newBookBtn");
newBookBtn.textContent = `New book`;

main.appendChild(newBookBtn);

function Book(title, author, pages, read) {
	this.Title = title;
	this.Author = author;
	this["No. of pages"] = pages;
	this["Read?"] = read;
	/*this['BookNumber'] = '';*/
}

Book.prototype.info = function () {
	return `${this.Title} by ${this.Author}. ${this["No. of pages"]} pages. ${this["Read?"]}.`;
};

//Add a button on each book’s display to change its read status.To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

Book.prototype.toggleRead = function () {
	if (this["Read?"] === "read") {
		this["Read?"] = "not read yet";
	} else {
		this["Read?"] = "read";
	}
};

//All of your book objects are going to be stored in an array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array.

function addBookToLibrary(book) {
	myLibrary.push(book);
	/*book["Book Number"] = myLibrary.indexOf(book)*/
}

const initialBook = Object.create(Book);
initialBook.title = "";
initialBook.author = "";
initialBook["No. of pages"] = "";
initialBook["Read?"] = "";

addBookToLibrary(initialBook);
showTable();
//Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.

function showTable() {
	oldTable = document.querySelector("table");
	if (oldTable) {
		oldTable.parentNode.removeChild(oldTable);
	}
	document.querySelector("main").insertAdjacentHTML(
		"afterbegin",
		`<table id="myCatalog"><thead><tr><th>
   ${Object.keys(myLibrary[0]).join("<th>")}
  </thead><tbody><tr><td>${myLibrary
		.map(e => Object.values(e).join("<td>"))
		.join("<tr><td>")}</table>`,
	);
}

showTable();
addColumnHeaderRemove();
addRemoveButtons();
addColumnHeaderRead();
addReadButtons();

//Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want. You will most likely encounter an issue where submitting your form will not do what you expect it to do. That’s because the submit input tries to send the data to a server by default. This is where event.preventDefault(); will come in handy. Check out the documentation for event.preventDefault and see how you can solve this issue!

const dialog = document.createElement("dialog");
dialog.innerHTML = `<form><label for='title'>Title</label><input type='text' id='title'><label for='author'>Author</label><input type ='text' id='author'><label for='pages'>No. of pages</label><input type='number' id='pages'>
<fieldset>
<label for='read'><input type='radio' name='readStatus' id='read' value='read'> Read</label>

<label for="notReadYet"><input type='radio' name='readStatus' value='not read yet' id='notReadYet'> Not read yet</label></fieldset><input type="submit" id="submit" value="Add book"></form>`;

main.appendChild(dialog);
newBookBtn.addEventListener("click", () => {
	dialog.show();
});

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function (event) {
	event.preventDefault();
	book = new Book(
		document.getElementById("title").value,
		document.getElementById("author").value,
		document.getElementById("pages").value,
		document.querySelector("input[type=radio][name=readStatus]:checked").value,
	);
	addBookToLibrary(book);
	showTable();
	addColumnHeaderRemove();
	addRemoveButtons();
	addColumnHeaderRead();
	addReadButtons();
	dialog.close();
});

main.appendChild(dialog);
main.appendChild(newBookBtn);

//Add a button on each book’s display to remove the book from the library. You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

function addColumnHeaderRemove() {
	document
		.querySelector("thead tr")
		.insertAdjacentHTML("beforeend", `<th>Remove book</th>`);
}

function addRemoveButtons() {
	let trs = document.querySelectorAll("tbody tr");
	for (let tr of trs) {
		tr.insertAdjacentHTML(
			"beforeend",
			`<td><button class="removeBtn" name="${tr.rowIndex - 1}">Remove this book</button></td>`,
		);
	}
	let removeBtns = document.querySelectorAll(".removeBtn");
	removeBtns.forEach(btn => {
		btn.addEventListener("click", function () {
			myLibrary.splice(btn.name, 1);
			showTable();
		});
	});
}

//Add a button on each book’s display to change its read status.To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

function addColumnHeaderRead() {
	document
		.querySelector("thead tr")
		.insertAdjacentHTML("beforeend", `<th>Toggle Read/Unread</th>`);
}

function addReadButtons() {
	let trs = document.querySelectorAll("tbody tr");
	for (let tr of trs) {
		tr.insertAdjacentHTML(
			"beforeend",
			`<td><button class="readBtn" name ="${tr.rowIndex - 1} ">Toggle read/unread</button></td>`,
		);
	}
	let readBtns = document.querySelectorAll(".readBtn");
	for (btn of readBtns) {
		btn.addEventListener("click", function () {
			let index = Number(btn.name);
			myLibrary[index].toggleRead();
			showTable();
			addColumnHeaderRemove();
			addRemoveButtons();
			addColumnHeaderRead();
			addReadButtons();
		});
	}
}
