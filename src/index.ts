import Config from "./app";

class Server extends Config {
    public listen(){
        this.app.listen(4000, ()=>{
            console.log("Server run in the port 4000");
        })
    }
}

new Server().listen()