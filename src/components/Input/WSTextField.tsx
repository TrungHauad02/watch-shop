import {
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface WSTextFieldProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  name?: string;
  sx?: any;
}

const WSTextField = ({
  label,
  type,
  value,
  onChange,
  showPassword,
  setShowPassword,
  name,
  sx,
}: WSTextFieldProps) => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const complexSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: { xs: "0.5rem", sm: "0.75rem" },
      paddingLeft: { xs: "0.25rem", sm: "0.5rem" },
      "& .MuiOutlinedInput-notchedOutline": {
        border: `1px solid ${color.gray300}`,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: `2px solid ${isDarkMode ? color.amber400 : color.amber500}`,
      },
    },
    m: 0,
    ...sx,
  };
  return (
    <Stack direction={"column"} spacing={1}>
      <Typography
        sx={{
          color: isDarkMode ? color.gray100 : color.gray900,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {label}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        sx={complexSx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {setShowPassword && (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{
                    marginRight: "0.1rem",
                    padding: { xs: "4px", sm: "8px" },
                  }}
                >
                  {showPassword ? (
                    isDarkMode ? (
                      // Show pass + dark mode
                      <img
                        src="/show_password_white.png"
                        alt="Show pass"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      // Show pass + light mode
                      <img
                        src="/show_password.png"
                        alt="Show pass"
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                        }}
                      />
                    )
                  ) : (
                    // Hide pass
                    <img
                      src="/hide_password.png"
                      alt="Show pass"
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default WSTextField;
