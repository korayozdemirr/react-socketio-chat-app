import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [amessage, setMessage] = useState("");
  const [gelen, setGelen] = useState([]);
  const [user, setUser] = useState("");
  const sendMessage = () => {
    socket.emit("message", {
      message: amessage,
      name: "koray"
    })
    setMessage("")
  }
  const pressEnter = (e) => {

    if (e.keyCode === 13) {
      sendMessage();
    }
  }
  useState(() => {
    socket.on("allMessage", (gelenmesaj) => {
      setGelen(oldMessages => [...oldMessages, gelenmesaj])
    })
  }, [])
  if (!user) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col border-black border-2 w-96 p-4 '>
          <div className="p-4 "><h1 className='text-center font-bold text-2xl'>Login</h1></div>
          <input type="text" className='my-10 border-b focus:outline-none' placeholder='Enter the Username'/>
          <button>Login</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex border flex-col border-black max-w-[800px] h-[400px] m-auto mt-8'>
        <div className='flex h-full flex-col overflow-auto'>
          {gelen.map((value, index) => {
            return (
              <div key={index}>{value.name + ': ' + value.message}</div>
            )
          })}
        </div>
        <div className='flex'>
          <input type="text" value={amessage} onChange={event => setMessage(event.target.value)} onKeyDown={pressEnter} className='border-t w-full border-black ' />
          <button className='border border-black ' onClick={sendMessage}>Gönder</button>
        </div>
      </div>
    )
  }

}

export default App
