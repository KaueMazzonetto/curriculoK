import React from "react";

function applyMask(raw, mask) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  let output = "";
  let cursor = 0;
  for (const char of mask) {
    if (char === "9") {
      if (cursor >= digits.length) break;
      output += digits[cursor++];
    } else if (cursor < digits.length) {
      output += char;
    }
  }
  return output;
}

const InputMask = React.forwardRef(function InputMask({ mask, onChange, ...props }, ref) {
  return React.createElement("input", {
    ...props,
    ref,
    onChange: (event) => {
      if (mask) event.target.value = applyMask(event.target.value, mask);
      onChange?.(event);
    },
  });
});

export default InputMask;
