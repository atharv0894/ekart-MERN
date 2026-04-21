import React from 'react'

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <h2 className="text-xl font-semibold mb-3">✅ Check your email</h2>
        <p className="text-gray-600">We have sent a verification link to your email address.</p>
        <p className="text-gray-600">Click on the link to verify your email address.</p>
        <p className="text-gray-600">If you don't receive the email, please check your spam folder.</p>
      </div>
    </div>
  )
}

export default Verify