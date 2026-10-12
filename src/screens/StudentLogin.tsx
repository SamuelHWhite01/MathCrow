import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { loginAsStudent } = useAuth();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  async function handleLogin(){
    try{
      await loginAsStudent(username, pin);
      navigate('/TimesTable');
    }
    catch (err){
      toast.error("Invalid username or PIN");
    }
  }

  return (
    <div className='flex flex-col m-auto items-center gap-5 w-[clamp(20rem,50vw,45rem)]'>
      <div className='text-[clamp(1.2rem,2.5vw,2rem)] font-bold'>
        Log in as Student
      </div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="
        h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full
        border-gray-400
        border-2
        rounded-lg
        text-center
        font-bold" />

      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        className="
        h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full
        border-gray-400
        border-2
        rounded-lg
        text-center
        font-bold" />

      <button
        onClick={handleLogin}
        className="bg-[#2596be] text-white rounded-lg font-bold
        h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
        text-[clamp(1rem,2vw,1.8rem)]
        m-auto
        mt-[1vw]
        hover:cursor-pointer
        hover:scale-110 transform transition-transform duration-150">
        Log In
      </button>
    </div>
  );
};

export default StudentLogin;
