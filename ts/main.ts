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
    let userBook = getBook();
    if (userBook != null) {
        addBookToWebpage(userBook);
        addBookToStorage(userBook);
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

        // The value of the <input type"date"> is off by one day because of time zone
        // issues. This solution resolves the timezone issue
        // Split dater string into an array "2024-6-15"
        // Result would be {"2024", "6", "15"}
        const dateParts:string[] = releaseDate.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // subtract 1 because month are index based
        const day = parseInt(dateParts[2]);
        const correctDate = new Date(year, month, day);
        addedBook.releaseDate = correctDate;

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
 * Adds a Book object to the web page. Assumes
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addBookToWebpage(b: Book) {
    console.log(b);

    // Add the book to the web page
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;
    // Add h2 to book div <div><h2>Title : ISBN</h2></div>
    bookDiv.appendChild(titleHeading); 

    let bookDescription:HTMLParagraphElement = document.createElement("p");
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD",
    });
    let formattedPrice = currencyFormatter.format(b.price);
    bookDescription.textContent = `This book was release on ${b.releaseDate} and costs ${formattedPrice}`;
    bookDiv.appendChild(bookDescription);

    // Add bookDiv to web page
    // let bookDisplayDiv = document.querySelector("#book-display");
    // bookDisplayDiv.appendChild(bookDiv); // Add the newly created book

    document.querySelector("#book-display").appendChild(bookDiv);
}

/**
 * Adds a single book object to existing storage.
 * if no books are currently stored a new list will be created and stored
 * @param b The book will be added to
 */
function addBookToStorage(b:Book):void {
    const BookStorageKey = "Books";
    // Read existing books out of storage
    let bookData = localStorage.getItem(BookStorageKey);

    // if bookData is null, the "Books" key did not exist
    if (bookData == null) {
        // Create a new list and add our current book
        let books:Book[] = [];
        books.push(b);

        // Add a localStorage
        bookData = JSON.stringify(books);
        localStorage.setItem(BookStorageKey, bookData);
    }
    else{
        // Parse string into a list of books and add new book to the list
        // store the newly modified list back in storage
    }

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