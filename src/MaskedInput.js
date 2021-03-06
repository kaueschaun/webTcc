import React from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedInput = ({ value, onChange }) => {
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
      class="field-input"
      mask="999.999.999-99"
      placeholder="CPF"
      value={value}
      onChange={handleChange}
    />
  );
};
export default MaskedInput;
