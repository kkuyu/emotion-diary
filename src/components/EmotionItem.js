import React from "react";

const EmotionItem = ({ id, src, text, isSelected, onClick }) => {
  return (
    <button type="button" onClick={() => onClick(id)} className={["EmotionItem", isSelected ? `EmotionItem_on_${id}` : "EmotionItem_off"].join(" ")}>
      <img src={src} alt="" />
      <span>{text}</span>
    </button>
  );
};

export default React.memo(EmotionItem);
