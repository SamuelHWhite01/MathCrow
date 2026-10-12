import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//import {toast} from 'react-toastify';
const LoginSelector = () => {

  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth();

  async function handleParentLogin(){
    try{
      sessionStorage.setItem('pendingRole', 'parent');
      await loginWithGoogle();
      navigate('/TimesTable');
    }
    catch (err){
      //console.log("Login failed: ", err);
    }
  }

  return (
      <div className=' flex flex-col m-auto items-center gap-5'>
        <button className="bg-[#2596be] text-white rounded-lg font-bold
        h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
        text-[clamp(1rem,2vw,1.8rem)]
        m-auto
        mt-[1vw]
        hover:cursor-pointer
        hover:scale-110 transform transition-transform duration-150"
        onClick={handleParentLogin}>
        Log in as Parent
        </button>

        <button className="bg-[#2596be] text-white rounded-lg font-bold
        h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
        text-[clamp(1rem,2vw,1.8rem)]
        m-auto
        mt-[1vw]
        hover:cursor-pointer
        hover:scale-110 transform transition-transform duration-150"
        onClick={(_e) => navigate('/TimesTable')}>
        Log in as Student
        </button>

        <button className="bg-[#2596be] text-white rounded-lg font-bold
        h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
        text-[clamp(1rem,2vw,1.8rem)]
        m-auto
        mt-[1vw]
        hover:cursor-pointer
        hover:scale-110 transform transition-transform duration-150"
        onClick={(_e) => navigate('/TimesTable')}>
        Log in as Teacher
        </button>

      </div>
  );
};

export default LoginSelector;