import { useState, Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { PatternFormat } from 'react-number-format'










export default function Signin({ setStatusPage, socket }) {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        photo: '',
        bio: '',
        website: '',
        gender: 'male',
        age: '',
        phone: '',
        date_of_birth: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signinHandle = async (event) => {
        event.preventDefault()
        if (user.age >= 18) {
            socket.emit('userjoined', user.username)

            socket.emit('signin', {
                ...user,
                lastname: user.lastname === '' ? null : user.lastname,
                photo: user.photo === '' ? null : user.photo,
                bio: user.bio === '' ? null : user.bio,
                website: user.website === '' ? null : user.website,
                age: user.age === '' ? null : user.age,
                date_of_birth: user.date_of_birth === '' ? null : user.date_of_birth,
            })
        } else {
            toast.warning('سن نباید کمتر از 18 سال باشد', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        socket.on('resultSignin', (result) => {
            result.error ?
                toast.error(result?.error, {
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
                toast.success(result?.success, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            result?.success && setTimeout(() => setStatusPage(false), 5000)
        })
    }











    return (
        <Fragment>
            <ToastContainer />


            <div className="font-sans">
                <div className="relative min-h-full flex flex-col sm:justify-center items-center h-full">
                    <div className="relative sm:max-w-sm w-full h-auto">
                        <div className="card bg-blue-400 shadow-lg mt-4 w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg mt-4 w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full border mt-5 rounded-3xl h-full px-6 py-4 bg-gray-100 shadow-md">
                            <label className="block mt-3 text-xl text-gray-700 text-center font-semibold">ثبت نام</label>
                            <form className="mt-10" onSubmit={signinHandle} autoComplete={'off'}>
                                <div>
                                    <input type="text" placeholder="firstname" name='firstname' value={user.firstname} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required />
                                </div>

                                <div>
                                    <input type="text" placeholder="lastname" name='lastname' value={user.lastname} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" />
                                </div>

                                <div>
                                    <input type="text" placeholder="username" name='username' value={user.username} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required />
                                </div>

                                <div>
                                    <input type="email" placeholder="email" name='email' value={user.email} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required />
                                </div>

                                <div>
                                    <input type="file" placeholder="photo" name='photo' value={user.photo} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" />
                                </div>

                                <div>
                                    <textarea type="text" placeholder="bio" name='bio' value={user.bio} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" maxLength='150' />
                                </div>
                                <p className='text-slate-600 ml-2 mt-1 text-sm'>{user.bio.length}/150</p>

                                <div>
                                    <input type="text" placeholder="website" name='website' value={user.website} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" />
                                </div>

                                <div>
                                    <select value={user.gender} name='gender' onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                </div>

                                <div>
                                    <PatternFormat
                                        format="###"
                                        placeholder="age" name='age' value={user.age} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required
                                    />
                                </div>

                                <div>
                                    <PatternFormat
                                        format="+98 ###-###-####"
                                        mask="_"
                                        placeholder="phone" name='phone' value={user.phone} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required
                                    />
                                </div>

                                <div>
                                    <PatternFormat format="####/##/##" placeholder="birth date" mask={['Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D']} name='date_of_birth' value={user.date_of_birth} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" />
                                </div>

                                <div>
                                    <input type="password" placeholder="password" name='password' value={user.password} onChange={handleChange} translate={'no'} spellCheck={'false'} className="block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 text-black mt-6" required />
                                </div>

                                <div className="mt-7">
                                    <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 text-2xl">ثبت نام</button>
                                </div>

                                <div className="flex mt-7 items-center text-center">
                                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                                    <label className="block font-medium text-sm text-gray-600 w-full">
                                        Signup with
                                    </label>
                                    <hr className="border-gray-300 border-1 w-full rounded-md" />
                                </div>

                                <div className="flex mt-7 justify-center w-full">
                                    <button className="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Facebook</button>

                                    <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">Google</button>
                                </div>

                                <div className="mt-7">
                                    <div className="flex justify-center items-center">
                                        <p className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 cursor-pointer" onClick={() => setStatusPage(false)}>
                                            You have account ?
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