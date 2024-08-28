import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LoginNavbar from "@/components/LoginNavbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Happy pets",
  description: "A happy place for your four-legged babies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        
        
      <body className="base-bg">
      <Navbar />
      
      
       <div className="flex flex-col items-center">
       {children}
       </div>
   
       <LoginNavbar />
      </body>
      
    </html>
  );
}
