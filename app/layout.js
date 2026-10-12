import "./globals.css";

export const metadata = {
  title: "bilety",
  description: "bilety",
};

export default function RootLayout({ children }) {
  return (
    // Добавляем suppressHydrationWarning, чтобы расширения не ломали сайт
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
