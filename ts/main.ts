/**
 * Represents a individual book that can be purchased.
 */
class Book {
    /**
     * The 13 digit ISBN number
     */
    isbn: string;

    /**
     * The title of the book
     */
    title: string;

    /**
     * The retail price of the book
     */
    price: number;

    /**
     * The date the book was first published. This could be a
     * future date if the book has not been released yet.
     */
    releaseDate: Date;
}

// Book object test code
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for beginners";
myBook.releaseDate = new Date(2024, 5, 23); // Months start at index 0

console.log(myBook);


window.onload = function() {
    // Set up a button click for add book form
    let addBookButton = document.querySelector("#add-book") as HTMLButtonElement;
    addBookButton.onclick = processBook;
}

function processBook() {
    console.log("processBook was called");

    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}

/**
 * This function will retrieve all the book
 * data from the HTML page. If all data is valid
 * a Book object will bre returned. If any data
 * is invalid null will be returned. and error messages
 * will be shown on the web page.
 */
function getBook(): Book {
    // get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate the ISBN
    let isbn:string = isbnTextBox.value;
    if (!isValidIsbn(isbn)) {
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }

    
}

/**
 * This validates an ISBN 13 number. Returns true
 * if the ISBN onlt consists of 13 digits characters
 * @param data The string to bne validates
 * @returns True if the data is a valid ISBN 13 number
 */
function isValidIsbn(data:string) {
    let regex = /^\d{13}$/; // match 13 digits exactly
    return regex.test(data);
}

/**
 * Adds a Book object to web storage. Assumes
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook(b: Book) {
    
}