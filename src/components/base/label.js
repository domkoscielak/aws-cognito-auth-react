import React from "react";

const LabelComponent = (props) => {
  return (
    <>
      <label
        className={props.className}
        htmlFor={props.for}
      >
        {props.label}
      </label>
    </>
  );
};

export default LabelComponent;
