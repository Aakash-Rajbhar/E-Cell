'use client';

import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert('Please fill all the fields');
      return;
    }

    // Retrieve credentials from environment variables
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email !== 'admin@adgips.com' || password !== 'admin@1234') {
      alert('Invalid Credentials');
      return;
    }

    // Save session in localStorage (you can replace this with a proper token/cookie system)
    localStorage.setItem('isAdmin', 'true');

    // Redirect to the admin dashboard
    router.push('/admin/dashboard');
    console.log('Form Submitted');
  };

  return (
    <div>
      <div className="w-full h-screen bg-neutral-900 text-white flex items-center">
        <section className="hidden flex-[1/3] h-full bg-yellow-500 text-neutral-900 md:flex flex-col items-center justify-center gap-4 pr-6">
          <RocketLaunchIcon className="h-12 w-12 inline-block mr-2 group-hover:rotate-45 transition-transform" />
          <h2 className="text-4xl">Welcome to the E-Cell ADGIPS</h2>
          <p>A platform for the students to learn, grow and innovate.</p>
        </section>
        <section className="flex-auto h-full text-center flex flex-col items-center justify-center gap-4">
          <h3 className="text-center text-3xl text-white">Login to continue</h3>
          <div className="w-96 px-6 py-8 rounded-md shadow-lg bg-white flex flex-col justify-center gap-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border border-neutral-300 rounded-lg outline-none text-neutral-700 text-xl"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border border-neutral-300 rounded-lg outline-none text-neutral-700 text-xl pr-10"
                />
                {showPassword ? (
                  <EyeIcon
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 h-6 w-6 text-neutral-700 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 h-6 w-6 text-neutral-700 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-black p-2 rounded-sm"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
