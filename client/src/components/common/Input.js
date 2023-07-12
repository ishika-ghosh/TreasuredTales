import React from "react";
import { TextField } from "@mui/material";

function Input({ name, label, value, handleChange, required, type }) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      required={required}
      type={type}
    />
  );
}

export default Input;
