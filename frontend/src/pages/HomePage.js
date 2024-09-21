import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ searchQuery, setSearchQuery }) => {
    const [faqs, setFaqs] = useState([]);
    const [openIndex, setOpenIndex] = useState(0); // Default the first FAQ to be open

    useEffect(() => {
        const fetchFAQs = async () => {
            const response = await axios.get('http://localhost:5000/api/faqs');
            setFaqs(response.data);
        };
        fetchFAQs();
    }, []);

    // Update the FAQs based on the search query
    useEffect(() => {
        const fetchFAQs = async () => {
            const response = await axios.get('http://localhost:5000/api/faqs');
            const originalFAQs = response.data;
            if (searchQuery) {
                const filtered = originalFAQs.filter(faq =>
                    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFaqs(filtered);
            } else {
                setFaqs(originalFAQs);
            }
        };
        fetchFAQs();
    }, [searchQuery]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ open/close
    };

    return (
        <div className="container p-6 mx-auto" style={{ backgroundColor: '#e4e6fd', borderRadius: '25px', padding: '2rem' }}>
            <h1 className="mb-8 text-4xl font-bold text-center" style={{ color: '#7b46d4' }}>
                Frequently Asked Questions
            </h1>

            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="mb-4 p-2 border rounded-md"
                style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
            />

            <div>
                {faqs.map((faq, index) => (
                    <div 
                        key={faq._id} 
                        className="p-6 mb-4" 
                        style={{ backgroundColor: 'white', borderRadius: '25px' }}
                    >
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <h2 
                                className="text-xl font-semibold" 
                                style={{ color: '#7b46d4' }}
                            >
                                {faq.question}
                            </h2>
                            <span className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                ▼
                            </span>
                        </div>
                        {openIndex === index && (
                            <p className="mt-2 text-gray-600">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
