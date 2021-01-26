import React from "react";
import Label from "./label";

const InputComponent = (props) => {
  return (
    <div>
      <Label label={props.label} for={props.name} />
      <input
        className={props.className}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
};

export default InputComponent;
