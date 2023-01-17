import express, {Express} from 'express';

abstract class Config {
    private _app:Express = express();
    constructor() {
        
    }

    public get app():Express{
        return this._app;
    }
}

export default Config;