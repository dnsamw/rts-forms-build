import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type Props = {};

const schema = z.object({
  id: z.number().optional(),
  description: z.string().min(3),
  amount: z.number({ invalid_type_error: "amount field is required!" }).min(1),
  category: z.string(),
});

type FormData = z.infer<typeof schema>;

function ExpenseTrackerForm({}: Props) {
  const [expenses, setExpenses] = useState<FormData[] | FieldValues[]>([
    { id: 1, description: "Electricity", amount: 2500, category: "Utilities" },
    { id: 2, description: "Rice", amount: 2500, category: "Groceries" },
    { id: 3, description: "Telephone", amount: 1500, category: "Utilities" },
    {
      id: 4,
      description: "Movie",
      amount: 1500,
      category: "Entertainment",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredExpenses: FormData[] | FieldValues[] =
    selectedCategory !== "All Categories"
      ? expenses.filter((expense) => expense.category === selectedCategory)
      : expenses;

  console.log(filteredExpenses);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    data.id = expenses.length + 1;
    const newExpenses = [...expenses, data];
    setExpenses(newExpenses);
  };

  const handleDeleteExpense = (id: number) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const handleCategoryChange = (category: any) => {
    const selectedCategory = category.target.value;
    setSelectedCategory(selectedCategory);
  };
  return (
    <>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select {...register("category")} className="form-select">
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <div className="visualize pt-3" onChange={(e) => handleCategoryChange(e)}>
        <select className="form-select">
          <option selected value="All Categories">
            All Categories
          </option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <div className="pt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.category}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ExpenseTrackerForm;
