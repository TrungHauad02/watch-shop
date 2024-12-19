import { FormControlLabel, Checkbox } from "@mui/material";

const CheckboxWithLabel = ({ checked, onChange, label, name }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
          name={name}
        />
      }
      label={label}
    />
  );
};

export default CheckboxWithLabel;
