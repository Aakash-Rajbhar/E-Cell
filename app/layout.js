import { Geist, Geist_Mono, Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata = {
  title: 'E-Cell | ADGIPS',
  description:
    'Enterpreneurship Cell of ADGITM, Delhi. Innovation, Creativity, and Entrepreneurship.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.variable}  antialiased`}>{children}</body>
    </html>
  );
}
