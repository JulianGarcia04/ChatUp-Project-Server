import Config from './app';
import { MongodbConnection } from 'common';

class Server extends Config {
  private readonly _PORT: number;
  constructor() {
    super();
    this._PORT = this.app.get('PORT');
  }

  public listen(): void {
    MongodbConnection.connect()
      .then(() => {
        this.app.listen(this._PORT, () => {
          console.log(`Server run in the port ${this._PORT}`);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
}

new Server().listen();
