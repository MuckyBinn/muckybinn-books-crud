"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/AuthService";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      await AuthService.register(form.name, form.email, form.password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="auth-container">
      <h1>สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="name" placeholder="ชื่อ" onChange={handleChange} required />
        <input type="email" name="email" placeholder="อีเมล" onChange={handleChange} required />
        <input type="password" name="password" placeholder="รหัสผ่าน" onChange={handleChange} required />
        <input type="password" name="confirm" placeholder="ยืนยันรหัสผ่าน" onChange={handleChange} required />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn-primary">สมัคร</button>
      </form>
    </div>
  );
}
