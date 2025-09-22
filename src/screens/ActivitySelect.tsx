import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
const HomeScreen = () => {
  
  const navigate = useNavigate()
  return (
    <div className='flex flex-col m-auto items-center gap-5'>
      <div className='text-[10vh] mb-[10vh]'>
        Select an activity
      </div>
      <div className=' flex flex-row m-auto items-center gap-5'>
        <div className='flex flex-col items-center text-[3vh] font-bold'>
          <button className=' h-[20vh] w-[20vh] 
          bg-[url("/MultIcon.png")]
          bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(_e) => navigate('/TimesTable')}>        
          </button>
          Multiplication
        </div>
        <div className='flex flex-col items-center text-[3vh] font-bold'>
          <button className=' h-[20vh] w-[20vh] 
          bg-[url("/DivIcon.png")]
          bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(_e) => toast.error("Check back soon!")}>        
          </button>
          Division
        </div>
        <div className='flex flex-col items-center text-[3vh] font-bold'>
          <button className=' h-[20vh] w-[20vh] 
          bg-[url("/FracIcon.png")]
          bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(_e) => toast.error("Check back soon!")}>        
          </button>
          Fraction
        </div>
        <div className='flex flex-col items-center text-[3vh] font-bold'>
          <button className=' h-[20vh] w-[20vh] 
          bg-[url("/DecIcon.png")]
          bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(_e) => toast.error("Check back soon!")}>        
          </button>
          Decimal
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;