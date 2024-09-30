import http from "http";
import SocketService from "./services/socket";

async function init(){
    const socketService = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000;
    
    httpServer.listen(PORT, () => {
        console.log(`HTTP Server is running on port ${PORT}`);
    });
    socketService.initListeners();
}
init();
