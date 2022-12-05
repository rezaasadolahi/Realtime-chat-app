import { useState } from 'react'
// Components
import Card_Bar from '../../Components/Card Bar'
import Environment_chat from '../../Components/Environment chat'







export default function Main({ socket }) {
    const [statusInfoUser, setStatusInfoUser] = useState(false)


    return (
        <main className='flex flex-row'>
            <section className='w-1/4 h-screen mr-3 bg-white overflow-y-auto'>
                <Card_Bar
                    socket={socket}
                    setStatusInfoUser={setStatusInfoUser}
                />
            </section>

            <aside className='w-3/4'>
                <Environment_chat
                    socket={socket}
                    setStatusInfoUser={setStatusInfoUser}
                    statusInfoUser={statusInfoUser}
                />
            </aside>
        </main>
    )
}