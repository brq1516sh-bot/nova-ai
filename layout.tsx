import './globals.css';

export const metadata = {
  title: 'NOVA AI',
  description: 'AI Video Enhancer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
