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
    clearAllErrorMessages();

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

    // Validate the title
    let title:string = titleTextBox.value;
    if (title.trim() == "") {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title";
    }
    
    // Validate the price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number";
    }

    // Validate the release date
    let releaseDate = releaseDateTextBox.value;
    let releaseDateCheck = Date.parse(releaseDate); // if Invalid, this will return NaN
    if (isNaN(releaseDateCheck)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date";
    }

    if (isValidData) {
        // Create and populate Book project if all data is valid
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;
        addedBook.releaseDate = new Date(releaseDate);

        return addedBook;
    }
    return null; // return null if any data is invalid
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
 * Adds a Book object to the web page and to web storage. Assumes
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook(b: Book) {
    console.log(b);

    // Add the book to the web page
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;
    // Add h2 to book div <div><h2>Title : ISBN</h2></div>
    bookDiv.appendChild(titleHeading); 

    let bookDescription:HTMLParagraphElement = document.createElement("p");
    bookDescription.textContent = `This book was release on ${b.releaseDate} and costs ${b.price}`;
    bookDiv.appendChild(bookDescription);

    // Add bookDiv to web page
    // let bookDisplayDiv = document.querySelector("#book-display");
    // bookDisplayDiv.appendChild(bookDiv); // Add the newly created book

    document.querySelector("#book-display").appendChild(bookDiv);
}

/**
 *  Clear all the validation error messages
 *  spans in the form
 */
function clearAllErrorMessages() {
    // Get all error spans
    let allSpans = document.querySelectorAll("form span.error-msg");

    // Loop through, and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        let currSpan = allSpans[i];
        currSpan.textContent = "";
    }
}