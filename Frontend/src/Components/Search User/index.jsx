import { useState, useEffect, startTransition, useDeferredValue, Fragment } from 'react'
import { Card } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
// Redux
import { User_Clicked } from '../../Redux/Action/Creator'
// Component
import Cards from '../Cards'










export default function Search_User({ socket }) {
    const [value, setValue] = useState('')
    const user_login = useSelector(state => state.Reducer.Login)
    const Dispatch = useDispatch()
    const [getUsersFind, setGetUsersFind] = useState([])
    const getUsersFindDeferredValue = useDeferredValue(getUsersFind)

    //* When find user and click on cards in box
    const handleClickOnUser = (idUser) => {
        Dispatch(User_Clicked(idUser))
        setGetUsersFind([])
        setValue('')
    }

    //* When type username in search box
    useEffect(() => {
        socket.emit('findone', value)
        socket.on('resultFindone', (result) => startTransition(() => setGetUsersFind(result)))
    }, [value])








    return (
        <div className='w-screen overflow-x-hidden border-b'>
            <section className='flex items-center'>
                <div className="absolute left-0 pl-3">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="search" value={value} onChange={(event) => setValue(event.target.value)} id="default-search" className="w-screen block p-4 pl-10 rounded-none text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 left-0 border-0" placeholder="Search User with username" spellCheck={'false'} />
            </section>


            {/* When find user */}
            {getUsersFindDeferredValue.length !== 0 &&
                <section className='w-full h-screen absolute left-0 bg-white overflow-y-auto p-2 z-50'>
                    {getUsersFindDeferredValue?.map(item =>
                        <Cards key={item.id} item={item} handleClickOnUser={handleClickOnUser} />
                    )}
                </section>
            }
        </div>
    )
}