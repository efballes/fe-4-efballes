import Socket from "./Socket";
import { baseUrl, idmEPs } from "../config/config.json";
import Gateway from "./Gateway";

export async function LogOrReg(email, password, isNewUser) {
    const options = {
        baseURL: baseUrl, 
        url: ( 
            (!isNewUser) ? 
                idmEPs.loginEP : 
                idmEPs.registerEP ), 
        data: { 
            email: email, 
            password: password.split("") 
        }
    };
    console.log(options);
    const response = await Socket.POST(options);
    console.log(response);
    return await Gateway.getReport(response);
}

export default {
    LogOrReg
};