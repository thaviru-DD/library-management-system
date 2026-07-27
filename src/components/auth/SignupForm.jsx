'use client'
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Person, WidthFull } from '@mui/icons-material';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Passero_One } from 'next/font/google';
import Image from 'next/image';
import img1 from '../../../public/images/signup_img1.jpg';
import googleIcon from '../../../public/icons/icons8-google-48.png';
import appleIcon from '../../../public/icons/icons8-apple-logo-30.png';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(e) {

        if (!email.includes('@')){
            alert('Please enter a valid email address.');
        }else if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
        }else if (password !== confirmPassword) {
            alert('Passwords do not match.');
        }else {
            // Handle successful signup
            alert('Signup successful');
        }
        
    }


  return (
   <>
   {/* <div className=''>
    <div className='w-full  rounded-xl p-10 shadow-lg bg-bg-light/50'>

      <form onSubmit={handleSubmit} className=''>
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
                <input className='border-b-1' type="text" value={email} onChange={(e) => setEmail(e.target.value)} on required/>
                <div className='flex items-center gap-2'>
                    <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="password">Create password</label>
                </div>
                <input className='border-b-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div className='flex items-center gap-2'>
                    <HttpsIcon sx={{ color: 'gray',fontSize: '20px' }} />
                    <label className='text-text-primary' htmlFor="password">Confirm password</label>
                </div>
                <input className='border-b-1' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  required/>
            </div>

            <div className='flex justify-center flex-col gap-1 mt-5'>
                <input type="Submit" value="Login" className='bg-blue-950 px-6 py-2 text-white rounded-lg cursor-pointer w-full hover:bg-blue-700 transition-colors duration-400 ease-in-out' />
                <Link className='text-blue underline text-sm text-center' href="/login">Already have an account? Login</Link>
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
                        <h1 className='text-center text-4xl'>Create an account</h1>
                        <h5 className='text-center mt-3'>Sign up and create new account</h5>
                    </div>

                    <div className='mt-15'>
                        <div className='flex flex-col gap-3 mb-5'>
                            <label htmlFor="name" className='px-3'>Full name</label>
                            <input type="text" className='bg-white h-12 rounded-4xl shadow-lg placeholder:p-3' placeholder='Thaviru De Silva' />
                        </div>

                        <div className='flex flex-col gap-3 mb-5'>
                            <label htmlFor="name" className='px-3'>Email</label>
                            <input type="text" className='bg-white h-12 rounded-4xl shadow-lg placeholder:p-3' placeholder='abcd@gmail.com' />
                        </div>

                        <div className='flex flex-col gap-3 mb-5 relative'>
                            <label htmlFor="name" className='px-3'>Password</label>
                            <VisibilityOffIcon className='absolute right-6 top-12' sx={{color: 'gray', fontSize:'20px'}}/>
                            <input type="text" className='bg-white h-12 rounded-4xl shadow-lg placeholder:p-3' placeholder='***************' />
                        </div>
                    </div>

                    <div className='mt-10'>
                        <input type="submit" className='bg-yellow-300 w-full h-12 rounded-4xl shadow-lg hover: cursor-pointer'/>
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

                <div className='flex gap-1 mt-5'>
                    <h4 className='text-gray-500'>Have any account?</h4>  
                    <Link className='underline' href="/login">Login</Link>
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