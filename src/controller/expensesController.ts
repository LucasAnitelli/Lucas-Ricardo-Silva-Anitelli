import { ListExpensesDTO, ResponseDTO } from "../dto/listExpenses";
import { addExpenses, deleteExpenses, editExpenses, getListExpenses, getSearchExpenses } from "../services/apiService";



export const getListExpensesController = async (page: number, perPage: number) => {
    try{
        const response = await getListExpenses(page, perPage);
        if(response) {
            const result: ListExpensesDTO[] = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}

export const deleteExpensesController = async (_id:string) => {
    try{
        const response = await deleteExpenses(_id);
        if(response) {
            const result: ListExpensesDTO = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}

export const addExpensesController = async (data: ListExpensesDTO) => {
    try{
        const response:ResponseDTO = await addExpenses(data);
        if(response.error) {
            return null;
        } else {
            const result = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}

export const editExpensesController = async (_id: string, data: ListExpensesDTO) => {
    try{
        const response:ResponseDTO = await editExpenses(_id, data);
        if(response.error) {
            return null;
        } else {
            const result = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}
export const getSearchExpensesController = async (_id: string) => {
    try{
        const response = await getSearchExpenses(_id);
        if(response.error) {
            return null;
        } else {
            const result: ListExpensesDTO = response;
            return result;
        }
    } catch (error){
        console.log('error', error);
        return null;
    }
}



