import { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  const deleteUser = (u: User) => {
    const originalUsers = [...users];
    const newUsers = users.filter((user) => user.id !== u.id);
    setUsers(newUsers);

    userService.deleteUser(u.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = {
      id: 0,
      name: "Jimmy McGill",
    };

    setUsers([newUser, ...users]);

    userService
      .addUser(newUser)
      .then(({ data: addedUser }) => {
        setError("");
        setUsers([addedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = (user: User) => {
    const originarUsers = [...users];
    const updatedUser = { ...user, name: user.name + "*" };
    setUsers(users.map((u) => (user.id === u.id ? updatedUser : u)));

    userService
      .updateUser(updatedUser)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originarUsers);
      });
  };

  return (
    <div>
      <h4 className="mb-3">Calling backend Services</h4>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add user
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            className="list-group-item list-group-item-action d-flex justify-content-between"
            key={user.id}
          >
            {user.name}{" "}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger mx-1"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
