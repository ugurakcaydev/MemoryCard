import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useGameStatus } from "../../store/gameStatus/hook";
import { setGameWon } from "../../store/gameStatus/actions";

function Cards({ items, setItems, setGameWon }) {
  const gameInfo = useGameStatus();
  const [prev, setPrev] = useState(-1);
  const [isChecking, setIsChecking] = useState(false); // Yeni durum

  function check(current) {
    setIsChecking(true); // Kontrol başladığında tıklamayı devre dışı bırak
    if (items[current].id == items[prev].id) {
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
      setIsChecking(false); // Kontrol bittiğinde tıklamayı tekrar etkinleştir
      // Hepsini Doğru Bilmiş mi
      if (items.every((item) => item.stat === "correct")) {
        setGameWon(true);
      }
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        // Kart durumlarını sıfırla
        const updatedItems = items.map((item, index) => {
          if (index === current || index === prev) {
            return { ...item, stat: "" };
          }
          return item;
        });
        setItems(updatedItems);
        setPrev(-1);
        setIsChecking(false); // Kontrol bittiğinde tıklamayı tekrar etkinleştir
      }, 500); // Süreyi 500ms olarak ayarla
    }
  }

  function handleClick(id) {
    if (isChecking) return; // Eğer kontrol ediliyorsa tıklamayı engelle
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      check(id);
    }
  }

  return (
    <>
      {items.map((item, index) => (
        <Card
          key={index}
          item={item}
          id={index}
          level={gameInfo.level}
          handleClick={handleClick}
          disabled={isChecking} // Tıklama özelliğini devre dışı bırak
        />
      ))}
    </>
  );
}

export default Cards;
