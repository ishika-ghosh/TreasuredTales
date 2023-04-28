import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function Search({
  options,
  values,
  inputValue,
  handleChange,
  handleInputChange,
  optionKey,
}) {
  return (
    <Autocomplete
      multiple
      fullWidth
      id="tags-filled"
      options={options}
      getOptionLabel={(option) => option[optionKey]}
      defaultValue={options}
      value={values}
      filterSelectedOptions
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" placeholder="Members" />
      )}
    />
  );
}
