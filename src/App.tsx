import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <p>Calling backend Services</p>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item list-group-item-action"
            key={user.id}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
