import Config from './app';
import { MongodbConnection } from 'src/common';
import config from './config';
import type http from 'http';

class Server extends Config {
  private readonly _PORT: number;
  private _listener?: http.Server;

  constructor() {
    super();
    this._PORT = Number(this.app.get('PORT'));
  }

  public get listener(): http.Server | undefined {
    return this._listener;
  }

  public listen(): void {
    MongodbConnection.connect()
      .then(() => {
        this._listener = this.app
          .listen(this._PORT, () => {
            if (config.ENVIROMENT === 'test') {
              return;
            }
            console.log(`Server run in the port ${this._PORT}`);
          })
          .on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              console.log(
                `The port is in use, try to run the server with the port ${
                  this._PORT + 1
                }`,
              );
              this._listener = this.app.listen(this._PORT + 1, () => {
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
