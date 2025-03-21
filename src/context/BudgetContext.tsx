import { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  budgetReducer,
  BudgetState,
  initialState,
  BudgetActions,
} from "../reducers/budgetReducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
  expensed: number
  available: number
};
export const BudgetContext = createContext<BudgetContextProps>(null!);

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const expensed = useMemo(
    () => state?.expenses.reduce((total, item) => total + item.amount, 0),
    [state?.expenses]
  );
  const available = state.budget - expensed;

  return (
    <BudgetContext.Provider 
    value={{ 
        state, 
        dispatch,
        expensed,
        available,
        }}>
      {children}
    </BudgetContext.Provider>
  );
};
