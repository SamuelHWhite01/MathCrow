import SetupClassroom from '@/components/homescreen/SetupClassroom';
import PlayButton from '../components/homescreen/PlayButton';
import JoinByCode from '@/components/homescreen/JoinByCode';
import { useAuth } from "../context/AuthContext";
import { useMemo } from 'react';

const HomeScreen = () => {
  const {user} = useAuth()
  const isLoggedIn = useMemo(() => user != null, [user]);
  return (
    <div className='leading-none m-auto flex flex-col 
    h-fit w-[clamp(20rem,50vw,50rem)]'>
      <img src='/FullLogo.png' className='
        w-[clamp(8rem,20vw,20rem)]
        h-auto m-auto'></img>
      <PlayButton/>
      { isLoggedIn &&(
      <SetupClassroom/>
      )}
      { isLoggedIn &&(
      <JoinByCode/>
      )}
    </div>
  );
};

export default HomeScreen;