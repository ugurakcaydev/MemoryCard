// import React, { useState, useEffect } from "react";
// import { useGameStatus } from "../../store/gameStatus/hook";
// import classNames from "classnames";
// import { setGameWon } from "../../store/gameStatus/actions";

// const Countdown = ({ level, isTimerStarted, setTimeEnd }) => {
//   const gameInfo = useGameStatus();

//   // Başlangıç süresini levele göre hesapla
//   const calculateTimeLeft = () => {
//     let startingMinutes;
//     if (level === 1) {
//       startingMinutes = 0.1;
//     } else if (level === 2) {
//       startingMinutes = 1.5;
//     } else if (level === 3) {
//       startingMinutes = 1;
//     } else {
//       startingMinutes = 0; // Diğer seviyeler için süre sıfır olsun
//     }
//     return startingMinutes * 60; // Dakikaları saniyeye çevir
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   // Süre ve oyun kazanma durumunu kontrol et
//   useEffect(() => {
//     let timer;
//     if (timeLeft > 0 && isTimerStarted) {
//       // Süre başladı mı kontrolü eklendi
//       timer = setInterval(
//         () => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1),
//         1000
//       );
//     } else if (timeLeft === 0) {
//       setGameWon(false);
//       setTimeEnd(true);
//     }

//     return () => {
//       clearInterval(timer);
//     };
//   }, [timeLeft, isTimerStarted, setTimeEnd]);

//   // Süreyi dakika ve saniye olarak formatla
//   const formatTime = () => {
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <div>
//       <p
//         className={classNames("text-base", {
//           "text-red-500": timeLeft < 20, // Yazı rengini kırmızı yap
//         })}
//       >
//         {timeLeft > 0 ? formatTime() : "Süre doldu!"}
//       </p>
//     </div>
//   );
// };

// export default Countdown;
