import Config from './app';

class Server extends Config {
  private readonly _PORT: number;
  constructor() {
    super();
    this._PORT = this.app.get('PORT');
  }

  public listen(): void {
    this.app.listen(this._PORT, () => {
      console.log(`Server run in the port ${this._PORT}`);
    });
  }
}

new Server().listen();
