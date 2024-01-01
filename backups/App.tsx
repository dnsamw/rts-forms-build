// import { useState } from "react";
// import ExpenseList from "./components/expense-tracker/components/ExpenseList";
// import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
// import ExpenseForm, {
//   ExpenseFormData,
// } from "./components/expense-tracker/components/ExpenseForm";

// function App() {
//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "Electricity", amount: 2500, category: "Utilities" },
//     { id: 2, description: "Rice", amount: 2500, category: "Groceries" },
//     { id: 3, description: "Telephone", amount: 1500, category: "Utilities" },
//     { id: 4, description: "Movie", amount: 150, category: "Entertainment" },
//   ]);

//   const [selectedCategory, setSelectedCategory] = useState("");

//   const visibleExpenses = selectedCategory
//     ? expenses.filter((expense) => expense.category === selectedCategory)
//     : expenses;

//   const handleDelete = (id: number) => {
//     setExpenses(expenses.filter((expense) => expense.id !== id));
//   };
//   const handleSelectCategory = (category: string) => {
//     setSelectedCategory(category);
//   };

//   const handleSubmit = (expense: ExpenseFormData) => {
//     setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
//   };

//   return (
//     <div>
//       <ExpenseForm onSubmit={handleSubmit} />
//       <ExpenseFilter onSelectCategory={handleSelectCategory} />
//       <ExpenseList expenses={visibleExpenses} onDelete={handleDelete} />
//     </div>
//   );
// }

// export default App;
