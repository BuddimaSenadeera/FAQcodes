


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminPage = () => {
//   const [faqs, setFaqs] = useState([]);
//   const [form, setForm] = useState({ question: '', answer: '' });
//   const [editId, setEditId] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');  // Redirect to login if not authenticated
//       return;
//     }
//     fetchFAQs();
//   }, [token]);

//   const fetchFAQs = async () => {
//     const response = await axios.get('http://localhost:5000/api/faqs');
//     setFaqs(response.data);
//   };

//   const handleAddEditFAQ = async (e) => {
//     e.preventDefault();
//     const headers = { Authorization: `Bearer ${token}` };
//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/faqs/${editId}`, form, { headers });
//       } else {
//         await axios.post('http://localhost:5000/api/faqs', form, { headers });
//       }
//       setForm({ question: '', answer: '' });
//       setEditId(null);
//       fetchFAQs();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add/edit FAQ. Ensure you are logged in.');
//     }
//   };

//   const handleEditClick = (faq) => {
//     setForm({ question: faq.question, answer: faq.answer });
//     setEditId(faq._id);
//   };

//   const handleDeleteFAQ = async (id) => {
//     const headers = { Authorization: `Bearer ${token}` };
//     try {
//       await axios.delete(`http://localhost:5000/api/faqs/${id}`, { headers });
//       fetchFAQs();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to delete FAQ. Ensure you are logged in.');
//     }
//   };

//   return (
//     <div className="container min-h-screen p-6 mx-auto bg-gray-50">
//       <h1 className="mb-8 text-4xl font-bold text-gray-800">Admin FAQ Management</h1>
//       <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-700">
//           {editId ? 'Edit FAQ' : 'Add New FAQ'}
//         </h2>
//         <form onSubmit={handleAddEditFAQ}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">Question</label>
//             <input
//               type="text"
//               value={form.question}
//               onChange={(e) => setForm({ ...form, question: e.target.value })}
//               placeholder="Enter the question"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">Answer</label>
//             <textarea
//               value={form.answer}
//               onChange={(e) => setForm({ ...form, answer: e.target.value })}
//               placeholder="Enter the answer"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//               required
//             ></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700"
//             >
//               {editId ? 'Save Changes' : 'Add FAQ'}
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <h2 className="mb-4 text-2xl font-semibold text-gray-700">All FAQs</h2>
//         {faqs.map((faq) => (
//           <div key={faq._id} className="flex items-center justify-between py-4 border-b border-gray-200">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
//               <p className="text-gray-600">{faq.answer}</p>
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 className="px-3 py-1 font-semibold text-white transition duration-200 ease-in-out bg-yellow-500 rounded-lg hover:bg-yellow-600"
//                 onClick={() => handleEditClick(faq)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="px-3 py-1 font-semibold text-white transition duration-200 ease-in-out bg-red-600 rounded-lg hover:bg-red-700"
//                 onClick={() => handleDeleteFAQ(faq._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '' });
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      fetchFAQs();
    }
  }, [token, navigate]);

  const fetchFAQs = async () => {
    const response = await axios.get('http://localhost:5000/api/faqs');
    setFaqs(response.data);
  };

  const handleAddEditFAQ = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/faqs/${editId}`, form, { headers });
      } else {
        await axios.post('http://localhost:5000/api/faqs', form, { headers });
      }
      setForm({ question: '', answer: '' });
      setEditId(null);
      fetchFAQs();
    } catch (err) {
      console.error(err);
      alert('Failed to add/edit FAQ. Ensure you are logged in.');
    }
  };

  const handleEditClick = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq._id);
  };

  const handleDeleteFAQ = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(`http://localhost:5000/api/faqs/${id}`, { headers });
      fetchFAQs();
    } catch (err) {
      console.error(err);
      alert('Failed to delete FAQ. Ensure you are logged in.');
    }
  };

  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-50">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">Admin FAQ Management</h1>
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          {editId ? 'Edit FAQ' : 'Add New FAQ'}
        </h2>
        <form onSubmit={handleAddEditFAQ}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Question</label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Enter the question"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Answer</label>
            <textarea
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              placeholder="Enter the answer"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {editId ? 'Save Changes' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">All FAQs</h2>
        {faqs.map((faq) => (
          <div key={faq._id} className="flex items-center justify-between py-4 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
            <div className="flex space-x-3">
              <button
                className="px-3 py-1 font-semibold text-white transition duration-200 ease-in-out bg-yellow-500 rounded-lg hover:bg-yellow-600"
                onClick={() => handleEditClick(faq)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 font-semibold text-white transition duration-200 ease-in-out bg-red-600 rounded-lg hover:bg-red-700"
                onClick={() => handleDeleteFAQ(faq._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
