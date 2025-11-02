type AgeCheckProps = {
    ageCheck:boolean,
    setAgeCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
function AgeCheck({ageCheck, setAgeCheck}:AgeCheckProps){
    return (
    <div className="flex m-auto">
        <div>
            I verify that I am above 13 years of age
        </div>
        <input
            type="checkbox"
            checked={ageCheck}
            onChange={(e) => setAgeCheck(e.target.checked)}
            className="ml-4 bg-[#2596be] rounded-lg  h-[5vh] w-[5vh] hover:cursor-pointer
    hover:scale-110 transform transition-transform duration-150">
        </input>
    </div>
    );
};

export default AgeCheck;
