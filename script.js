const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addSingleBook(book) {
  const shelf = document.querySelector(".shelf");

  const singleBook = document.createElement("div");
  singleBook.classList.add("book");
  singleBook.setAttribute("data-id", book.id);

  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = `Title: ${book.title}`;
  singleBook.appendChild(title);

  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = `Author: ${book.author}`;
  singleBook.appendChild(author);

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = `Pages: ${book.pages}`;
  singleBook.appendChild(pages);

  const label = document.createElement("label");
  label.textContent = "Read?";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = book.read;
  label.appendChild(checkbox);
  singleBook.appendChild(label);
  checkbox.addEventListener("change", () => {
    book.read = checkbox.checked;
  });

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove");
  removeButton.textContent = "Remove Book";
  removeButton.addEventListener("click", () => {
    const index = myLibrary.findIndex(b => b.id === book.id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      singleBook.remove();
    }
  });
  singleBook.appendChild(removeButton);

  shelf.appendChild(singleBook);
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  addSingleBook(newBook);
}

function publishBook() {
  const form = document.querySelector("form");

  const getForm = () => ({
    title: form.elements.title.value,
    author: form.elements.author.value,
    pages: form.elements.pages.value,
    read: form.elements.read.checked,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, author, pages, read } = getForm();
    addBookToLibrary(title, author, pages, read);
    form.reset();
  });
}

publishBook();