/* eslint-disable react-hooks/exhaustive-deps */
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { DrafExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const { dispatch, state, available } = useBudget();
  const [previousAmaount, setPreviousAmount] = useState(0)
  const [expense, setExpense] = useState<DrafExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const handleDate = (value: Value) => {
    setExpense({ ...expense, date: value });
  };

  useEffect(() => {
    if (state.editingId) {
      const elementToEdit = state.expenses.find(
        (item) => item.id === state.editingId
      );
      setExpense(elementToEdit!);
      setPreviousAmount(elementToEdit!.amount)
    }
  }, [state.editingId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({ ...expense, [name]: isAmountField ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if ((expense.amount - previousAmaount )> available) {
      setError("Estas sobrepasando tu presupuesto");
      return;
    }

    if (state.editingId) {
      dispatch({type:'update-expense', payload:{expense: {id: state.editingId, ...expense}}})
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }
    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
    setPreviousAmount(0)
 
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingId ? 'Editar gasto' : 'Nuevo gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre gasto:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          className="bg-slate-100 p-2"
          placeholder="Añade el nombre del gasto"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="bg-slate-100 p-2"
          placeholder="Añade la cantidad del gasto: ej. 300"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          value={expense.category}
          className="bg-slate-100 p-2"
          name="category"
          id="category"
          onChange={handleChange}
        >
          <option value="">Seleccione</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl">
          Fecha gasto:
        </label>
        <DatePicker
          className="bg-slate"
          value={expense.date}
          onChange={handleDate}
        />
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? "Guardar cambios" : "Registrar gasto" }
      />
    </form>
  );
}
