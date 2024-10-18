// import libs:
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

// import static:
import 'bootstrap/dist/css/bootstrap.min.css';

const Create = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [vat, setVat] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!companyName) newErrors.companyName = "Company name is required";
        if (!email) newErrors.email = "Email is required";
        if (!vat) newErrors.vat = "VAT is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Имитация отправки данных на API
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log({ companyName, email, vat });
            navigate('/');
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Create New Entry</title>
            </Helmet>
            <h1>Create New Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">
                        Company Name:
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    {errors.companyName && <div className="text-danger">{errors.companyName}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Email:
                    </label>
                    <input 
                        type="email"
                        className="form-control" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        VAT:
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={vat} 
                        onChange={(e) => setVat(e.target.value)} 
                    />
                    {errors.vat && <div className="text-danger">{errors.vat}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Create;