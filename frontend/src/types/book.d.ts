
interface User {
  _id: string;
  username: string;
  email: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  year: number;
  price: number;
  available: boolean;
  addedBy: User;
  createdAt: string; 
  updatedAt: string; 
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface BookResponse {
  books: Book[];
  pagination: Pagination;
}

export type { User, Book, Pagination, BookResponse };
