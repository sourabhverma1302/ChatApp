import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
    const myNumber = useRef("");
    const [myMsg, setMyMsg] = useState("");
    const [myUsers, setMyUsers] = useState([]);
    const [mySocket, setMySocket] = useState<WebSocket | null>(null);
    const [chats, setChats] = useState<{ message: string, from: string }[] | null>(null);
    const pNumber = localStorage.getItem('phoneNumber');
    const [isChatVisible, setIsChatVisible] = useState(false);// To track if chat is visible

    useEffect(() => {
        const socket = new WebSocket(`wss://chatapp-3.onrender.com?phoneNumber=${pNumber}`);
        socket.onopen = () => {
            socket.addEventListener('message', (event) => {
                const response = JSON.parse(event.data);
                console.log("coming message", response.message, "myNumber", myNumber, pNumber);
                if (response?.from == myNumber.current) {
                    setChats(prevChats => [...prevChats!,
                    { message: response?.message, from: myNumber.current }]);
                }
            });
        }
        setMySocket(socket);
        return () => {
            socket.close(); // Close the WebSocket connection on component unmount
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://chatapp-3.onrender.com/allUsers');
                setMyUsers(res?.data?.allUsers || []);
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        fetchData();
    }, []);

    const getChats = async (phoneNumber: string) => {
        console.log(myNumber.current);
        if (phoneNumber !== "" && pNumber !== "") {
            try {
                const res = await axios.get(`https://chatapp-3.onrender.com/getChats?to=${phoneNumber}&from=${pNumber}`);
                setChats(res.data?.messages || []);
                setIsChatVisible(true); // Show chat after fetching chats
            } catch (error) {
                console.log("Error fetching chats:", error);
                setChats([]);
            }
        }
    };

    const handleBack = () => {
        setIsChatVisible(false); // Hide chat and show users list
        setChats(null); // Clear chat messages
    };

    const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newMessage = {
            message: myMsg,
            type: 'text',
            to: myNumber.current,
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

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex w-11/12 md:w-3/4 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden h-4/5">

                {!isChatVisible && (
                    // Users List
                    <div className="w-full border-r border-gray-200 overflow-y-auto overflow-x-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Users</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {myUsers.map((user: { name: string, _id: string, phoneNumber: string }) => (
                                <div key={user._id} className="p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => {
                                        myNumber.current = user.phoneNumber;
                                        getChats(user.phoneNumber);
                                    }}>
                                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                                    {pNumber === user.phoneNumber && <p className="text-xs text-gray-500">YOU</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isChatVisible && (
                    // Chat Window
                    <div className="flex flex-col w-full overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <button onClick={handleBack} className="text-blue-600">&lt; Back</button>
                            <h2 className="text-lg font-semibold text-gray-800">Chat</h2>
                            <div></div>
                        </div>
                        <div className="px-4 py-6 space-y-3 overflow-y-auto overflow-x-hidden example">
                            {chats?.map((item, index) => (
                                <div key={index} className={`flex ${item.from === pNumber ? 'justify-end' : 'justify-start'}`}>
                                    <p className={`px-4 py-2 rounded-lg ${item.from === pNumber ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>
                                        {item?.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                                <input type="text" placeholder='Send Your Message' value={myMsg} onChange={(e) => { setMyMsg(e.target.value) }} className="flex-1 border border-gray-200 rounded-lg p-3 focus:outline-none" />
                                <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none">Send</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Chat;
