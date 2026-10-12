"use client"; // Говорим Next.js, что это клиентский компонент с интерактивностью

import { useState } from "react";

export default function Home() {
  // Создаем переменную состояния для счетчика
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
      {/* Название сайта */}
      <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-wider uppercase">
        bilety
      </h1>

      {/* Интерактивный блок счетчика */}
      <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200">
        <button
          onClick={() => setCount(count - 1)}
          className="text-2xl font-bold text-slate-500 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
        >
          -
        </button>

        <span className="text-2xl font-mono font-bold text-slate-800 min-w-[3ch] text-center">
          {count}
        </span>

        <button
          onClick={() => setCount(count + 1)}
          className="text-2xl font-bold text-slate-500 hover:text-green-500 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
