import "../styles/ToggleSwitchStyles.css";

import React, { useState, useEffect } from "react";

import { TbWall, TbWeight } from "react-icons/tb";

const ToggleSwitch = ({ onToggleSwitchClick, isAlgWeighted }) => {
  const [isWeightSelected, setIsWeightSelected] = useState(false);

  const handleToggleSwitchClick = () => {
    if (isAlgWeighted) {
      setIsWeightSelected(!isWeightSelected);
      onToggleSwitchClick();
    }
  };

  useEffect(() => {
    if (!isAlgWeighted) {
      if (isWeightSelected) setIsWeightSelected(false);
      onToggleSwitchClick();
    }
  }, [isAlgWeighted]);

  return (
    <div
      className={
        "toggle-switch" +
        (isWeightSelected ? " weight" : " wall") +
        (isAlgWeighted ? "" : " disabled")
      }
      onClick={handleToggleSwitchClick}
    >
      <div className={"icon wall" + (isWeightSelected ? " unselected" : "")}>
        <TbWall />
      </div>
      <div className={"icon weight" + (!isWeightSelected ? " unselected" : "")}>
        <TbWeight />
      </div>
    </div>
  );
};

export default ToggleSwitch;
