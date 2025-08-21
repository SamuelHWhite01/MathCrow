import { useAuth } from '@/context/AuthContext';
import UserData from '@/types/UserData';
import { getStudentData } from '@/utils/firebase';
import { useUserDataContext } from 'context/UserDataContext';
import { useEffect, useState } from 'react';
function StudentGrid(){
    const {userData} = useUserDataContext()
    const [studentList, setStudentList] = useState<UserData[]>([])
    const [factorsCompleteList, setFactorsCompleteList] = useState<boolean[][]>([])
    const {user} = useAuth()
    const NUMTOCOMPLETE = 1 // this is the number of questions for each factor that needs to be completed to be considered complete
    const fetchStudentData = async () => {
        if (!user) return; // safety check
        try {
            const data = await getStudentData(user);
            if (data) setStudentList(data); // update state when data arrives
        } catch (err) {
        console.error("Failed to fetch student data:", err);
        }
    }
    useEffect(() => { // the first answer will never be animated
        fetchStudentData()
    },[]);
    function getHistoryGridBooleans(studentDataList: UserData[]): boolean[][] {
        return studentDataList.map(student =>
        student.timesTableData.historyGrid.map(row =>
        row.every(value => value >= NUMTOCOMPLETE)
        )
        )
    }
    useEffect(() => { 
        console.log(studentList)
        setFactorsCompleteList(getHistoryGridBooleans(studentList))
    },[studentList]);
        useEffect(() => { 
        console.log(factorsCompleteList)
    },[factorsCompleteList]);
    const factorAnswered = (student:number, factor:number) => // will sum the number of times that a studnet has answered a question of a given factor
    {
        let total = 0
        studentList[student].timesTableData.historyGrid[factor].forEach((n: number)=>total+=n)
        return total
    }
    const titleGenerator = (student:number, factor:number) =>
    {
        const numAnswered = factorAnswered(student, factor)
        const studentName = studentList[student].userName
        return(`${studentName} has answered ${numAnswered} factor of ${factor+1} problems.`)

    }
    return (
        <div className=' text-[2vh] font-bold border-1 flex flex-col'>
            {studentList.map((student, i) =>(
                <div key={i+"student"} className='border-1 flex flex-row items-center'>
                    <div key={i+"studentName"} className='border-r w-[20vw] h-[2vw]'>
                        {student.userName}
                    </div>
                    <div key={i+"studentScore"} className=' flex flex-row border-1'>
                        {factorsCompleteList[i].map((complete, j) =>
                            <div key={i+"score"+j} className={`flex scoreboard-cell h-[2vw] w-[2vw] border-1 ${complete ? 'bg-green-500' : 'bg-gray-300'}`}
                            title = {titleGenerator(i,j)}>
                                
                            </div>
                        )}
                    </div>
                    <div key={i+"totalAnswered"}>
                        {student.timesTableData.numCorrect}
                    </div>
                    
                </div>
            ))

            }

        </div>
    );
};
export default StudentGrid;
