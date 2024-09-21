// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = ({ setToken }) => {
//   const [form, setForm] = useState({ username: '', password: '' });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', form);
//       setToken(response.data.token);
//       localStorage.setItem('token', response.data.token);
//     } catch (err) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="text"
//         value={form.username}
//         onChange={(e) => setForm({ ...form, username: e.target.value })}
//         placeholder="Username"
//         className="w-full p-2 mb-2 border"
//       />
//       <input
//         type="password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         placeholder="Password"
//         className="w-full p-2 mb-2 border"
//       />
//       <button type="submit" className="p-2 text-white bg-blue-500">Login</button>
//     </form>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', form);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/admin');  // Redirect to admin page after successful login
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin} className="container max-w-sm p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Admin Login</h1>
      <input
        type="text"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
        className="w-full p-2 mb-2 border"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
        className="w-full p-2 mb-2 border"
      />
      <button type="submit" className="w-full p-2 text-white bg-blue-500">Login</button>
    </form>
  );
};

export default Login;

