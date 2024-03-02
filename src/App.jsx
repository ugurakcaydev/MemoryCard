import "./App.css";
import classNames from "classnames";
import Cards from "./components/Cards";
import { useGameStatus } from "./store/gameStatus/hook";
import { setGameWon, setLevel } from "./store/gameStatus/actions";
import { useEffect, useState } from "react";
import calculateAnimationDuration from "./calculateAnimation";
function App() {
  const [items, setItems] = useState([]);
  const gameInfo = useGameStatus();
  const level = gameInfo.level;
  const gridSize = level * 2;

  // Her seviye için kart listesini oluşturan bir fonksiyon
  const generateItems = (level) => {
    return new Promise((resolve) => {
      const cardList = [];
      const totalCards = Math.pow(level, 2) * 4;

      // Resimlerin dizisi, her resmin yalnızca iki kez olması için
      const imagesArray = [];
      for (let i = 1; i <= 18; i++) {
        imagesArray.push(i);
      }

      // Resimlerin dizi içinde karıştırılması
      for (let i = imagesArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]];
      }

      // Kart çiftlerini oluştur
      for (let i = 0; i < totalCards / 2; i++) {
        const imgIndex = imagesArray[i % 18];
        const imgSrc = `/images/img-${imgIndex}.jpg`;

        cardList.push({
          id: i,
          img: imgSrc,
          stat: "",
        });
        cardList.push({
          id: i,
          img: imgSrc,
          stat: "",
        });
      }

      // Kartları karıştır
      const shuffledCards = cardList.sort(() => Math.random() - 0.5);
      resolve(shuffledCards);
    });
  };

  useEffect(() => {
    generateItems(level).then((shuffledCards) => {
      setItems(shuffledCards);
    });
    const hideCardDuration = calculateAnimationDuration(level);
    const hideImgDuration = calculateAnimationDuration(level);

    // CSS değişkenlerini güncelle
    document.documentElement.style.setProperty(
      "--hide-card-duration",
      `${hideCardDuration}s`
    );
    document.documentElement.style.setProperty(
      "--hide-img-duration",
      `${hideImgDuration}s`
    );
  }, [level]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-zinc-500 ">
      <div className="w-auto h-auto flex flex-col gap-y-4 ">
        <h1 className="font-semibold text-green-500">- Level {level} -</h1>
        <div
          className={`board-container w-auto h-auto p-2 rounded-lg bg-zinc-200`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
            className={classNames(
              `cards w-auto h-auto place-items-start justify-items-center bg-zinc-500 rounded-lg gap-3 border border-white p-2`
            )}
          >
            <Cards items={items} setItems={setItems} setGameWon={setGameWon} />
          </div>
        </div>

        <div
          className={classNames(
            "flex flex-col items-center invisible justify-center gap-y-3",
            {
              "!visible": gameInfo.gameWon,
            }
          )}
        >
          <div className="text-white">
            {level == 1 && "Zor olmalıydı :)"}
            {level == 2 && "İyi Gidiyorsun"}
            {level == 3 && "Başardın :)"}
          </div>
          {level === 3 ? (
            <button
              onClick={() => {
                setLevel(1);
                setGameWon(false);
                setItems([]);
                generateItems(level + 1).then((shuffledCards) => {
                  setItems(shuffledCards);
                });
              }}
              className="px-2 py-1 border border-green-500 rounded-md text-sm text-green-500"
            >
              Restart
            </button>
          ) : (
            <button
              onClick={() => {
                // Seviyeyi artır
                setLevel(level + 1);
                // Oyun kazanıldı durumunu sıfırla
                setGameWon(false);
                // Kartların içeriğini sıfırla
                setItems([]);
                // Yeni seviye için kartları oluştur
                generateItems(level + 1).then((shuffledCards) => {
                  setItems(shuffledCards);
                });
              }}
              className="px-2 py-1 border border-green-500 rounded-md text-sm text-green-500"
            >
              Next Level
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
