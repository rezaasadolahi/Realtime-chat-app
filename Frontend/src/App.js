import { Fragment, useEffect, useState } from 'react'
import Navigation from './Components/Navigation'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Pages
import Login from './Pages/Login'
import Main from './Pages/main'
import { io } from "socket.io-client"








export default function App() {
  const [socket, setSocket] = useState()
  const user_login = useSelector(state => state.Reducer.Login)

  useEffect(() => {
    const socket = io("http://localhost:1000")
    setSocket(socket)

    socket.on("connect", () => {
      console.log("socket Connected")
    })
  }, [])






 

  return (
    <Fragment>
      {user_login?.length !== 0 && user_login?.some(item => !item.error ? true : false)
        ?
        <Fragment>
          <div className='w-screen h-screen overflow-hidden'>
            <Navigation socket={socket} />
            <Main socket={socket} />
          </div>

          <Routes>

          </Routes>
        </Fragment>
        :
        <Login socket={socket} />
      }
    </Fragment>
  )
}