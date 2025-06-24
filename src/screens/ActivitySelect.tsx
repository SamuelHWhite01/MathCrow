import { Link } from 'react-router-dom';
const HomeScreen = () => {
  return (
    <div className='leading-none m-auto flex flex-col w-fit h-fit gap-10'>
      <Link to="/TimesTable">Go to Times Table</Link>
      <Link to="/LongMultiplication">Go to Long Multiplication</Link>
    </div>
  );
};

export default HomeScreen;