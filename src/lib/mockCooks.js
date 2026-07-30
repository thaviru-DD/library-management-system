// Starting book data. Seeds localStorage the very first time the app
// runs — after that, bookStorage.js reads/writes whatever is actually
// in localStorage (including any admin edits, once that's rebuilt too).

export const mockBooks = [
    {
      id: 'b001',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Non-Fiction',
      status: 'AVAILABLE', // AVAILABLE | RESERVED | UNDER_MAINTENANCE
      image: '/bookCovers/book1.jpg',
      description: 'Timeless lessons on wealth, greed, and happiness.',
      price: 14,
    },
    {
      id: 'b002',
      title: 'Company of One',
      author: 'Paul Jarvis',
      category: 'Business',
      status: 'AVAILABLE',
      image: '/bookCovers/book2.jpg',
      description: 'Why staying small is the next big thing for business.',
      price: 12,
    },
    {
      id: 'b003',
      title: 'How Innovation Works',
      author: 'Matt Ridley',
      category: 'Science',
      status: 'RESERVED',
      image: '/bookCovers/book3.jpg',
      description: 'And why it flourishes in freedom.',
      price: 16,
    },
    {
      id: 'b004',
      title: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      category: 'Fiction',
      status: 'AVAILABLE',
      image: '/bookCovers/book4.jpeg',
      description: 'A classic tale of vanity, corruption, and the cost of eternal youth.',
      price: 9,
    },
    {
      id: 'b005',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'History',
      status: 'RESERVED',
      image: '/bookCovers/book5.jpg',
      description: 'A brief history of humankind.',
      price: 18,
    },
  ];
  
  export const CATEGORY_OPTIONS = ['Fiction', 'Non-Fiction', 'Business', 'Science', 'History', 'Biography', 'Poetry'];
  export const STATUS_OPTIONS = ['AVAILABLE', 'RESERVED', 'UNDER_MAINTENANCE'];