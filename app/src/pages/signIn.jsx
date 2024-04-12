import * as React from 'react';
import LoginCard from '../cards/loginCard';
import Book3dCard from '../cards/book3dCard';

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
    <div className='flex flex-wrap justify-center items-center min-h-screen bg-zinc-800'>
      <div className="bg-slate-700 text-white px-12 flex flex-wrap justify-center items-center rounded-3xl">
        <div>
          <Book3dCard />
        </div>
        <div>
          <LoginCard />
        </div>
      </div>
    </div>
  );
}