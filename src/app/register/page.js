'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AvatarGenerator } from 'random-avatar-generator'
import Link from 'next/link';
import { auth,firestore } from '../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';

function page() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [errors, setErrors] = useState('')
  const [loading, setLoading] = useState('')
  const [avatarurl, setAvatarUrl] = useState('')
  const router = useRouter()

  const randomAvataar = () => {
    const generator = new AvatarGenerator();
    return generator.generateRandomAvatar();
  }

  const refreshAvataar = () => {
    setAvatarUrl(randomAvataar())
  }

  useEffect(() => {
    setAvatarUrl(randomAvataar())
  }, [])

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        const userCredential = await createUserWithEmailAndPassword(auth,email, password);
        const user = userCredential.user;
         const docRef = doc(firestore, 'users', user.uid);
         console.log(role)
         await setDoc(docRef, {
           name,
           email:email,
           avatarurl,
           role,
           status:'online',
         });
        
         router.push('/');
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

        <div className='flex items-center space-y-2 justify-between border border-gray-200 p-2'>
          <img src={avatarurl} className='rounded-full h-20 w-20' alt='avataar'></img>
          <button onClick={refreshAvataar} type="button" className='btn btn-outline'>New avataar</button>
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Name</span>
          </label>
          <input type='text' placeholder='Enter your name' className='w-full input input-bordered' value={name} onChange={(e) => setName(e.target.value)}>
          </input>
          {errors.name && <span className='text-sm text-red-500'>{errors.name}</span>}
        </div>

        <div>
          <label className='label'>
            <span className='text-base label-text'>Email</span>
          </label>
          <input type='email' placeholder='Enter your email' className='w-full input input-bordered' value={email} onChange={(e) => setEmail(e.target.value)}>
          </input>
          {errors.email && <span className='text-sm text-red-500'>{errors.email}</span>}
        </div>

          <div className="form-control ">
            <label className="label cursor-pointer">
              <span className="label-text">Doctor</span>
              <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked={role === "Doctor"} onChange={() => setRole('Doctor')} />
            </label>
            {errors.role && <span className='text-sm text-red-500'>{errors.role}</span>}
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Patient</span>
              <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked={role === "Patient"} onChange={() => setRole('Patient')} />
            </label>
            {errors.role && <span className='text-sm text-red-500'>{errors.role}</span>}
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
          <label className='label'>
            <span className='text-base label-text'>Confirm Password</span>
          </label>
          <input type='password' placeholder='Confirm your password' className='w-full input input-bordered' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}>
          </input>
          {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword}</span>}
        </div>

        <div>
        <button type='submit' className='btn btn-block bg-[#0b3a65ff] text-white'>
          {
            loading ? <span className='loading loading-spinner loading-sm'></span> :'Register'
          }
        </button>
      </div>

      <span>Already have an Account?{' '}
        <Link href='/login' className = 'text-blue-600 hover:text-blue-800 hover:underline'>Login</Link>
      </span>
      </form>

     

    </div>
  )
}

export default page