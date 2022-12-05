import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// Redux
import { User_Clicked } from '../../Redux/Action/Creator'










export default function InfoUser({ socket, setStatusInfoUser, user_clicked, user_login, userBlocked }) {
    const Dispatch = useDispatch()
    
    const handleBlock = () => {
        //* Block user
        socket.emit('block_user', user_login.find(item => item)?.id, user_clicked?.id)
    }

    const handleUnBlocked = () => {
        //* Unblock user
        socket.emit('delete_user_blocked', user_login.find(item => item)?.id, user_clicked?.id)
    }

    //* when click on remove chat
    const handleRemoveChat = () => {
        socket.emit('removeChat_Update', user_login?.find(item => item)?.id, user_clicked?.id, user_clicked)
        Dispatch(User_Clicked(0))
    }








    return (
        <div className='w-full h-screen bg-white z-50  text-black'>
            <div className='p-3 select-none flex justify-between'>
                <p onClick={() => setStatusInfoUser(false)} className='text-xl cursor-pointer'>
                    برگشت ⇨
                </p>

                <div className='btn-group flex border overflow-hidden rounded'>
                    {userBlocked?.some(item => item.user_id_blocked === user_clicked?.id) ?
                        <button
                            onClick={handleUnBlocked}
                            className='w-auto h-full bg-green-600 p-2 text-white text-lg'
                        >
                            رفع مسدودیت
                        </button>
                        :
                        <button
                            onClick={handleBlock}
                            className='w-auto h-full bg-red-600 p-2 text-white text-lg'
                        >
                            مسدود کردن
                        </button>
                    }
                    <button
                        className='w-auto h-full bg-yellow-300 p-2 text-lg'
                        onClick={handleRemoveChat}>حذف چت</button>
                </div>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>Fullname:&nbsp;&nbsp;</span>
                <span>{user_clicked?.firstname}&nbsp;&nbsp;</span>
                <span>{user_clicked?.lastname}</span>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>Username:&nbsp;&nbsp;</span>
                <span>{user_clicked?.username}</span>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>bio:&nbsp;&nbsp;</span>
                <span>{user_clicked?.bio}</span>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>Phone:&nbsp;&nbsp;</span>
                <span>{user_clicked?.phone}</span>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>Email:&nbsp;&nbsp;</span>
                <span>{user_clicked?.email}</span>
            </div>
            <hr />
            <div className='p-5'>
                <span className='text-light-blue-900 select-none'>website:&nbsp;&nbsp;</span>
                <Link target='_blank' to={`//${user_clicked?.website}`}>
                    {user_clicked?.website ?? 'وبسایتی ندارد'}
                </Link>
            </div>
            <hr />
            <div className='p-5 select-none'>
                <span><span className='text-light-blue-900'>Status:&nbsp;&nbsp;</span>
                    {user_clicked?.status === 'online' ?
                        <span className='text-green-600'>Online</span>
                        :
                        <span className='text-red-600'>Offline</span>
                    }
                </span>
            </div>
        </div>
    )
}