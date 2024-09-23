const myLibrary = [];

const aside = document.querySelector("aside");
const submitBtn = document.querySelector("submit");
const newBookBtn = document.createElement("button");
newBookBtn.innerHTML = "<i class='fa-solid fa-circle-plus'></i>Add book";
aside.appendChild(newBookBtn);

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function () {
	return `${this.Title} by ${this.Author}. ${this.pages}. ${this.read}.`;
};

Book.prototype.toggleRead = function () {
	if (this["Read?"] === "read") {
		this["Read?"] = "not read yet";
	} else {
		this["Read?"] = "read";
	}
};

function addBookToLibrary(book) {
	myLibrary.push(book);
}

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
	event.preventDefault();
	let data = new FormData(event.target);
	let title = data.get("title");
	let author = data.get("author");
	let pages = data.get("pages");
	let read = data.get("readStatus");
	newBook = new Book(title, author, pages, read);
	addBookToLibrary(newBook);
	myLibrary.map(createCard);
	dialog.close();
}

newBookBtn.addEventListener("click", () => {
	dialog.showModal();
});

function createCard(book) {
	let content = document.querySelector("content");
	let card = document.createElement("card");
	card.setAttribute("id", myLibrary.indexOf(book));
	let cardTitle = document.createElement("h1");
	cardTitle.textContent = book.title;
	console.log(cardTitle);
	let cardAuthor = document.createElement("p");
	cardAuthor.textContent = book.author;
	let cardPages = document.createElement("p");
	cardPages.textContent = book.pages;
	let cardRead = document.createElement("p");
	cardRead.textContent = book.read;
	let buttonParagraph = document.createElement("p");
	buttonParagraph.classList.add("buttons");
	let cardRemoveBtn = document.createElement("button");
	cardRemoveBtn.textContent = "Remove";
	cardRemoveBtn.classList.add("removeBtn");
	cardRemoveBtn.addEventListener("click", function () {
		removeBookFromLibrary(card.id);
	});
	let cardReadBtn = document.createElement("button");
	cardReadBtn.classList.add("readBtn");
	book.read == "read"
		? (cardReadBtn.textContent = "Mark unread")
		: (cardReadBtn.textContent = "Mark read");

	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(cardRead);
	card.appendChild(buttonParagraph);
	buttonParagraph.appendChild(cardRemoveBtn);
	buttonParagraph.appendChild(cardReadBtn);
	content.appendChild(card);
	console.log(cardRemoveBtn.id);
}

let theHobbit = new Book("The Hobbit", "JRR Tolkien", "250 pages", "read");

let theNeuromancer = new Book(
	"The Neuromancer",
	"some author",
	"200 pages",
	"not read yet",
);

addBookToLibrary(theHobbit);
addBookToLibrary(theNeuromancer);
console.log(myLibrary);
myLibrary.map(createCard);

function removeBookFromLibrary(index) {
	let content = document.querySelector("content");
	content.innerHTML = "";
	console.log(myLibrary);
	myLibrary.splice(index, 1);
	myLibrary.map(createCard);
}




/*
let readBtns = document.querySelectorAll("readBtn");

readBtns.forEach(btn =>
	btn.addEventListener("click", event => {
		toggleRead;
	}),
);
*/
/*
const main = document.querySelector("main");
const bookDialog = document.createElement("dialog");
const bookForm = document.createElement("form");
const titleLabel = document.createElement("label");
const titleInput = document.createElement("input");
titleLabel.textContent = "Title";
titleLabel.setAttribute("for", "title");
titleInput.setAttribute("id", "title");
titleInput.setAttribute("type", "text");
titleInput.setAttribute("minlength", "1");
titleInput.required = true;

const authorLabel = document.createElement("label");
const authorInput = document.createElement("input");
authorLabel.textContent = "Author";
authorLabel.setAttribute("for", "author");
authorInput.setAttribute("id", "author");
authorInput.setAttribute("type", "text");
authorInput.setAttribute("minlength", "1");
authorInput.required = true;

const pagesLabel = document.createElement("label");
const pagesInput = document.createElement("input");
pagesLabel.textContent = "No. of pages";
pagesLabel.setAttribute("for", "pages");
pagesInput.setAttribute("id", "pages");
pagesInput.setAttribute("type", "text");
pagesInput.setAttribute("min", "1");
pagesInput.required = true;

const radiobuttonFieldset = document.createElement("fieldset");
const readLabel = document.createElement("label");
readLabel.textContent = "Read";
const readInput = document.createElement("input");
readInput.setAttribute("type", "radio");
readInput.setAttribute("id", "read");
readInput.setAttribute("name", "readStatus");
readInput.setAttribute("value", "read");

const notReadLabel = document.createElement("label");
const notReadInput = document.createElement("input");
notReadLabel.textContent = "Not read yet";
notReadInput.setAttribute("type", "radio");
notReadInput.setAttribute("id", "notReadYet");
notReadInput.setAttribute("name", "readStatus");
notReadInput.setAttribute("value", "not read yet");

const submitBtn = document.createElement("input");
submitBtn.setAttribute("id", "submit");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("value", "Add book");

bookDialog.appendChild(bookForm);
bookForm.appendChild(titleLabel);
bookForm.appendChild(titleInput);

bookForm.appendChild(authorLabel);
bookForm.appendChild(authorInput);

bookForm.appendChild(pagesLabel);
bookForm.appendChild(pagesInput);

bookForm.appendChild(radiobuttonFieldset);
radiobuttonFieldset.appendChild(readLabel);
radiobuttonFieldset.appendChild(notReadLabel);
readLabel.appendChild(readInput);
notReadLabel.appendChild(notReadInput);
main.appendChild(bookDialog);

newBookBtn.addEventListener("click", () => {
	bookDialog.showModal();
});

/*

addRemoveButtons();

addReadButtons();


/*
function validateInput() {
	let titleInput = document.getElementById("title");
	let titleValidity = titleInput.checkValidity();
	let authorInput = document.getElementById("author").textContent;
	let authorValidity = authorInput.checkValidity();
	let pagesInput = document.getElementById("pages");
	let pagesValidity = pagesInput.checkValidity();
	if (titleValidity && authorValidity && pagesValidity) {
		return true;
	} else {
		if (!titleValidity) {
			titleInput.innerHTML = titleInput.validationMessage;
		}
		if (!authorValidity) {
			authorInput.innerHTML = authorInput.validationMessage;
		}
		if (!pagesValidity) {
			pagesInput.innerHTML = pagesInput.validationMessage;
		}
	}
}
*/
/*
submitBtn.addEventListener("click", function (event) {
	event.preventDefault();
	if (validateInput()) {
		book = new Book(
			document.getElementById("title").value,
			document.getElementById("author").value,
			document.getElementById("pages").value,
			document.querySelector(
				"input[type=radio][name=readStatus]:checked",
			).value,
		);
		addBookToLibrary(book);
		showTable();
		addColumnHeaderRemove();
		addRemoveButtons();
		addColumnHeaderRead();
		addReadButtons();
		bookDialog.close();
	}
});

main.appendChild(newBookBtn);

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
*/
