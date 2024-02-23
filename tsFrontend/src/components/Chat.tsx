import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
    let myNumber = "";
    const [myMsg, setMyMsg] = useState("");
    const [myUsers, setMyUsers] = useState([]);
    const [mySocket, setMySocket] = useState<WebSocket | null>(null);
    const [chats, setChats] = useState<{ message: string, from: string }[] | null>(null);
    const pNumber = localStorage.getItem('phoneNumber');

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:3003?phoneNumber=${pNumber}`);
        setMySocket(socket);
        socket.addEventListener('message', (event) => {
            const response = JSON.parse(event.data);
            if (response?.from === myNumber) {
                setChats(prevChats => [...prevChats!, { message: response?.message, from: myNumber }]);
            }
        });

        return () => {
            socket.close(); // Close the WebSocket connection on component unmount
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3003/allUsers');
                setMyUsers(res?.data?.allUsers || []);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newMessage = {
            message: myMsg,
            type: 'text',
            to: myNumber,
            from: pNumber,
        };

        if (mySocket) {
            mySocket.send(JSON.stringify(newMessage));
        }

        if (chats?.length) {
            setChats([...chats, { message: newMessage.message, from: pNumber! }]);
        } else {
            setChats([{ message: newMessage.message, from: pNumber! }]);
        }

        setMyMsg(""); // Clear the message input after sending
    };

    const handleChat = async (value: string) => {
        myNumber = value;
        console.log("my", myNumber);
        try {
            const res = await axios.get(`http://localhost:3003/getChats?to=${value}&from=${pNumber}`);
            setChats(res.data?.messages || []);
        } catch (error) {
            console.log("Error fetching chats:", error);
            setChats([]);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '20%' }}>
                {myUsers.map((user: { name: string, _id: string, phoneNumber: string }) => (
                    <ul key={user._id} className="divide-y divide-gray-100">
                        <li className="flex justify-between gap-x-6 py-5">
                            <button className="flex min-w-0 gap-x-4" onClick={(e) => {
                                e.preventDefault();
                                handleChat(user.phoneNumber);
                            }}>
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.phoneNumber}</p>
                                    {pNumber === user.phoneNumber && <p>YOU</p>}
                                </div>
                            </button>
                        </li>
                    </ul>
                ))}
            </div>
            <div style={{ width: '30%' }}>
                {chats?.map((item, index) => (
                    <ul key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: `${item.from === pNumber ? 'flex-end' : 'flex-start'}` }}>{item?.message}</p>
                    </ul>
                ))}
                <div>
                    <input type="text" placeholder='Send Your Message' value={myMsg} onChange={(e) => { setMyMsg(e.target.value) }} />
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
