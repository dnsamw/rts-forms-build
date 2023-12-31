import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../../categories";

type Props = {
  onSubmit: (data: ExpenseFormData) => void;
};

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "description must be atleast 3 characters long!" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "amount field is required!" })
    .min(0.01)
    .max(100_100),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required!" }),
  }),
});

export type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <div className="mb-5">
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            type="text"
            className="form-control"
            id="description"
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
            className="form-control"
            id="amount"
            type="number"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            {...register("category")}
            className="form-select"
            name="categories"
            id="categories"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button disabled={!isValid} className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
