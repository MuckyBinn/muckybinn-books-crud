"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Container, Typography } from "@mui/material";

export default function BookDetail() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then((d) => setBook(d.book || d))
      .catch(() => alert("ไม่สามารถโหลดหนังสือได้"));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("ต้องการลบหนังสือใช่ไหม?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    router.push("/");
  };

  if (!book) return <Container><Typography>กำลังโหลด...</Typography></Container>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">{book.title}</Typography>
      <Typography>ผู้แต่ง: {book.author}</Typography>
      <Typography>ปี: {book.year} | หน้า: {book.pages}</Typography>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={() => router.push(`/book/${id}/edit`)}>✏️ แก้ไข</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>🗑️ ลบ</Button>
      </Box>
    </Container>
  );
}
