import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
    const {state} = useBudget()

    const filteredExpenses= state.categoryId ? state.expenses.filter(item => item.category === state.categoryId) : state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
    <div>
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
            <>
             <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos</p>
             {filteredExpenses.map(expense => (
                  <ExpenseDetail
                  key={expense.id}
                  expense={expense}
                  />
             ))}
           
            </>
           
        )}
    </div>
  )
}
