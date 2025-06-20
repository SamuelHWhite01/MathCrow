import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className='flex flex-col m-auto text-[5vh]'>
      <Link to="/TimesTable">Go to Times Table</Link>
      <Link to="/LongMultiplication">Go to Long Multiplication</Link>
    </div>
  );
};

export default HomeScreen;