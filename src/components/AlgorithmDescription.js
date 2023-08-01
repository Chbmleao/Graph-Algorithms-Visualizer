import React from "react";
import "../styles/AlgorithmDescriptionStyles.css";
import "../styles/colors.css";

const AlgorithmDescription = ({ algAcronym, isWeighted, hasShortPath }) => {
  const capitalizeStr = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const algName =
    algAcronym.length < 4
      ? algAcronym.toUpperCase()
      : capitalizeStr(algAcronym);
  const isWeightedText = (isWeighted ? "is" : "isn't") + "  weighted";
  const shortPathText =
    (hasShortPath ? "guarantees" : "does not guarantee") + " the shortest path";

  return (
    <div className="alg-description">
      <h3>{algName} algorithm</h3>
      <h3 className={isWeighted ? "green-text" : "red-text"}>
        &nbsp;{isWeightedText}
      </h3>
      <h3>&nbsp;and&nbsp;</h3>
      <h3 className={hasShortPath ? "green-text" : "red-text"}>
        {shortPathText}
      </h3>
      <h3>.</h3>
    </div>
  );
};

export default AlgorithmDescription;
