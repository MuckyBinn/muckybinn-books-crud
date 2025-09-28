"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, CircularProgress, Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [booksData, setBooksData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // โหลด user จาก localStorage
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      router.push("/login");
      return;
    }

    // โหลดหนังสือจาก Next.js API
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/books", { cache: "no-store" });
        if (!response.ok) throw new Error("ไม่สามารถโหลดหนังสือได้");
        const data = await response.json();
        setBooksData(data.books || []);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [router]);

  // ฟังก์ชัน logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff9e5ff",
        py: 6,
        fontFamily: "'Noto Sans JP', sans-serif",
      }}
    >
      <Container maxWidth="sm">
        {/* Header */}
        <Box
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 700, color: "#333" }}
          >
            Book Next App
          </Typography>

          {/* ปุ่ม Logout */}
          {user && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleLogout}
            >
              ออกจากระบบ
            </Button>
          )}
        </Box>

        {/* ✅ แสดงชื่อกับอีเมลผู้ใช้ */}
        {user && (
          <Typography sx={{ textAlign: "center", mb: 2 }}>
            👋 สวัสดี {user.name} ({user.email})
          </Typography>
        )}

        {/* ✅ ปุ่มเพิ่มหนังสือใหม่ */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/book/create")}
          >
            ➕ เพิ่มหนังสือใหม่
          </Button>
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress size={24} />
            <Typography sx={{ ml: 1, color: "#666" }}>กำลังโหลด...</Typography>
          </Box>
        )}

        {/* Error */}
        {error && (
          <Typography sx={{ color: "salmon", textAlign: "center", mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* กล่องลิสต์หนังสือ */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {booksData.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #e6a800",
                    borderRadius: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    backgroundColor: "#ffbb00ff",
                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {/* รูปหนังสือ */}
                  <Box sx={{ flexShrink: 0 }}>
                    {book.coverImageUrl ? (
                      <Image
                        src={book.coverImageUrl}
                        alt={book.title}
                        width={80}
                        height={120}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 80,
                          height: 120,
                          borderRadius: 8,
                          backgroundColor: "#ccc",
                        }}
                      />
                    )}
                  </Box>

                  {/* ข้อมูลหนังสือ */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{ fontWeight: 600, fontSize: 18, color: "#222" }}
                    >
                      {book.title}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: "#444" }}>
                      ผู้แต่ง: {book.author}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#222" }}>
                      ปี: {book.year} | หน้า: {book.pages}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}

            {/* ถ้าไม่มีหนังสือ */}
            {booksData.length === 0 && !isLoading && (
              <Typography sx={{ textAlign: "center", color: "#999", mt: 2 }}>
                ยังไม่มีหนังสือในระบบ
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
