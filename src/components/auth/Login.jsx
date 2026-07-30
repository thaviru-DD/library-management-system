'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Person, WidthFull } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

import Image from 'next/image';
import img1 from '../../../public/images/signup_img1.jpg';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import googleIcon from '../../../public/icons/icons8-google-48.png';
import appleIcon from '../../../public/icons/icons8-apple-logo-30.png';

export default function Login() {


  const admin = {
    email: "admin@123",
    password: "admin123"
  }

  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  function handleSubmit(e) {

    // admin login validation
    if (email === admin.email && password === admin.password) {
      alert('Login successful');
    } else {
      setError('Invalid email or password');
    }
    
    //user login validation
    if (email.includes('@') && password.length >= 6) {
      // Handle successful login
      alert('Login successful');
    }else {
      alert('Please enter a valid email and password (at least 6 characters).');
    }
  }


  return (
   <>
   {/* <div className='flex justify-center items-center min-h-screen'>
    <div className='w-[400px]  rounded-xl p-10 shadow-lg bg-bg-light/45'>

      <form onSubmit={handleSubmit} className=''>

        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col justify-center items-center gap-2'>
              <AccountCircleIcon sx={{ color: '#FB6C00',fontSize: '60px' }}/>
               <h1 className='text center font-bold text-4xl text-blue-950'>Login</h1>
               
              </div>
              <div className='flex items-center gap-2 mt-6'>
                <PersonIcon sx={{ color: 'gray',fontSize: '20px' }} />
                <label className='text-text-primary' htmlFor="username">Email</label>
              </div>
              <input type="text" className='border-b' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>

          <div className='flex flex-col gap-2'>
           <div className='flex items-center gap-2'>
              <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
              <label className='text-text-primary' htmlFor="password">Password</label>
            </div>
            <input type="password" className='border-b' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          <div className='flex justify-center flex-col gap-1'>
            <input type="Submit" value="Login" className='bg-blue-950 px-6 py-2 text-white rounded-lg cursor-pointer w-full hover:bg-blue-700 transition-colors duration-400 ease-in-out' />
            <Link className='text-blue underline text-sm' href="/signup">Create an account</Link>
          </div>
        </div>

      </form>

    </div>
    </div> */}

<div>
        <div className='flex justify-center h-screen'>
            
            <div  className='w-[50%] px-30 py-20'>
                <form>
                    <div>
                        <h1 className='text-center text-4xl text-ink font-bold'>Login to your account</h1>
                        <h5 className='text-center mt-4 text-ink'>Welcome back to library. Please enter your details</h5>
                    </div>

                    <div className='mt-10'>

                        <div className='flex flex-col gap-3 mb-5'>
                            <label htmlFor="name" className='px-3 text-ink font-bold'>Email</label>
                            <input type="text" className='bg-white h-12 rounded-4xl shadow-lg placeholder:p-3 border border-gray-200' placeholder='yourname@gmail.com' />
                        </div>

                        <div className='flex flex-col gap-3 mb-5 relative'>
                            <label htmlFor="name" className='px-3 text-ink font-bold'>Password</label>
                            <VisibilityOffIcon className='absolute right-6 top-12' sx={{color: 'gray', fontSize:'20px'}}/>
                            <input type="text" className='bg-white h-12 rounded-4xl shadow-lg placeholder:p-3 border border-gray-200' placeholder='*******************' />
                        </div>

                        <h4 className='underline text-end text-gray-700 text-sm'>Forgot password?</h4>
                    </div>

                    <div className='mt-10'>
                        <input type="submit" className='bg-ink w-full h-12 rounded-4xl shadow-lg hover: cursor-pointer text-white hover:bg-moss'/>
                            <div className='flex justify-between gap-2 mt-5'>
                                <button className='h-12 border-1 w-full rounded-4xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors'>
                                  <Image src={appleIcon} alt='Apple icon' width={20} height={20} />
                                      Apple
                                </button>
                    
                                <button className='h-12 border-1 w-full rounded-4xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors'>
                                  <Image src={googleIcon} alt='Google icon' width={20} height={20} />
                                    Google
                                </button>
                            </div>
                    </div>

                    


                </form>

                <div className='flex gap-1 mt-5 justify-center'>
                    <h4 className='text-gray-500'>Don't have an account?</h4>  
                    <Link className='underline' href="/signup">Sign up.</Link>
                </div>
                
            </div>



            {/* // background image */}
            <div  className='w-[50%]'>
                <Image src={img1} alt='library_image' style={{height: "100%"}}></Image>
            </div>
        </div>

    </div>

   </>
  );
}