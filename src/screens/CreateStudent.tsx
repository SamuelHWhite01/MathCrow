import { useState } from 'react';
import { getFunctions, httpsCallable } from "firebase/functions";
import { toast } from 'react-toastify';

type CreateStudentAccountRequestType = {
  username: string;
  pin: string;
};
type CreateStudentAccountResultType = {
  uid: string;
};

const CreateStudent = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const pinValid = pin.length === 6;
  const pinsMatch = pinValid && pin === confirmPin;
  const canSubmit = username.trim().length > 0 && pinsMatch;
  const functions = getFunctions();
  const createStudentAccount = httpsCallable<CreateStudentAccountRequestType, CreateStudentAccountResultType>(
    functions,
    "createStudentAccount"
  );

  async function handleSubmit(){
    if (!canSubmit) return;
    try{
      await createStudentAccount({ username, pin });
      toast.success(`Student account "${username}" created!`);
      setUsername("");
      setPin("");
      setConfirmPin("");
    }
    catch (err){
      const message = err instanceof Error ? err.message : "Failed to create student account";
      toast.error(message);
    }
  }

  return (
    <div className='flex flex-col m-auto items-center gap-5 w-[clamp(20rem,50vw,45rem)]'>
      <div className='text-[clamp(1.2rem,2.5vw,2rem)] font-bold'>
        Create Student Account
      </div>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="
        h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full
        border-gray-400
        border-2
        rounded-lg
        text-center
        font-bold" />

      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        className="
        h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full
        border-gray-400
        border-2
        rounded-lg
        text-center
        font-bold" />

      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder="Confirm PIN"
        value={confirmPin}
        onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
        className="
        h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full
        border-gray-400
        border-2
        rounded-lg
        text-center
        font-bold" />

      { pin.length > 0 && !pinValid &&(
        <div className="text-red-500 font-bold text-[clamp(0.8rem,1.5vw,1.2rem)]">
          PIN must be 6 digits
        </div>
      )}

      { pinValid && confirmPin.length > 0 && !pinsMatch &&(
        <div className="text-red-500 font-bold text-[clamp(0.8rem,1.5vw,1.2rem)]">
          PINs do not match
        </div>
      )}

      <button
        disabled={!canSubmit}
        onClick={handleSubmit}
        className={`rounded-lg font-bold
        h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
        text-[clamp(1rem,2vw,1.8rem)]
        m-auto
        mt-[1vw]
        transform transition-transform duration-150
        ${canSubmit
        ? 'bg-[#2596be] text-white hover:cursor-pointer hover:scale-110'
        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}>
        Create Student
      </button>
    </div>
  );
};

export default CreateStudent;
