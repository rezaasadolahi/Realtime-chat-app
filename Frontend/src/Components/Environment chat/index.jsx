import { Fragment, useDeferredValue, useState, useEffect, startTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from "@material-tailwind/react"
// icons
import { AiOutlineCloseSquare } from "react-icons/ai"
// Component
import InfoUser from '../info user'
// Redux
import { User_Clicked } from '../../Redux/Action/Creator'















export default function Environment_chat({ socket, setStatusInfoUser, statusInfoUser }) {
    const Dispatch = useDispatch()
    const [value, setValue] = useState('')
    const user_clicked = useSelector(state => state.Reducer.User_Clicked)
    const user_login = useSelector(state => state.Reducer.Login)
    const [chats, setChats] = useState()
    const ChatsDeferredValue = useDeferredValue(chats)
    const [userBlocked, setUserBlocked] = useState([])


    useEffect(() => {
        if (user_clicked) {
            //* Chat content between user who I clicked on the card
            socket.emit('chatstwouser', user_login?.find(item => item)?.id, user_clicked?.id)

            //* Result - Chat content between user who I clicked on the card
            socket.on('resultChatstwouser', (result) => startTransition(() => setChats(result)))

            //* Users I have blocked or they have blocked me
            socket.emit('user_blocked', user_login?.find(item => item)?.id)

            //* Result - Users I have blocked or they have blocked me
            socket.on('Result_user_blocked', (result) => setUserBlocked(result))

            //* return status messages 0 to 1 ---> 0 means not read and 1 means read
            socket.emit('statuschats', 1, user_login.find(item => item).id, user_clicked?.id)
        }
    }, [user_clicked, chats])


    //* Send Message
    const handleSendMessage = () => {
        socket.emit('sendchat', user_login.find(item => item).id, user_clicked?.id, 0, value)

        setValue('')
    }

    //* Close chat user
    const cliseChat = () => {
        Dispatch(User_Clicked(0))
    }










    if (user_clicked !== 0) {
        return (
            <Fragment>
                {/* Info User */}
                {statusInfoUser && <InfoUser
                    socket={socket}
                    setStatusInfoUser={setStatusInfoUser}
                    user_clicked={user_clicked}
                    user_login={user_login}
                    userBlocked={userBlocked}
                />}

                <header className="w-full h-12 pb-1 pt-1 sticky cursor-pointer bg-blue-gray-100 flex items-center justify-between overflow-hidden">
                    <div className='flex items-center w-full' onClick={() => setStatusInfoUser(true)}>
                        <img
                            src={user_clicked?.photo ?? "https://b2n.ir/p33247"}
                            alt="This is the user profile"
                            className='rounded-full object-center bg-center p-0 m-0'
                            style={{ clipPath: 'circle(42% at 50% 50%)' }}
                            width='53'
                            draggable="false"
                        />
                        <span className='ml-2'>{user_clicked?.firstname} {user_clicked?.lastname}</span>
                    </div>
                    <p className='text-white bg-red-500 pt-2 h-12 whitespace-nowrap text-lg pr-2 pl-2' onClick={cliseChat}>
                        بستن چت
                    </p>
                </header>

                <section id='content-chats' className='w-full pb-16 bg-white border-spacing-3 overflow-y-scroll' style={{ height: '89vh' }}>
                    {ChatsDeferredValue?.map(item => (
                        <div key={item.id} className={`text-end flex text-white flex-col ${item.from === user_login.find(item => item).id ? 'items-end' : 'items-start'}`}>
                            <p className={`w-2/4 mt-8 rounded-t-md p-2 ml-2 mr-2 ${item.from === user_login.find(item => item).id ? 'bg-blue-600' : 'bg-green-600'}`}
                            >
                                {item.text}
                            </p>
                            <hr className='opacity-23' />
                            <section className={`w-2/4 pt-2 pr-2 pl-2 flex justify-between rounded-b-md ml-2 mr-2 ${item.from === user_login?.find(item => item)?.id ? 'bg-blue-600' : 'bg-green-600'}`}>
                                <p className='text-white'>
                                    {item.from === user_login?.find(item => item)?.id && item.status === 1 ? '✓✓' :
                                        item.from === user_login?.find(item => item)?.id && item.status === 0 ? '✓' : null}
                                </p>
                                <p className='text-white'>
                                    {new Date(item.time).getHours()}
                                    <span className='text-md mr-1 ml-1' style={{ fontSize: '19px' }}>:</span>
                                    {new Date(item.time).getMinutes()}
                                </p>
                            </section>
                        </div>
                    ))}
                </section>

                <section className={`w-3/4 flex flex-row absolute bottom-0 bg-white ${statusInfoUser && 'hidden'}`} >
                    <textarea
                        type="text"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        id="small-input"
                        className="w-full block text-gray-900 bg-gray-50 rounded-none sm:text-lg focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white overflow-auto resize-none border-x border-gray-400" spellCheck={'false'} name="text" maxLength='900' rows="1"
                        disabled={userBlocked?.some(item => item.user_id_blocked === user_login?.find(item => item)?.id || item.user_id_blocked === user_clicked?.id)}
                        placeholder={userBlocked?.some(item => item.user_id_blocked === user_login?.find(item => item)?.id) ? 'این کاربر شما را مسدود کرده نمی توان پیامی ارسال کرد' : undefined
                        }
                    />

                    <Button variant="filled" className='w-max rounded-none border-lg border-white' onClick={handleSendMessage} disabled={value ? false : true}>Send</Button>
                </section>
            </Fragment>
        )
    }
}
