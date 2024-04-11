import React from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function loginCard(){
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return(
    <div className="bg-slate-600 w-96 text-white p-12">
        <form action="">
          <h1 className="text-5xl text-center">Login</h1>
          <div className="w-full my-10 flex items-center">

            <TextField id="outlined-basic" label="Username" variant="outlined" className="w-full" sx={{ input: {color: 'white'}}}/>
          </div>
          
          <div className="w-full my-10 flex items-center">

            <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
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
                    label="Password"
                />
            </FormControl>
          </div>

          <div className="flex justify-around my-6 items-center">
          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" className="select-none"/>
            <a href="#" className="underline select-none">Forgot password?</a>
          </div>

          <Button variant="contained" sx={{borderRadius: 20}} className="w-full">Submit</Button>
        </form>
      </div>
    );
}