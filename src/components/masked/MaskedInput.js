import React from "react";
import { Placeholder } from "react-bootstrap";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedCpfInput = ({isLogin, value, onChange }) => {
  let placeHolderValue = ""
  if(isLogin) {
    placeHolderValue = "CPF"
    
  }else {
    placeHolderValue = "000.000.000-00"
  }
  function handleChange(event) {
    onChange({
      ...event,
      target: {
        ...event.target,
        value: onlyNumbers(event.target.value),
      },
    });
  }

  return (
    <InputMask
      className="field-input"
      mask="999.999.999-99"
      placeholder={placeHolderValue}
      value={value}
      onChange={handleChange}
    />
  );
};
export default MaskedCpfInput;
