import { Expense } from "../types";
import { formatDate } from "../helpers/index.";
import AmountDisplay from "./AmountDisplay";
import { useMemo } from "react";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";


type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const category = useMemo(
    () => categories.filter((item) => item.id === expense.category)[0],
    [expense]
  );

  const {dispatch} = useBudget()

  const leadinActionF = () =>(
    <LeadingActions>
      <SwipeAction
      onClick={() => dispatch({type: 'get-expense-by-id', payload:{id: expense.id}})}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActionF = () =>(
    <TrailingActions>
      <SwipeAction
      onClick={() => dispatch({type:"delete-expense", payload: {id: expense.id}})}
      destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={1} leadingActions={leadinActionF()} trailingActions={trailingActionF()}>
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${category.icon}.svg`}
              alt="icon gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p>{category.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
