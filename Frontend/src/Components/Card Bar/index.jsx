import { useState, useDeferredValue, useEffect, startTransition } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User_Clicked } from '../../Redux/Action/Creator'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react"
// Component
import Cards from '../Cards'











const Card_Bar = ({ socket, setStatusInfoUser }) => {
    const Dispatch = useDispatch()
    const user_login = useSelector(state => state.Reducer.Login)
    const [usersHaveChated, setHaveusersHaveChated] = useState([])
    const [countChatNotRead, setCountChatNotRead] = useState(null)
    const HavechatwithDeferredValue = useDeferredValue(usersHaveChated)
    const [user_clicked, setUser_clicked] = useState(0)


    useEffect(() => {
        //* Users that have chat with
        socket.emit('haveChatWith', user_login?.find(item => item)?.id)

        //* Result -- Users that have chat with
        socket.on('ResultHavechatwith', (result) => startTransition(() => setHaveusersHaveChated(result)))

        //* Count messages that not read of any user have chat with
        socket.emit('count_messages_not_read', user_login?.find(item => item)?.id)

        //* Result -- Count messages that not read of any user have chat with
        socket.on('Result_count_messages_not_read', (result) => startTransition(() => {
            setCountChatNotRead(result)
        }))
    }, [usersHaveChated])

    //* Click on cards
    const handleClickOnUser = (idUser) => {
        setUser_clicked(idUser)
        Dispatch(User_Clicked(idUser))
    }







    //* Tabs 
    const data = [
        {
            label: "چت ها",
            value: "chats",
            desc: HavechatwithDeferredValue?.map((item) =>
                <Cards
                    item={item}
                    handleClickOnUser={handleClickOnUser}
                    countChatNotRead={countChatNotRead}
                    setStatusInfoUser={setStatusInfoUser}
                    key={item.id}
                />
            )
        },
        {
            label: "گروه ها",
            value: "groups",
            desc: `این قسمت تکمیل نشده است.`,
        }
    ]




    return (
        <Tabs id="custom-animation" value="chats">
            <TabsHeader onClick={() => setStatusInfoUser(false)}>
                {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody animate={{ mount: { y: 0 }, unmount: { y: 40 } }}>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    )
}


export default Card_Bar