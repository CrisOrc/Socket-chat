import "./App.css";
import io from "socket.io-client";

const socket = io("httpd://localhost:4000");
console.log(socket);

function App() {
	return <div>App</div>;
}
export default App;
