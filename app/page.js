"use client";
import { useState } from "react";
import ticketsData from "./data.json";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchId, setSearchId] = useState(
    (ticketsData[0]?.id || "").toString(),
  );
  // Новое состояние для проверки валидности поиска
  const [isValidSearch, setIsValidSearch] = useState(true);

  const topNumbers = Array.from({ length: 35 }, (_, i) => i + 1);
  const bottomNumbers = Array.from({ length: 54 }, (_, i) => i + 1);

  const currentTicket = ticketsData[currentIndex] || {};

  // Если билет не найден, массивы подсветки будут пустыми
  const highlightedTop = isValidSearch
    ? [
        Number(currentTicket["top 1"]),
        Number(currentTicket["top 2"]),
        Number(currentTicket["top 3"]),
        Number(currentTicket["top 4"]),
        Number(currentTicket["top 5"]),
        Number(currentTicket["top 6"]),
        Number(currentTicket["top 7"]),
      ].filter(Boolean)
    : [];

  const highlightedBottom =
    isValidSearch && currentTicket["bottom 1"]
      ? [Number(currentTicket["bottom 1"])]
      : [];

  // Функция для листания НАЗАД
  const handlePrev = () => {
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : ticketsData.length - 1;
    setCurrentIndex(prevIndex);
    setSearchId((ticketsData[prevIndex]?.id || "").toString());
    setIsValidSearch(true); // Сбрасываем ошибку при перелистывании
  };

  // Функция для листания ВПЕРЕД
  const handleNext = () => {
    const nextIndex =
      currentIndex < ticketsData.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setSearchId((ticketsData[nextIndex]?.id || "").toString());
    setIsValidSearch(true); // Сбрасываем ошибку при перелистывании
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchId(value);

    const foundIndex = ticketsData.findIndex(
      (ticket) => ticket.id.toString() === value.trim(),
    );

    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      setIsValidSearch(true);
    } else {
      setIsValidSearch(false); // Выключаем подсветку ячеек
    }
  };

  return (
    <div
      style={{ backgroundColor: "#0F005D" }}
      className="min-h-screen m-0 p-0 flex flex-col font-sans max-w-full overflow-x-hidden"
    >
      {/* БЛОК 1 */}
      <div className="grid grid-cols-9 gap-0 w-full justify-items-stretch mb-2">
        {topNumbers.map((num) => {
          const isHighlighted = highlightedTop.includes(num);
          return (
            <div
              key={num}
              style={{
                backgroundColor: isHighlighted ? "#FFC525" : "#201269",
                color: isHighlighted ? "#0F005D" : "#EAE8F6",
              }}
              className="aspect-square rounded-full font-bold text-base sm:text-lg flex items-center justify-center select-none transition-colors"
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* БЛОК 2: Отображение только одной строки из 9 чисел */}
      {(() => {
        const selectedNum = highlightedBottom[0];
        const rowIndex = selectedNum ? Math.floor((selectedNum - 1) / 9) : 0;
        const startSlice = rowIndex * 9;
        const currentLineNumbers = bottomNumbers.slice(
          startSlice,
          startSlice + 9,
        );

        return (
          <div className="grid grid-cols-9 gap-0 w-full justify-items-stretch mb-2">
            {currentLineNumbers.map((num) => {
              const isHighlighted = highlightedBottom.includes(num);
              return (
                <div
                  key={num}
                  style={{
                    backgroundColor: isHighlighted ? "#FE93D9" : "#201269",
                    color: isHighlighted ? "#0F005D" : "#EAE8F6",
                  }}
                  className="aspect-square rounded-full font-bold text-base sm:text-lg flex items-center justify-center select-none transition-colors"
                >
                  {num}
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* БЛОК 3 */}
      <div className="flex items-center gap-2 w-full text-base font-black">
        {/* Контейнер для текста и инпута, чтобы они смотрелись единым целым */}
        <div className="flex items-center gap-1 text-[#FFF7C6] select-none pl-3">
          <span>ЭТО БИЛЕТ</span>
          <input
            type="text"
            value={searchId}
            onChange={handleSearch}
            placeholder="№"
            style={{ color: "#FFF7C6" }}
            className="w-12 bg-transparent border-none outline-none p-0 focus:outline-none text-left font-black transition-colors focus:text-[#FFC525]"
          />
        </div>

        {/* Кнопка НАЗАД */}
        <button
          onClick={handlePrev}
          style={{ backgroundColor: "#FFC525", color: "#8E1C01" }}
          className="w-12 p-2 rounded-xl transition-all cursor-pointer active:bg-[#FFC525] active:text-[#0F005D] hover:opacity-90 text-center ml-auto"
        >
          &lt;
        </button>

        {/* Кнопка ВПЕРЕД */}
        <button
          onClick={handleNext}
          style={{ backgroundColor: "#FFC525", color: "#8E1C01" }}
          className="flex-1 p-2 rounded-xl transition-all cursor-pointer active:bg-[#FFC525] active:text-[#0F005D] hover:opacity-90 text-center whitespace-nowrap overflow-hidden text-ellipsis"
        >
          СЛЕДУЮЩИЙ
        </button>
      </div>
    </div>
  );
}
