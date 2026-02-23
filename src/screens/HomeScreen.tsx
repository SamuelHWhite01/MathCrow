import SetupClassroom from '@/components/homescreen/SetupClassroom';
import PlayButton from '../components/homescreen/PlayButton';
import JoinByCode from '@/components/homescreen/JoinByCode';
import StripeButton from '@/components/homescreen/StripeButton';
const HomeScreen = () => {
  return (
    <div className='leading-none m-auto flex flex-col w-fit h-fit gap-10'>
      <img src='/FullLogo.png' className='w-[20vw] h-auto'></img>
      <PlayButton/>
      <SetupClassroom/>
      <JoinByCode/>
      <StripeButton/>
    </div>
  );
};

export default HomeScreen;