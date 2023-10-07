//!Css classes
import "@styles/globals.css"


//!Fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


//!RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
