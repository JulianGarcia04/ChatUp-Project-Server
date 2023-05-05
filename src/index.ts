import Config from './app';
import { MongodbConnection } from 'src/common';

class Server extends Config {
  private readonly _PORT: number;
  constructor() {
    super();
    this._PORT = this.app.get('PORT');
  }

  public listen(): void {
    MongodbConnection.connect()
      .then(() => {
        this.app
          .listen(this._PORT, () => {
            console.log(`Server run in the port ${this._PORT}`);
          })
          .on('error', err => {
            if (err.name === 'EADDRINUSE') {
              console.log(
                `The port is in use, try to run the server with the port ${
                  this._PORT + 1
                }`,
              );
              this.app.listen(this._PORT + 1, () => {
                console.log(`Server run in the port ${this._PORT + 1}`);
              });
            } else {
              console.log(err);
            }
          });
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export const server = new Server();

server.listen();
