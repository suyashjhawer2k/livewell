'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AvatarGenerator } from 'random-avatar-generator'
import Link from 'next/link';
import { auth } from '../../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';

function page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState('')
  const router = useRouter()

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
   
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        const userCredential = await signInWithEmailAndPassword(auth,email, password);
        const user = userCredential.user;
        
        if(user){
          router.push('/');
        }
        
         setErrors({});
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error(error.message);
      setErrors({});
    }
    setLoading(false);
    
  };


  return (
    <div className='flex justify-center items-center h-screen p-10 m-2'>

      <form onSubmit={handleSubmit} className='space-y-4 w-full max-w-2xl shadow-lg p-10'>
        <h1 className='text-xl text-center font-semibold text-[$0b3a65ff]'>Chat App</h1>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Email</span>
          </label>
          <input type='email' placeholder='Enter your email' className='w-full input input-bordered' value={email} onChange={(e) => setEmail(e.target.value)}>
          </input>
          {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Password</span>
          </label>
          <input type='password' placeholder='Enter your password' className='w-full input input-bordered' value={password} onChange={(e) => setPassword(e.target.value)}>
          </input>
          {errors.password && <span className='text-sm text-red-500'>{errors.password}</span>}
        </div>

        <div>
        <button type='submit' className='btn btn-block bg-[#0b3a65ff] text-white'>
          {
            loading ? <span className='loading loading-spinner loading-sm'></span> :'Login'
          }
        </button>
      </div>

      <span>Don't have an Account?{' '}
        <Link href='/register' className = 'text-blue-600 hover:text-blue-800 hover:underline'>Register</Link>
      </span>
      </form>

     

    </div>
  )
}

export default page