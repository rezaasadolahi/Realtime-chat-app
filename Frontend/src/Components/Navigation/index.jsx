import React from 'react'
import { Avatar, Dropdown } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
// Component
import Search_User from '../Search User'
// Redux
import { Login as LoginUser, User_Clicked } from '../../Redux/Action/Creator'











export default function Navigation({ socket }) {
    const user_login = useSelector(state => state.Reducer.Login)
    const Dispatch = useDispatch()

    const handleLogOut = () => {
        //* When user logout change offline account status
        socket.emit('logout', 'offline', user_login?.find(item => item)?.id)

        setTimeout(() => {
            Dispatch(User_Clicked(0))
            Dispatch(LoginUser([]))
        }, 2)
    }









    return (
        <header className='w-screen bg-gray-50 relative h-auto'>
            <nav className='flex flex-row-reverse justify-end items-center'>
                <section className='w-auto'>
                    <div className="flex justify-start items-center md:order-2 text-left" dir='rtl'>
                        {user_login?.map(item =>
                            <Dropdown
                                key={item.id}
                                arrowIcon={false}
                                inline={true}
                                label={<Avatar alt="User settings" img={item.photo ?? "https://b2n.ir/p33247"} style={{ clipPath: 'circle' }} rounded={true} />}
                            >
                                <Dropdown.Header>
                                    <span className="block truncate text-sm font-medium">
                                        username: {item.username}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        email: {item.email}
                                    </span>
                                </Dropdown.Header>

                                <Dropdown.Item>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Earnings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='bg-red-600' onClick={() => handleLogOut(item.id)}>
                                    <p className='text-white'>Sign out</p>
                                </Dropdown.Item>
                            </Dropdown>
                        )}
                    </div>
                </section>

                <Search_User socket={socket} />
            </nav>
        </header>
    )
}