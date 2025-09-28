import { NextResponse } from "next/server";
import { books } from "../data";

// อ่านหนังสือรายเล่ม
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === parseInt(params.id));
  if (!book) {
    return NextResponse.json({ error: "ไม่พบหนังสือ" }, { status: 404 });
  }
  return NextResponse.json({ book });
}

// อัปเดตหนังสือ
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { title, author, year, pages, coverImageUrl } = body;

  const book = books.find((b) => b.id === parseInt(params.id));
  if (!book) {
    return NextResponse.json({ error: "ไม่พบหนังสือ" }, { status: 404 });
  }

  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;
  book.pages = pages || book.pages;
  book.coverImageUrl = coverImageUrl || book.coverImageUrl;

  return NextResponse.json({ message: "อัปเดตสำเร็จ", book });
}

// ลบหนังสือ
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const index = books.findIndex((b) => b.id === parseInt(params.id));
  if (index === -1) {
    return NextResponse.json({ error: "ไม่พบหนังสือ" }, { status: 404 });
  }

  const deleted = books.splice(index, 1);
  return NextResponse.json({ message: "ลบสำเร็จ", book: deleted[0] });
}
