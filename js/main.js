class Book {
}
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for beginners";
myBook.releaseDate = new Date(2024, 5, 23);
console.log(myBook);
window.onload = function () {
    let addBookButton = document.querySelector("#add-book");
    addBookButton.onclick = processBook;
};
function processBook() {
    console.log("processBook was called");
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
function getBook() {
    return null;
}
function addBook(b) {
}
