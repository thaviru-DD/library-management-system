import { mockBooks } from './mockCooks.js';

const BOOKS_KEY = 'lms_books';

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

// Returns the current book list, seeding localStorage with mock data
// the very first time this runs (so the app isn't empty on first load).
export function getBooks() {
  if (typeof window === 'undefined') return [];

  const existing = localStorage.getItem(BOOKS_KEY);
  if (existing === null) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(mockBooks));
    return mockBooks;
  }
  return safeParse(existing, mockBooks);
}

function saveBooks(books) {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

export function addBook(book) {
  const books = getBooks();
  const newBook = { ...book, id: `b${Date.now()}` };
  const updated = [...books, newBook];
  saveBooks(updated);
  return newBook;
}

export function updateBook(id, updates) {
  const books = getBooks();
  const updated = books.map((b) => (b.id === id ? { ...b, ...updates } : b));
  saveBooks(updated);
}

export function deleteBook(id) {
  const books = getBooks();
  const updated = books.filter((b) => b.id !== id);
  saveBooks(updated);
}