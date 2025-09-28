"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function EditBook() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/books/${id}`)
      .then((r) => r.json())
      .then((d) => setForm(d.book || d))
      .catch(() => alert("ไม่สามารถโหลดข้อมูลหนังสือได้"));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(`/book/${id}`);
  };

  if (!form) return <Container><Typography>กำลังโหลด...</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>✏️ แก้ไขหนังสือ</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="ชื่อหนังสือ" name="title" value={form.title} onChange={handleChange} required />
        <TextField label="ผู้แต่ง" name="author" value={form.author} onChange={handleChange} required />
        <TextField label="ปี" name="year" value={form.year} onChange={handleChange} required />
        <TextField label="จำนวนหน้า" name="pages" value={form.pages} onChange={handleChange} required />
        <TextField label="URL ปกหนังสือ" name="coverImageUrl" value={form.coverImageUrl} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">บันทึกการแก้ไข</Button>
      </Box>
    </Container>
  );
}
