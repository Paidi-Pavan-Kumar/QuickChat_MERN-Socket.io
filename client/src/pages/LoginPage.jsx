import React, { useContext, useState } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../context/AuthContext';


const LoginPage = () => {

  const { authUser, login } = useContext(AuthContext);
  // currState: "Sign up" or "Login"
  const [currState, setCurrState] = useState("Sign up");
  const isSignup = currState === "Sign up";

  // Form states
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState(authUser?.bio || "");


  const handleSubmit = e => {
    e.preventDefault();

    login(
      currState === "Sign up" ? 'signup' : 'login',
      { fullName, email, password, bio }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#8e54e9] relative overflow-hidden">
      {/* Decorative blurred gradient shapes */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-violet-500 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-400 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-fuchsia-400 opacity-20 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto flex bg-white/10 backdrop-blur-2xl border-4 border-violet-400/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Side: Logo/Brand */}
        <div className="hidden md:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-[#18122B]/80 via-[#393053]/80 to-[#635985]/80 p-10 border-r-4 border-violet-400/30">
          <img src={assets.logo_big} alt="Logo" className="w-72 max-w-full drop-shadow-2xl" />
        </div>
        {/* Right Side: Login/Signup */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12">
          <img src={assets.logo_icon} alt="Logo" className="w-14 mb-6 drop-shadow-lg md:hidden" />
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-wide drop-shadow">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-gray-200 mb-8 text-center text-base font-light drop-shadow">
            {isSignup ? 'Sign up for QuickChat' : 'Login to QuickChat'}
          </p>
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-300 outline-none border-2 border-fuchsia-400/40 focus:border-violet-500 transition shadow"
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-300 outline-none border-2 border-fuchsia-400/40 focus:border-violet-500 transition shadow"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-300 outline-none border-2 border-fuchsia-400/40 focus:border-violet-500 transition shadow"
              required
            />
            {isSignup && (
              <textarea
                name="bio"
                placeholder="Short Bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/30 text-white placeholder-gray-300 outline-none border-2 border-fuchsia-400/40 focus:border-violet-500 transition shadow resize-none"
                rows={2}
              />
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-bold text-lg shadow-lg transition border-2 border-violet-400/40"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>
          <button
            className="mt-4 text-sm text-violet-200 hover:underline transition"
            onClick={() => setCurrState(isSignup ? "Login" : "Sign up")}
          >
            {isSignup
              ? 'Already have an account? Login'
              : "Don’t have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
