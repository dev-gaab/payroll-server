const app = require('./app');
// const config = require('./config');
import config from "./config";


app.listen(config.port, () => {
    console.log(`api rest corriendo en http://localhost:${config.port}`);    
});
