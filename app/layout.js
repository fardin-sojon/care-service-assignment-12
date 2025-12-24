
import { Lato, Poppins } from 'next/font/google'
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from "../providers/AuthProvider";

const lato = Lato({ subsets: ['latin'], weight: ['100', '300', '400', '700', '900'], variable: '--font-lato' })

export const metadata = {
  title: "Care Service - Trusted Care Services",
  description: "Find reliable baby sitting, elderly care, and more.",
  icons: {
    icon: '/assets/logo/care-service-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={lato.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
