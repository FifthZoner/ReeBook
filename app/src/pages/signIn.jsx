import * as React from 'react';
import LoginCard from '../cards/loginCard';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const getData = () => {
  fetch('http://localhost:5000/api')
    .then(res => res.json())
    .then(data => console.log(data))
}

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-zinc-800'>
      <LoginCard />
    </div>
  );
}