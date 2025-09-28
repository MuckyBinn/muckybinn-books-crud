import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Book Next App',
  description: 'รายการหนังสือ'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body style={{ backgroundColor: "#fdeaacff", margin: 0, minHeight: "100vh" }}>
        <header className='site-header' style={{ backgroundColor: "#ffd448ff", boxShadow: "none" }}>
          <div className='header-brand'>
            <div className='logo' style={{ backgroundColor: "#333", color: "#ffbb00ff" }}>BK</div>
            <div>
              <div style={{ fontWeight: 700, color: "#333" }}>Book Next App</div>
              <div className='small-muted' style={{ color: "#555" }}>นายธนบดี ภาคภูมิ 663450175-9</div>
            </div>
          </div>
          <nav>
            <a href="/" style={{ color: "#333", textDecoration: "none" }}>หน้าแรก</a>
          </nav>
        </header>
        <main className='container'>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '20px 0', color: '#555' }}>
          สร้างโดย: นายธนบดี ภาคภูมิ 663450175-9
        </footer>
      </body>
    </html>
  )
}
