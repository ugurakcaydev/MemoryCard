import classNames from "classnames";
import "./card.css";

function Card({ item, id, handleClick, level, disabled }) {
  const itemClass = item.stat ? "active " + item.stat : "";

  return (
    <div
      className={classNames(
        `card ${itemClass} w-20 h-20 bg-white flex items-center justify-center `,
        {
          "!pointer-events-none": disabled,
          "!w-14 !h-14": level == 2,
          "!w-11 !h-11": level == 3,
        }
      )}
      onClick={() => {
        handleClick(id);
      }}
    >
      <img className="w-[80%] h-[80%] object-cover" src={item.img} alt="" />
    </div>
  );
}

export default Card;
