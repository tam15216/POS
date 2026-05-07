import { useState } from 'react';

import { registerApi } from '../api/auth.api';

export default function Register() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await registerApi(form);

      console.log(res.data);

      alert('Register Success');

    } catch (err) {

      console.error(err);

      alert('Register Failed');
    }
  };

  return (

    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />

        <button type="submit">

          Register

        </button>

      </form>

    </div>
  );
}