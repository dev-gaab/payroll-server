import * as jwt from "jwt-simple";
import * as moment from "moment";
import config from "../config";

export function createToken(){
    const payload =  {
        sub: 4,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, config.SECRET_TOKEN);
}
