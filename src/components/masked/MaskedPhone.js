import React from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedPhone = ({ value, onChange }) => {
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
      mask="(99) 99999-9999"
      placeholder="(99) 99999-9999"
      value={value}
      onChange={handleChange}
    />
  );
};
export default MaskedPhone;
