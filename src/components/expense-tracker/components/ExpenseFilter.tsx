import { categories } from "../../../App";

type Props = {
  onSelectCategory: (category: string) => void;
};

const ExpenseFilter = ({ onSelectCategory }: Props) => {
  return (
    <div className="mb-3">
      <select
        name="categories"
        className="form-select"
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
