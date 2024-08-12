import { useEffect, useState } from 'react';
import { socket } from './socket';

function App() {
  const [amessage, setMessage] = useState("");
  const [gelen, setGelen] = useState([]);
  const [user, setUser] = useState("");
  const [username, setUserName] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([]);
  const sendMessage = () => {
    socket.emit("message", {
      message: amessage,
      name: user.username
    })
    setMessage("")
  }
  const onDisconnect = () => {
    socket.disconnect()
  }
  const login = () => {
    socket.emit("login", username)
  }
  const pressEnter = (e) => {

    if (e.keyCode === 13) {
      sendMessage();
    }
  }
  useEffect(() => {
    socket.on("login", (login) => {
      setUser(login)
    })
    socket.on("allMessage", (gelenmesaj) => {
      setGelen(oldMessages => [...oldMessages, gelenmesaj])
    })
    socket.on("onlineUsers", (onlineUsers)=>{
      console.log(onlineUsers)
      setOnlineUsers(onlineUsers)
    })
    return () => {
      socket.off('onlineUsers')
      socket.off("login")
      socket.off("allMessage")
    }
  }, [])
  if (!user) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col w-96 p-4 justify-center items-center'>
          <input type="text" value={username} onChange={e => setUserName(e.target.value)} className='my-10 border-b focus:outline-none w-full p-2' placeholder='Enter the Username' />
          <button className='bg-blue-600 text-white rounded-md h-10 w-20' onClick={login}>Login</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex border flex-col border-black max-w-[800px] h-[400px] m-auto mt-8'>
        <div className='flex h-full'>
          <div className='border p-4'>Online Users
            <div>
              <ul>
                {
                  onlineUsers.map((users, id)=>{
                    console.log(users)
                    return(
                      <li key={id}>{users.username}</li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className='flex h-full flex-col overflow-auto p-4'>
            {gelen.map((value, index) => {
              return (
                <div key={index}>{value.name + ': ' + value.message}</div>
              )
            })}
          </div>
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
