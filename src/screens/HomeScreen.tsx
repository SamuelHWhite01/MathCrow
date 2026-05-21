import SetupClassroom from '@/components/homescreen/SetupClassroom';
import PlayButton from '../components/homescreen/PlayButton';
import JoinByCode from '@/components/homescreen/JoinByCode';
const HomeScreen = () => {
  return (
    <div className='leading-none m-auto flex flex-col 
    h-fit w-[50vw]'>
      <img src='/FullLogo.png' className='
        w-[20vw]
        h-auto m-auto'></img>
      <PlayButton/>
      <SetupClassroom/>
      <JoinByCode/>
    </div>
  );
};

export default HomeScreen;