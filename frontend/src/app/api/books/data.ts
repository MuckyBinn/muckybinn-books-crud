// src/app/api/books/data.ts
export let books: any[] = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    pages: 464,
    coverImageUrl: "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    description: "A Handbook of Agile Software Craftsmanship",
    genre: "Programming",
    publisher: "Prentice Hall",
    language: "English",
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    year: 1999,
    pages: 352,
    coverImageUrl: "https://miro.medium.com/v2/resize:fit:1400/0*1Chs1iKrkmQc7esc.jpg",
    description: "Your Journey to Mastery",
    genre: "Programming",
    publisher: "Addison-Wesley",
    language: "English",
  },
];

export function addBook(book: any) {
  books.push(book);
}
