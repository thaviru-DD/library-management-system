'use client'
import React from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Person, WidthFull } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Login() {
  return (
   <>
   <div className='flex justify-center items-center min-h-screen'>
    <div className='w-[600px]   rounded-xl p-10 shadow-lg bg-bg-light'>

      <form action="" className=''>
        <div className='flex justify-center items-center gap-2 mb-5'>
            <h1 className='text-center text-4xl font-bold text-blue-950'>SingUp</h1>
            <AccountCircleIcon sx={{ color: '#FB6C00',fontSize: '60px' }}/>
        </div>

        <div>
            <div className='flex flex-col gap-4'>

                <div className='flex items-center gap-2'>
                    <PersonIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="username">First Name</label>
                </div>
                <input className='border-b-1' type="text" required/>
                <div className='flex items-center gap-2'>
                    <PersonIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="username">Last Name</label>
                </div>
                <input className='border-b-1' type="text" required/>
                
                <div className='flex items-center gap-2'>
                    <EmailIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="username">Email</label>
                </div>
                <input className='border-b-1' type="text" required/>
                <div className='flex items-center gap-2'>
                    <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="password">Create password</label>
                </div>
                <input className='border-b-1' type="password" required/>
                <div className='flex items-center gap-2'>
                    <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="password">Confirm password</label>
                </div>
                <input className='border-b-1' type="password" required/>
            </div>

            <div className='flex justify-center flex-col gap-1 mt-5'>
                <input type="Submit" value="Sign up" className='bg-blue-950 px-6 py-2 text-white rounded-lg cursor-pointer w-full' />
                <Link className='text-blue underline text-sm text-center' href="/login">Already have an account? Login</Link>
            </div>
        </div>

        

      </form>

    </div>
    </div>
   </>
  );
}