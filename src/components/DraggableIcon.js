import React from "react";
import { useDrag } from "react-dnd";
import "../styles/DraggableIconStyles.css";

import { FaAngleRight } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa6";

const DraggableIcon = ({ isStart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "icon",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (isStart) {
    return (
      <div className="icon-container" ref={drag}>
        <FaAngleRight
          className="start-icon"
          style={{ border: isDragging ? "1px solid pink" : "0px" }}
        />
      </div>
    );
  } else {
    return (
      <div className="icon-container" ref={drag}>
        <FaFlagCheckered
          className="end-icon"
          style={{ border: isDragging ? "1px solid pink" : "0px" }}
        />
      </div>
    );
  }
};

export default DraggableIcon;
