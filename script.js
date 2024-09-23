const myLibrary = [];

const aside = document.querySelector("aside");
const submitBtn = document.querySelector("submit");
const newBookBtn = document.createElement("button");
newBookBtn.setAttribute("id", "newBookBtn");
newBookBtn.innerHTML = "<i class='fa-solid fa-circle-plus'></i> Add book";
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
	if (this.read == "read") {
		this.read = "not read yet";
	} else {
		this.read = "read";
	}
};

function addBookToLibrary(book) {
	myLibrary.push(book);
}

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
form.addEventListener("submit", onFormSubmit);
const cross = document.getElementById("cross");
cross.addEventListener("click", () => {
	dialog.close();
});

function onFormSubmit(event) {
	let content = document.querySelector("content");
	event.preventDefault();
	let data = new FormData(event.target);
	let title = data.get("title");
	let author = data.get("author");
	let pages = data.get("pages");
	let read = data.get("readStatus");
	newBook = new Book(title, author, pages, read);
	addBookToLibrary(newBook);
	content.innerHTML = "";
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
	let cardAuthor = document.createElement("p");
	cardAuthor.textContent = book.author;
	let cardPages = document.createElement("p");
	cardPages.textContent = `${book.pages} pages`;
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
	cardReadBtn.setAttribute("id", myLibrary.indexOf(book));
	cardReadBtn.setAttribute("class", "readBtn");
	cardReadBtn.addEventListener("click", function () {
		myLibrary[card.id].toggleRead();
		cardRead.textContent = book.read;
		if (book.read == "read") {
			cardReadBtn.textContent = "Mark unread";
		} else {
			cardReadBtn.textContent = "Mark read";
		}
	});
	if (book.read == "read") {
		cardReadBtn.textContent = "Mark unread";
	} else {
		cardReadBtn.textContent = "Mark read";
	}
	card.appendChild(cardTitle);
	card.appendChild(cardAuthor);
	card.appendChild(cardPages);
	card.appendChild(cardRead);
	card.appendChild(buttonParagraph);
	buttonParagraph.appendChild(cardRemoveBtn);
	buttonParagraph.appendChild(cardReadBtn);
	content.appendChild(card);
}

let theHobbit = new Book("The Hobbit", "JRR Tolkien", "250", "read");

let theNeuromancer = new Book(
	"The Neuromancer",
	"some author",
	"200",
	"not read yet",
);

addBookToLibrary(theNeuromancer);
addBookToLibrary(theHobbit);
myLibrary.map(createCard);

function removeBookFromLibrary(index) {
	let content = document.querySelector("content");
	content.innerHTML = "";
	myLibrary.splice(index, 1);
	myLibrary.map(createCard);
}
