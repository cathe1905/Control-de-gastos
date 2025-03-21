import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {
  const { state, available, expensed, dispatch } = useBudget();

  const percentage= +((expensed / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage === 100 ?  '#DC2626': '#3b82f6',
          trailColor: '#F5F5F5',
          textSize: 8,
          textColor: percentage === 100 ?  '#DC2626': '#3b82f6'
        })}
        value={percentage}
        text={`${percentage}% gastado`}
         />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          onClick={() => dispatch({type:'restart'})}
          className="bg-pink-600 p-2 w-full text-white uppercase font-bold rounded-lg"
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget}/>
        <AmountDisplay label="Gastado" amount={expensed}/>
        <AmountDisplay label="Disponible" amount={available}/>
      </div>
    </div>
  );
}
