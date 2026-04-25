import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'



const  VerifyEmail = () => {
    const{ token}=useParams()
    const [status,setStatus]=useState("verifying")
    const navigate = useNavigate()
    const VerifyEmail = async () => {
      try {
        const res = await axios.get(`https://ekart-mern-backend.onrender.com/api/v1/user/verify/${token}`)
        if (res.data.success) {
          setStatus("Email Verified Successfully")
          setTimeout(() => {
            navigate("/login")
          }, 2000)
        }
      } catch (error) {
        console.error(error)
        const msg = error?.response?.data?.message || "Verification failed. Link may have expired."
        setStatus(msg)
      }
    }
    useEffect(()=>{
      VerifyEmail()
    },[token])
  return (


    <div className='relative w-full h-[760px] bg-gray-200' >
      <div className='min-h-screen flex items-center justify-center'>
         <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
          <h2 className=' text-xl font-semibold text-gray-800'>{status}</h2>
          <p className='text-gray-600 mt-2'>Verifying your email address...</p>
         </div>
        
      </div>
    </div>
  )
}

export default VerifyEmail