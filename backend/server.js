const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = []; // จำลองฐานข้อมูลผู้ใช้ (เก็บใน memory)
let books = []; // จำลองฐานข้อมูลหนังสือ (เก็บใน memory)

// ------------------ USERS ------------------
// สมัครสมาชิก
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  // ตรวจว่ามี email นี้อยู่แล้วหรือยัง
  const exist = users.find((u) => u.email === email);
  if (exist) {
    return res.status(400).json({ error: "Email นี้ถูกใช้แล้ว" });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  return res.status(201).json({ user: newUser });
});

// เข้าสู่ระบบ
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
  }

  return res.json({ user });
});

// ------------------ BOOKS ------------------
// เพิ่มหนังสือ
app.post("/api/books", (req, res) => {
  const { title, author, year, pages, coverImageUrl } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year || "",
    pages: pages || "",
    coverImageUrl: coverImageUrl || "",
  };

  books.push(newBook);

  return res.status(201).json({ book: newBook });
});

// อ่านหนังสือทั้งหมด
app.get("/api/books", (req, res) => {
  res.json({ books });
});

// อ่านหนังสือรายเล่ม
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "ไม่พบหนังสือ" });
  }
  res.json({ book });
});

// อัปเดตหนังสือ
app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === parseInt(id));
  if (!book) return res.status(404).json({ error: "ไม่พบหนังสือ" });

  const { title, author, year, pages, coverImageUrl } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;
  book.pages = pages || book.pages;
  book.coverImageUrl = coverImageUrl || book.coverImageUrl;

  res.json({ book });
});

// ลบหนังสือ
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "ไม่พบหนังสือ" });

  const deleted = books.splice(index, 1);
  res.json({ book: deleted[0] });
});

// ------------------ SERVER ------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running at /api");
});
