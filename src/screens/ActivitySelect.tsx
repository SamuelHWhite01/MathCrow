import { Link, useNavigate } from 'react-router-dom';
const HomeScreen = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col m-auto items-center gap-5'>
      <div className='text-[10vh]'>
        Select an activity
      </div>
      <div className=' flex flex-row m-auto items-center gap-5'>
        <div className='flex flex-col items-center text-[3vh] font-bold'>
          <button className=' h-[20vh] w-[20vh] 
          bg-[url("/icon1.png")]
          bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(e) => navigate('/TimesTable')}>        
          </button>
          Times Table
        </div>
        <div className='h-[20vh] w-[20vh] bg-blue-300 rounded'>

        </div>
      </div>
      <div className='leading-none m-auto flex flex-col w-fit h-fit gap-10'>
        <Link to="/TimesTable">Go to Times Table</Link>
        <Link to="/LongMultiplication">Go to Long Multiplication</Link>
      </div>
    </div>
  );
};

export default HomeScreen;