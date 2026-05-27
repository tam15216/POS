import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateUserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import { getUsers } from "../services/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

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

   return (

    <div className="space-y-8">

      <CreateUserForm
        onSuccess={loadUsers}
      />

      <UserTable
        users={users}
      />

    </div>
  );
}
