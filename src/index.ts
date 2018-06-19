const app = require('./app');
import config from "./config";


app.listen(config.port, () => {
    console.log(`api rest corriendo en http://localhost:${config.port}`);    
});
