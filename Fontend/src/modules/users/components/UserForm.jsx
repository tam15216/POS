import { useState } from "react";
import { registerSchema } from "../validations/user.schema";
import { createUser } from "../services/user.service";

export default function CreateUserForm({onSuccess}) {
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError({});
    setSuccess("");

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.flatten().fieldErrors);
      return;
    }

    try {
      setLoading(true);

      await createUser(result.data);
      onSuccess();

      setSuccess("สร้างผู้ใช้งานสำเร็จ");

      setForm({
        username: "",
        full_name: "",
        password: "",
        role: "",
      });
    } catch (err) {
      const message = err?.response?.data?.error || "Create user failed";

      setError({
        general: [message],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-purple-700">เพิ่มผู้ใช้งาน</h1>

        <p className="mt-3 text-gray-400">
          สร้างบัญชีสำหรับพนักงานและผู้ดูแลระบบ
        </p>
      </div>

      {/* General Error */}
      {error.general && (
        <div className="px-4 py-3 mb-6 text-sm text-red-700 border border-red-200 bg-red-50 rounded-xl">
          {error.general[0]}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="px-4 py-3 mb-6 text-sm text-green-700 border border-green-200 bg-green-50 rounded-xl">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Username */}
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-700 ">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="กรอก Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          />

          {error.username && (
            <p className="mt-2 text-sm text-red-500">{error.username[0]}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-700 ">
            ชื่อ - นามสกุล
          </label>

          <input
            type="text"
            name="full_name"
            placeholder="กรอกชื่อ - นามสกุล"
            value={form.full_name}
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          />

          {error.full_name && (
            <p className="mt-2 text-sm text-red-500">{error.full_name[0]}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-700 ">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="กรอก Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          />

          {error.password && (
            <p className="mt-2 text-sm text-red-500">{error.password[0]}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-sm font-medium text-purple-700 ">
            สิทธิ์การใช้งาน
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 text-gray-700 transition border border-purple-200 outline-none rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
          >
            <option value="">เลือกสิทธิ์</option>

            <option value="admin">Admin</option>

            <option value="cashier">Cashier</option>

            <option value="stock">Stock</option>
          </select>

          {error.role && (
            <p className="mt-2 text-sm text-red-500">{error.role[0]}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600 disabled:bg-purple-300"
          >
            {loading ? "Loading..." : "เพิ่มผู้ใช้งาน"}
          </button>
        </div>
      </form>
    </div>
  );
}
