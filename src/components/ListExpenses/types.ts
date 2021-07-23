import { ListExpensesDTO } from "../../dto/listExpenses";

export interface ListProps {
    handleRemove: () => void;
    handleEdit: () => void;
    postExpenses: ListExpensesDTO;
}