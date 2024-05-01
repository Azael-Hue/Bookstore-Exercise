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
 * is invalid null will be returned.
 */
function getBook(): Book {
    return null;
}

/**
 * Adds a Book object to web storage. Assumes
 * all data is valid
 * @param b The Book containing valid data to be added
 */
function addBook(b: Book) {
    
}