import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  name?: string;
}

const InputField = ({
  label,
  type,
  value,
  onChange,
  showPassword,
  setShowPassword,
  name,
}: InputFieldProps) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {setShowPassword && (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;
