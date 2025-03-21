import { Category, DrafExpense, Expense } from "../types"
import {v4 as uuidv4 } from 'uuid'

export type BudgetActions = 
{type: "add-budget", payload: { budget: number }} |
{type: "show-modal"} |
{type: "close-modal"}|
{type: "add-expense", payload: {expense: DrafExpense}} |
{type: "delete-expense" , payload:{id: Expense['id']}} |
{type: "get-expense-by-id" , payload:{id: Expense['id']}}|
{type: "update-expense", payload: {expense: Expense}} | 
{type: "restart"} |
{type: "add-filter-category", payload: {id: Category['id']}}


const getDataLocalStorage= () : Expense[] => {
    const data= localStorage.getItem('expenses')
    return data ? JSON.parse(data) : []
} 

const getBudget = () =>{
    const budgetLocalStorage= localStorage.getItem('budget')
    return budgetLocalStorage ? +budgetLocalStorage : 0
}


export type BudgetState = {
    budget: number
    modal:boolean
    expenses: Expense[]
    editingId: Expense['id']
    categoryId: Category['id']
}

export const initialState : BudgetState = {
    budget: getBudget(),
    modal:false,
    expenses: getDataLocalStorage(),
    editingId: '',
    categoryId: ''
}

const createExpense = (DrafExpense: DrafExpense) : Expense =>{
    return {...DrafExpense, id: uuidv4()}
}

export const budgetReducer = (state: BudgetState = initialState, action: BudgetActions) => {
    if(action.type === "add-budget"){
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === "show-modal"){
        return {
            ...state,
            modal: true
        } 
    }

    if(action.type === "close-modal"){
        return {
            ...state,
            modal: false,
            editingId:""
        } 
    }

    if(action.type === "add-expense"){
        const expenseWithId= createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expenseWithId],
            modal:false
        }
    }

    if(action.type === "delete-expense"){
        const expenseFiltered= state.expenses.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            expenses: expenseFiltered,
        }
    }
    if(action.type === 'get-expense-by-id'){
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if(action.type === 'update-expense'){
        const newExpenses= state.expenses.map(item => item.id === state.editingId ? action.payload.expense : item)
        return {
            ...state,
            expenses: newExpenses,
            modal: false,
            editingId:""
        }
    }
    if(action.type === 'restart'){
        return {
            budget:0,
            expenses: [],
            modal: false,
            editingId:"",
            categoryId: ""
        }
    }
    if(action.type === 'add-filter-category'){
        return {
            ...state,
            categoryId: action.payload.id
        }
    }

    return state;

   

}
