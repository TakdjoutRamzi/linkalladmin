import React from "react";
import { FaChevronRight } from "react-icons/fa";

const ChoiseButton = (props) => {

  return (
    <p className="answerOptions" onClick={props.validate}>
      <FaChevronRight /> {props.text}
    </p>
  );
};

export default ChoiseButton;
