import PlayButton from '../components/homescreen/PlayButton';
const HomeScreen = () => {
  return (
    <div className='leading-none m-auto flex flex-col w-fit h-fit gap-10'>
      <img src='/FullLogo.png' className='w-[20vw] h-auto'></img>
      <PlayButton/>
    </div>
  );
};

export default HomeScreen;