import { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [myNumber, setMyPhone] = useState("");
    const [myMsg, setMymsg] = useState("");
    const [myUsers, setmyUsers] = useState([]);
    const [mySocket, setmySocket] = useState<WebSocket | null>(null);
    const [chats, setchats] = useState<{ message: string, from: string }[] | null>(null);
    const pNumber = localStorage.getItem('phoneNumber');
    useEffect(() => {
        const pNumber = localStorage.getItem('phoneNumber');
        const socket = new WebSocket(`ws://localhost:3003?phoneNumber=${pNumber}`);
        console.log("Socket", socket);
        socket.addEventListener('message', (event) => {
            console.log("myNumber", pNumber);
            console.log("Selected Number", myNumber);
            const response = JSON.parse(event.data);
            console.log("response", response, "--", myNumber);
            if (response?.from === myNumber) {
                setchats([...chats!, { message: response?.message, from: myNumber }])
            }
        });setmySocket(socket);
    }, [])
    useEffect(() => {
        const getdata = async () => {
            await axios.get('http://localhost:3003/allUsers')
                .then((res) => { console.log("res", res); setmyUsers(res?.data?.allUsers) })
                .catch((err) => { console.log("res", err) });
        }
        getdata();
    }, []);

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("in Send msg", mySocket);
        const newMessage = {
            message: `${myMsg}`,
            type: 'text',
            to: `${myNumber}`,
            from: `${pNumber}`,
        }
        const again = JSON.stringify(newMessage);
        console.log("chats", chats);
        if (mySocket) {
            console.log("in my socket");
            mySocket.send(again);
        }
        if (chats?.length) {
            setchats([...chats!, { message: newMessage?.message, from: pNumber! }])
        }
        else {
            setchats([{ message: newMessage?.message, from: pNumber! }])
        }
    }
    const handleChat = async (value: string) => {
        setMyPhone(value);
        console.log("myNumber", pNumber);
            console.log("Selected Number", myNumber);
        try {
            console.log("numbers", myNumber, pNumber);
            const res = await axios.get(`http://localhost:3003/getChats?to=${value}&from=${pNumber}`)
            console.log(res.data);
            if(res.data){
                setchats(res.data.messages);
            }
            else{setchats([]);}
        } catch (error) {
            console.log("error", error);
        }
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '20%' }}>
                {
                    myUsers?.map((users: { name: string, _id: string, phoneNumber: string }) => {
                        return (
                            <ul role="list" className="divide-y divide-gray-100" key={users._id}>
                                <li className="flex justify-between gap-x-6 py-5">
                                    <button className="flex min-w-0 gap-x-4" onClick={(e) => { 
                                        e.preventDefault();   
                                        handleChat(users.phoneNumber) }}>
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{users?.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{users?.phoneNumber}</p>
                                            {pNumber==users.phoneNumber&&<p>YOU</p>}
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        )
                    })
                }
            </div>
            <div style={{ width: '30%' }}>
                {
                    chats?.map((item, index) => {
                        return (
                            <ul key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ display: 'flex', alignItems: 'center', justifyContent: `${item.from === pNumber ? 'flex-end' : 'flex-start'}` }}>{item?.message}</p>
                            </ul>
                        )
                    })
                }
                <div>
                    <input type="text" placeholder='Send Your Message' onChange={(e) => { setMymsg(e.target.value) }} />
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

export default Chat