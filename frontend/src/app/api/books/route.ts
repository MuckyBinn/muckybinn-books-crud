import { NextResponse } from "next/server";
import { books, addBook } from "./data";

// อ่านหนังสือทั้งหมด
export async function GET() {
  return NextResponse.json({ books });
}

// เพิ่มหนังสือใหม่
export async function POST(req: Request) {
  const body = await req.json();
  const { title, author, year, pages, coverImageUrl } = body;

  if (!title || !author) {
    return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
    pages,
    coverImageUrl,
  };

  addBook(newBook);
  return NextResponse.json({ message: "เพิ่มหนังสือสำเร็จ", book: newBook });
}
