import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  InputLabel,
  IconButton,
} from "@mui/material";
import { FC, useState } from "react";

type passwordProps = {
  register: any,
  label: string
}

const PasswordInput: FC<passwordProps> = ({register, label}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl margin="normal" fullWidth variant="outlined">
      
        <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          {...register}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </div>
  );
};

export default PasswordInput;
