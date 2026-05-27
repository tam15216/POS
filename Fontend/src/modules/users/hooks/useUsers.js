import { useEffect, useState } from "react";

import { getUsers, createUser, toggleUser } from "../services/user.service";

export default function useUsers() {
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

  const addUser = async (data) => {
    try {
      await createUser(data);

      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await toggleUser(id);

      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    users,
    loading,
    addUser,
    toggleStatus,
  };
}
