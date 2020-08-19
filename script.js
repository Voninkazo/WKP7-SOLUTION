let books = [];

// add an element to the list with the form
// The element is added on the list
// reset the form after submission
// Not add an empty element
// delete an element
// edit the state of an element
// save new element to local storage
// save the new state of object in local storage
// form validation?

const tableList = document.querySelector('tbody');
const form = document.querySelector('form');
const showBooks = () => {
    const html = books
        .map(book => {
            return `
        <tr>
            <td class="left">${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td>
                <button value="${book.id}" class="check" area-label="Update read attribute of ${book.title}">
                    <img ${book.read ? "" : "hidden"} 
                        src="./assets/icons/checked.svg" 
                        alt="the book ${book.title} is read">
                    <img ${book.read ? "hidden" : ""} 
                        src="./assets/icons/unchecked.svg" 
                        alt="the book ${book.title} is not read yet">
                </button>
            </td>
            <td>
                <button value="${book.id}" class="delete" area-label="Delete the ${book.title} from the list">
                    <img src="./assets/icons/trash.svg" alt="Delete ${book.title} from the list">
                </button>
            </td>
        </tr>
        `;
        }).join('');
    tableList.innerHTML = html;
};
showBooks();
const addBook = e => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const newBook = {
        title: formEl.title.value,
        author: formEl.author.value,
        genre: formEl.genre.value,
        pages: formEl.pages.value,
        read: formEl.read.value === 'true', // or false if anything else
        id: Date.now()
    };
    books.push(newBook);
    console.log(books)
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};
const handleClick = e => {
    const checkBtn = e.target.closest('button.check');
    if (checkBtn) {
        const id = Number(checkBtn.value);
        updateRead(id);
    }
    const deleteBtn = e.target.closest('button.delete');
    if (deleteBtn) {
        const id = Number(deleteBtn.value);
        deleteBook(id);
    }
};
const deleteBook = id => {
    books = books.filter(book => book.id !== id);
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};
const updateRead = id => {
    const bookToUpdate = books.find(book => book.id === id);
    bookToUpdate.read = !bookToUpdate.read; // it is passed the reference so it also change the value in the object
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
    console.log(bookToUpdate);
    console.log(books);
};
//When we reload the app we want to look inside the local storage 
const initLocalStorage = () => {
    const booksLs = JSON.parse(localStorage.getItem('books'));
    if (!booksLs) {
        books = [];
    } else {
        books = booksLs;
    }
    tableList.dispatchEvent(new CustomEvent('listUpdated'));
};
const updateLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
};
form.addEventListener('submit', addBook);
tableList.addEventListener('listUpdated', showBooks);
tableList.addEventListener('listUpdated', updateLocalStorage)
window.addEventListener('DOMContentLoaded', showBooks); // start the app
tableList.addEventListener('click', handleClick);
initLocalStorage();