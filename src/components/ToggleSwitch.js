import "../styles/ToggleSwitchStyles.css";

import React, { useState } from "react";

import { TbWall, TbWeight } from "react-icons/tb";

const ToggleSwitch = () => {
  const [weightSelected, setWeightSelected] = useState(false);

  const handleToggleSwitchClick = () => {
    setWeightSelected(!weightSelected);
  };

  return (
    <div
      className={"toggle-switch" + (weightSelected ? " weight" : " wall")}
      onClick={handleToggleSwitchClick}
    >
      <div className={"icon wall" + (weightSelected ? " unselected" : "")}>
        <TbWall />
      </div>
      <div className={"icon weight" + (!weightSelected ? " unselected" : "")}>
        <TbWeight />
      </div>
    </div>
  );
};

export default ToggleSwitch;
