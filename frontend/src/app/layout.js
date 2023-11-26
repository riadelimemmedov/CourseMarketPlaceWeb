//!Css classes
import "@styles/globals.css"

//!Fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

//!Web3Provider
import { Web3Provider } from "@components/providers"


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//*RootLayout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Web3Provider>
        <ToastContainer/>
        {children}
      </Web3Provider>
      </body>
    </html>
  )
}
