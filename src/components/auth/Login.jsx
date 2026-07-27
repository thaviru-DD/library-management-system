'use client'
import React from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Person, WidthFull } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';

export default function Login() {
  return (
   <>
   <div className='flex justify-center items-center min-h-screen'>
    <div className='w-[600px]   rounded-xl p-10 shadow-lg bg-bg-light'>

      <form action="" className='flex gap-10'>

        <div className='w-[40%] text-center flex flex-col gap-15 items-center'>
          <h1 className='text-2xl font-bold text-blue-950'>LIBRARY SYSTEM</h1>
          <Avatar sx={{ width: 100, height: 100, background: '#FB6C00' }}>
            <LibraryBooksIcon fontSize='large'/>
          </Avatar>
        </div>

        <div className='w-[55%] flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-center font-bold text-3xl text-blue-950'>Login</h1>
              <div className='flex items-center gap-2'>
                <PersonIcon sx={{ color: 'gray',fontSize: '20px' }} />
                <label className='text-text-primary' htmlFor="username">Username</label>
              </div>
              <input type="text" className='border-b' required/>
            </div>

          <div className='flex flex-col gap-2'>
           <div className='flex items-center gap-2'>
              <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
              <label className='text-text-primary' htmlFor="password">Password</label>
            </div>
            <input type="text" className='border-b' required/>
          </div>

          <div className='flex justify-center flex-col gap-1'>
            <input type="Submit" value="Login" className='bg-blue-950 px-6 py-2 text-white rounded-lg cursor-pointer w-full' />
            <Link className='text-blue underline text-sm' href="/signup">Create an account</Link>
          </div>
        </div>

      </form>

    </div>
    </div>
   </>
  );
}