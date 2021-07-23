import AsyncStorage from "@react-native-community/async-storage";
import { ListExpensesDTO } from "../dto/listExpenses";

export const baseUrl = 'https://sofit-mobile-challenge.herokuapp.com/';

export const header = async (method?: string) => {
    const storagToken = await AsyncStorage.getItem('@TestAuth:token');
    return {
        method: `${method}`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + storagToken,
        },
    };
}

export const headerBody = async (method: string, data: ListExpensesDTO) => {
    const storagToken = await AsyncStorage.getItem('@TestAuth:token');
    return {
        method: `${method}`,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + storagToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
}

export const getLoginAuth = async(user: string) => {
    try{
        const result = await fetch(`${baseUrl}start/${user}`);
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

export const getListExpenses = async(page: number, perPage: number) => {
    try{
        const result = await fetch(`${baseUrl}expenses?page=${page}&perPage=${perPage}`, await header('GET'));
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

export const deleteExpenses = async(_id: string) => {
    try{
        const result = await fetch(`${baseUrl}expenses/${_id}`, await header('DELETE'));
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

export const addExpenses = async(data: ListExpensesDTO) => {
    try{
        const result = await fetch(`${baseUrl}expenses`, await headerBody('POST', data));
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

export const editExpenses = async(_id: string, data: ListExpensesDTO) => {
    try{
        const result = await fetch(`${baseUrl}expenses/${_id}`, await headerBody('PUT', data));
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

export const getSearchExpenses = async(_id: string) => {
    try{
        const result = await fetch(`${baseUrl}expenses/${_id}`, await header('GET'));
        if(result)
        return await result.json();
    } catch(error) {
     console.log('error', error);
     return null;   
    }
}

