import { useAuth } from '@/context/AuthContext';
import { getStudentData } from '@/utils/firebase';
import { useUserDataContext } from 'context/UserDataContext';
import { useEffect } from 'react';
function StudentGrid(){
    const {userData} = useUserDataContext()
    const {user} = useAuth()
    useEffect(() => { // the first answer will never be animated
        let studentData = getStudentData(user)
        console.log(studentData)
    },[]);
    const makeRequest = () =>{
        let studentData = getStudentData(user)
        console.log("Data: ", studentData)
    }
    return (
        <div>
            gridgridgrid
            <button
            onClick={makeRequest}
            className='
            bg-blue-400 border-1 text-[5vh] h-[6vh] w-[20vw]'>
                make request
            </button>
        </div>
    );
};
export default StudentGrid;
