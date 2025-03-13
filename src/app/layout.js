import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <NextTopLoader showSpinner={false} />
        <AuthProvider />
        {children}
        {/* <ProgressBarProviders></ProgressBarProviders> */}
      </body>
    </html>
  );
}
