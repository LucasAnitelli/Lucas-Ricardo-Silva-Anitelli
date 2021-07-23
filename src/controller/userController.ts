import { ResponseUser } from "../dto/login";
import { getLoginAuth } from "../services/apiService";


export const getAuthLoginController = async (user: string) => {
    try{
        const response = await getLoginAuth(user);
        if(response) {
            const result: ResponseUser = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}