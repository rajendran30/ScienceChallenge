import './globals.css';

export const metadata = {
  title: 'Biology Quiz',
  description: 'A 10-question biology quiz built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
