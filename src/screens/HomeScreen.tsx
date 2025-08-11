import SetupClassroom from '@/components/homescreen/SetupClassroom';
import PlayButton from '../components/homescreen/PlayButton';
import JoinByCode from '@/components/homescreen/JoinByCode';
const HomeScreen = () => {
  return (
    <div className='leading-none m-auto flex flex-col w-fit h-fit gap-10'>
      <img src='/MathCrow/FullLogo.png' className='w-[20vw] h-auto'></img>
      <PlayButton/>
      <SetupClassroom/>
      <JoinByCode/>
    </div>
  );
};

export default HomeScreen;