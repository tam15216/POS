import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateUserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import { getUsers, toggleUser } from "../services/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      setError("");
      await toggleUser(id);

      loadUsers();
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className="space-y-8">
      <CreateUserForm onSuccess={loadUsers} />

      {error && (
        <div className="px-4 py-3 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
          {error}
        </div>
      )}
      <UserTable users={users} onToggle={handleToggle} />
    </div>
  );
}
