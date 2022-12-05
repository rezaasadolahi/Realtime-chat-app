import { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
// Page
import Signin from '../Sign in'
// Reducer
import { Login as LoginUser } from '../../Redux/Action/Creator'











export default function Login({ socket }) {
    const [statusPage, setStatusPage] = useState(false)
    const Dispatch = useDispatch()

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const loginHandle = async (event) => {
        event.preventDefault()

        socket.emit('userjoined', user.username)

        socket.emit('login', user)
        socket.on('resultLogin', (UserLogin) => {
            UserLogin?.find(item => item).error ?
                toast.error(UserLogin?.find(item => item).error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                :
                //* When user login change online account status
                socket.emit('logout', 'online', UserLogin?.find(item => item)?.id)
            Dispatch(LoginUser(UserLogin))
        })
    }










    if (statusPage) {
        return (
            <Signin setStatusPage={setStatusPage} socket={socket} />
        )
    } else {
        return (
            <Fragment>
                <ToastContainer />


                <div className="font-sans">
                    <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
                        <div className="relative sm:max-w-sm w-full">
                            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                                <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">ورود</label>
                                <form className="mt-10" onSubmit={loginHandle} autoComplete={'off'}>
                                    <div>
                                        <input type="text" placeholder="username" name='username' value={user.username} onChange={handleChange} translate={'no'} spellCheck={'false'} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black" autoFocus />
                                    </div>

                                    <div className="mt-7">
                                        <input type="text" placeholder="password" name='password' value={user.password} onChange={handleChange} translate={'no'} spellCheck={'false'} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black" />
                                    </div>

                                    <div className="mt-7">
                                        <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 text-2xl">ورود</button>
                                    </div>

                                    <div className="flex mt-7 items-center text-center">
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                        <label className="block font-medium text-sm text-gray-600 w-full">
                                            Login with
                                        </label>
                                        <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    </div>

                                    <div className="flex mt-7 justify-center w-full">
                                        <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Facebook</button>

                                        <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Google
                                        </button>
                                    </div>

                                    <div className="mt-7">
                                        <div className="flex justify-center items-center">
                                            <p className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 cursor-pointer" onClick={() => setStatusPage(true)}>
                                                You have no account ?
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
