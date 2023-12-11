import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io("/");
console.log(socket);

function App() {
	const [message, setMessage] = useState([] as any);
	const [messages, setMessages] = useState([] as any);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		const newMessage = {
			body: message,
			from: "Me",
		};

		setMessages([...messages, newMessage]);
		socket.emit("message", message);
	};

	useEffect(() => {
		socket.on("message", receiveMessage);

		return () => {
			socket.off("message", receiveMessage);
		};
	}, []);

	const receiveMessage = (message: string) => {
		setMessages((state: any) => [...state, message]);
	};

	return (
		<div className=" h-screen  bg-zinc-800 text-white flex items-center justify-center ">
			<form onSubmit={handleSubmit} className=" bg-zinc-900 p-10 ">
				<h1 className="text-2xl font-bold my-2">Chat React</h1>
				<input
					type="text"
					placeholder="Write you message"
					onChange={(e) => setMessage(e.target.value)}
					className="border-2 border-zinc-500 p-2 w-full text-black"
				/>
				<button> Send message </button>
				<ul>
					{messages.map((message: any, index: number) => {
						return (
							<li
								className={`my-2 p-2 table text-sm rounded-md shadow-lg ${
									message.from === "Me"
										? "bg-emerald-700 shadow-emerald-900 ml-auto"
										: "bg-sky-700 shadow-sky-900 mr-auto"
								}
								
									transition ease-in-out translate-x-2 delay-150 duration-500`}
								key={index}
							>{`${message.from}: ${message.body}`}</li>
						);
					})}
				</ul>
			</form>
		</div>
	);
}
export default App;
