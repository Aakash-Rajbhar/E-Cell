import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'], // Ensure required weights are included
  display: 'swap',
});

export const metadata = {
  title: 'E-Cell | ADGIPS',
  description:
    'Enterpreneurship Cell of ADGITM, Delhi. Innovation, Creativity, and Entrepreneurship.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>{children}</body>
    </html>
  );
}
