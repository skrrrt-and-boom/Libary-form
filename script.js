let libary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  libary.push(book);
  console.log(libary);
  displayBook();
}

function displayBook() {
  const main = document.querySelector(".main");

  //Remove
  const removeTrash = document.querySelectorAll(".card");
  console.log("Node count of current card", removeTrash);
  for (let i = 0; i < removeTrash.length; i++) {
    removeTrash[i].remove();
  }

  let index = 0
  // Loop over the libary and display
  libary.forEach(libarys => {
    const card = document.createElement("div");
    card.classList.add("card");
    main.appendChild(card);

    // Create remove button
    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book-button");
    removeBookButton.textContent = "Remove from libary";
    console.log("current array object inside foreach...", libary);

    // link data attribute of the remove button to the array and card
    removeBookButton.dataset.linkedArray = index;
    console.log("dataset link back to the array...", removeBookButton.dataset.linkedArray);
    card.appendChild(removeBookButton);

    removeBookButton.addEventListener("click", removeBookFromLibary);

    function removeBookFromLibary() {
      let retriveBookToRemove = removeBookButton.dataset.linkedArray;
      console.log("Attempting to remove array item via data attribute...", parseInt(retriveBookToRemove));
      console.log(libary);
      libary.splice(parseInt(retriveBookToRemove), 1);
      card.remove();
      displayBook();
    }

    //  Read status
    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status-button");
    readStatusButton.textContent = "Toggle Read Status";

    readStatusButton.dataset.linkedArray = index;
    console.log("read status button...", readStatusButton.dataset.linkedArray);
    card.appendChild(readStatusButton);

    readStatusButton.addEventListener("click", toggleReadStatus);

    function toggleReadStatus() {
      let retriveBookToToggle = readStatusButton.dataset.linkedArray;
      Book.prototype = Object.create(Book.prototype);
      const toggleBook = new Book();
      console.log("What is the toggle initial value?...", libary[parseInt(retriveBookToToggle)].read);

      if (read) {
        toggleBook.read = "Yes";
        libary[parseInt(retriveBookToToggle)].read = toggleBook.read;
      } else {
        toggleBook.read = "No";
        libary[parseInt(retriveBookToToggle)].read = toggleBook.read;
      }
    }

    for (let key in libarys) {
      console.log(`${key}: ${libarys[key]}`);
      const para = document.createElement("p");
      para.textContent = (`${key}: ${libarys[key]}`);
      card.appendChild(para);
    }
  })

index++;
}


button.addEventListener("click", showInputBook);

function showInputBook() {
  const inputWin = document.querySelector("#window");
  inputWin.style.display = "";
  console.log("I show you window");
}

function hideInputBook() {
  const inputWin = document.querySelector("#window");
  inputWin.style.display = "none";
  console.log("I hide window");
}

const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", takeFormData);

function takeFormData() {
  console.log("submit was clicked");
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;

  // check if valid
  if ((pages > 0) && (title) && (author)) {
    console.log("I pass valid test");

    //  add Book data to array
    addBookToLibary(title, author, pages, read);
    console.log("I just add book");
    hideInputBook();
    // reset form after succes
    document.getElementById("add-book").reset();
  } else {
    alert("Not valid form");
  }
}
