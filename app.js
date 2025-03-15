const library = []

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }

  readToggle() {
    this.read = !this.read
  }
}

function bookUiCreator(lib, currentBook) {
  const book = document.createElement("div")
  book.setAttribute("id", "book")
  book.classList.add("book-container__book")

  const bookRemoveContainer = document.createElement("div")
  bookRemoveContainer.classList.add("book-container__book-remove-container")
  const bookRemoveButton = document.createElement("div")
  bookRemoveButton.classList.add("book-container__book-remove")
  bookRemoveButton.addEventListener("click", () => {
    book.remove()
    const bookIndex = lib.indexOf(currentBook)
    library.splice(bookIndex, 1)
    displayBook()
  })
  const bookRemoveIcon = document.createElement("img")
  bookRemoveIcon.setAttribute("src", "./assets/icons/close.svg")
  bookRemoveIcon.setAttribute("alt", "remove-book-icon")
  bookRemoveIcon.classList.add("book-container__book-remove-icon")
  bookRemoveButton.appendChild(bookRemoveIcon)
  bookRemoveContainer.appendChild(bookRemoveButton)

  const bookInfoContainer = document.createElement("div")
  bookInfoContainer.classList.add("book-container__book-info-container")
  const bookTitle = document.createElement("h2")
  bookTitle.textContent = currentBook.title
  bookTitle.classList.add("book-container__book-title")
  const bookAuthor = document.createElement("p")
  bookAuthor.textContent = `Author: ${currentBook.author}`
  bookAuthor.classList.add("book-container__book-author")
  const bookPages = document.createElement("p")
  bookPages.textContent = `Pages: ${currentBook.pages ? currentBook.pages : "Unknown"}`
  bookPages.classList.add("book-container__book-pages")
  bookInfoContainer.appendChild(bookTitle)
  bookInfoContainer.appendChild(bookAuthor)
  bookInfoContainer.appendChild(bookPages)

  const bookStatusContainer = document.createElement("div")
  bookStatusContainer.classList.add("book-container__book-status-container")
  const bookStatusButton = document.createElement("button")
  bookStatusButton.textContent = `Read: ${currentBook.read ? "Yes" : "No"}`
  bookStatusButton.setAttribute("type", "button")
  bookStatusButton.classList.add("book-container__book-status-toggle")
  bookStatusButton.addEventListener("click", () => {
    currentBook.readToggle()
    bookStatusButton.textContent = `Read: ${currentBook.read ? "Yes" : "No"}`
  })
  bookStatusContainer.appendChild(bookStatusButton)

  book.appendChild(bookRemoveContainer)
  book.appendChild(bookInfoContainer)
  book.appendChild(bookStatusContainer)
  return book
}

function displayBook() {
  const bookContainer = document.querySelector("#book-container")
  bookContainer.querySelectorAll(`#book`).forEach((child) => child.remove())
  for (let i = 0; i < library.length; i++) {
    bookContainer.appendChild(bookUiCreator(library, library[i]))
  }
}

function addBookToLibrary(book) {
  library.push(book)
  displayBook()
}
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, true, library.length)
addBookToLibrary(book1)

const openModalButton = document.querySelector("#open-book-modal-button")
const closeModalButton = document.querySelector("#close-book-modal-button")
const bookModal = document.querySelector("#book-modal")
const bookForm = document.querySelector("#book-form")

openModalButton.addEventListener("click", () => {
  bookModal.style.display = "grid"
  document.body.classList.add("modal-open")
})

closeModalButton.addEventListener("click", () => {
  bookModal.style.display = "none"
  document.body.classList.remove("modal-open")
  bookForm.reset()
})

bookForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const bookTitle = document.querySelector("#book-title")
  const bookAuthor = document.querySelector("#book-author")
  const bookPages = document.querySelector("#book-pages")
  const bookRead = document.querySelector("#book-read")

  if (bookTitle.value == "" || bookAuthor.value == "") {
    alert("Title and Author is required!")
  } else {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)
    addBookToLibrary(newBook)
    bookModal.style.display = "none"
    document.body.classList.remove("modal-open")
    bookForm.reset()
  }
})
