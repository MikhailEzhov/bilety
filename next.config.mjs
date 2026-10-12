/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Говорим Next.js собирать сайт в статические файлы
  images: {
    unoptimized: true, // Отключаем серверную оптимизацию картинок (для GitHub Pages)
  },
  // На GitHub Pages сайт будет по адресу имя_пользователя.github.io/bilety
  basePath: process.env.NODE_ENV === "production" ? "/bilety" : "",
};

export default nextConfig;
