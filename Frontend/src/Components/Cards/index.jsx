import React from 'react'
import { Card } from 'flowbite-react'










export default function Cards({ item, handleClickOnUser, countChatNotRead, setStatusInfoUser }) {
    return (
        <Card className='w-full overflow-hidden mb-3' onClick={() => setStatusInfoUser(false)}>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 p-0 m-0">
                    <section className='w-full flex justify-between items-center p-0 m-0 hover:cursor-pointer relative' onClick={() => handleClickOnUser(item)}>
                        <li className="block py-3 sm:py-4">
                            <div className="sm:block lg:flex items-center sm:space-x-0 lg:sm:space-x-4">
                                <div id='cardProfilePicture' className='overflow-hidden'>
                                    <img
                                        id="CardsProfile"
                                        src={!item.photo ? "https://b2n.ir/m07009" : item.photo}
                                        alt="Neil image"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <>
                                        <span className="truncate sm:text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                                            {item.firstname}  &nbsp;
                                        </span>
                                        <span className="truncate sm:text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                                            {item.lastname}
                                        </span>
                                    </>
                                    <p className="truncate sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                                        {item.username}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <div className='flex absolute top-0 right-0 flex-row-reverse select-none '>
                            {item.status === 'online' ?
                                <p className='text-green-600'>Online</p>
                                :
                                <p className='text-red-600'>Offline</p>
                            }
                        </div>
                    </section>
                    {countChatNotRead?.map((itemm) =>
                        <p key={itemm.from} className='text-center bg-purple-600 text-white text-xl'>
                            {itemm.from === item.id && itemm.CountMsgNotRead}
                        </p>
                    )}
                </ul>
            </div>
        </Card>
    )
}