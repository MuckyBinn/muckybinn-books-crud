"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await AuthService.login(form.email, form.password);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/");
    } catch (err: any) {
      setError("เข้าสู่ระบบล้มเหลว");
    }
  };

  return (
    <div className="auth-container">
      <h1>เข้าสู่ระบบ</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="อีเมล"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          onChange={handleChange}
          required
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary">เข้าสู่ระบบ</button>
      </form>

      {/* เพิ่มลิงก์ไปสมัครสมาชิก */}
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        ยังไม่มีบัญชี?{" "}
        <a href="/register" style={{ color: "#0070f3", fontWeight: 500 }}>
          สมัครสมาชิก
        </a>
      </p>
    </div>
  );
}
