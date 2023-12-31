import { categories } from "../../../App";

type Props = {};

const ExpenseForm = ({}: Props) => {
  return (
    <div className="mb-5">
      <form>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input type="text" className="form-control" id="description" />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input className="form-control" id="amount" type="number" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select className="form-select" name="categories" id="">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
