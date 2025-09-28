"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, TextField, Typography, Snackbar, Alert } from "@mui/material";

export default function CreateBook() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    pages: "",
    coverImageUrl: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.author) {
      setAlert({ open: true, type: "error", message: "กรุณากรอกข้อมูลให้ครบ" });
      return;
    }

    if (isNaN(Number(form.year)) || isNaN(Number(form.pages))) {
      setAlert({ open: true, type: "error", message: "ปีและจำนวนหน้าต้องเป็นตัวเลข" });
      return;
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          pages: Number(form.pages),
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "ไม่สามารถเพิ่มหนังสือได้");
      }

      setAlert({ open: true, type: "success", message: "เพิ่มหนังสือสำเร็จ!" });
      setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setAlert({
        open: true,
        type: "error",
        message: err.message || "เกิดข้อผิดพลาด",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        ➕ เพิ่มหนังสือใหม่
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="ชื่อหนังสือ"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="เช่น แฮร์รี่ พอตเตอร์"
        />
        <TextField
          label="ผู้แต่ง"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
          placeholder="เช่น J.K. Rowling"
        />
        <TextField
          label="ปี"
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          required
          placeholder="เช่น 2001"
        />
        <TextField
          label="จำนวนหน้า"
          name="pages"
          type="number"
          value={form.pages}
          onChange={handleChange}
          required
          placeholder="เช่น 350"
        />
        <TextField
          label="URL ปกหนังสือ"
          name="coverImageUrl"
          value={form.coverImageUrl}
          onChange={handleChange}
          placeholder="https://example.com/cover.jpg"
        />
        <Button type="submit" variant="contained" color="primary">
          บันทึก
        </Button>
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.type as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
