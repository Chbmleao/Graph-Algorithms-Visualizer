import "../styles/SpeedCounterStyles.css";

import React from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

const SpeedCounter = ({ speed, onSpeedIncrement, onSpeedDecrement }) => {
  const formatSpeed = (speed) => {
    return speed < 10 ? `0${speed}` : speed;
  };

  return (
    <div data-testid="speed-counter" className="speed-counter">
      <h2>Speed</h2>
      <div className="quantity">
        <div
          data-testid="increment-count"
          className="increment-count"
          onClick={onSpeedIncrement}
        >
          <FaAngleUp />
        </div>
        <div className="total-count">{formatSpeed(speed)}</div>
        <div
          data-testid="decrement-count"
          className="decrement-count"
          onClick={onSpeedDecrement}
        >
          <FaAngleDown />
        </div>
      </div>
    </div>
  );
};

export default SpeedCounter;
