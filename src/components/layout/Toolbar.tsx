// components/Toolbar.tsx
import { useAuth } from "@/context/AuthContext";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useUserDataContext } from "@/context/UserDataContext";
//import { getCurrentUserSubscriptions, getStripePayments } from "@invertase/firestore-stripe-payments";
//import { getApp } from "firebase/app";

const Toolbar: React.FC = () => {
    const navigate = useNavigate()
    //const app = getApp();
    const { user } = useAuth();
    const {userData} = useUserDataContext();
    const isLoggedIn = useMemo(() => user != null, [user]);
    // const [isSubscribed, setIsSubscribed] = useState(false)
    // const payments = getStripePayments(app, {
    // productsCollection: "products",
    // customersCollection: "customers",
    // });
    // useEffect(() => {
    //   if (!user) return; // only fetch if logged in

    //   const fetchSubs = async () => {
    //   try {
    //     const subs = await getCurrentUserSubscriptions(payments, {
    //       status: "active",
    //     });
    //     setIsSubscribed(subs.length > 0);
    //   } catch (err) {
    //     console.error("Error fetching subscriptions:", err);
    //     setIsSubscribed(false);
    //   }
    //   };

    //   fetchSubs();
    // }, [user, payments]);


  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex flex-row
     h-[clamp(2.5rem,4vw,4rem)] items-center gap-2 text-center">
        <button className=' bg-[url("/CroppedLogo.png")]
         h-[clamp(1.8rem,3vw,3rem)] w-[clamp(1.8rem,3vw,3rem)]
         md:bg-[url("/Logo-landscape.png")] md:w-[clamp(6rem,9vw,9rem)]
          bg-cover md:bg-contain md:bg-no-repeat md:bg-center
          rounded
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-2'
          onClick={(_e) => navigate('/')}>
          </button>
          { isLoggedIn &&(
            <button className='
              h-[clamp(1.8rem,3vw,3rem)] w-[clamp(1.8rem,3vw,3rem)] bg-[url("/Activities-symbol.png")]
              bg-cover
              rounded
              hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
              m-2'
              onClick={(_e) => navigate('/ActivitySelect')}/>
          )}
          { userData.isTeacher &&(
            <button className='
              h-[clamp(1.8rem,3vw,3rem)] w-[clamp(8rem,15vw,15rem)]
              text-[clamp(0.8rem,1.5vw,1.2rem)]
              font-bold
              bg-cover
              rounded
              bg-[#2596be] text-white
              hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
              m-2'
              onClick={(_e) => navigate('/TeacherDashboard')}>
                Teacher Dashboard
              </button>
          )}
          { isLoggedIn &&(
            <div className="flex flex-row m-auto mr-2 gap-5 items-center justify-center">
                <LogoutButton/>
                <div className="
                  h-[clamp(1.8rem,3vw,3rem)] w-[clamp(4rem,9vw,8rem)]
                  text-[clamp(0.8rem,1.5vw,1.2rem)]
                  flex items-center
                  font-bold m-2">
                    {userData.classroomId}
                </div>
           </div>
          )}
            { !isLoggedIn &&(
            <div className="flex flex-row m-auto mr-2">
                <LoginButton/>
           </div>
          )}
    </header>
  );
};

export default Toolbar;
