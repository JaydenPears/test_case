// import libs:
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// import static:
import 'bootstrap/dist/css/bootstrap.min.css';

const Editor = () => {
    const { id } = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakerapi.it/api/v2/companies?_quantity=500`);
                const companies = response.data.data;
                const company = companies.find(comp => comp.id === parseInt(id));
                if (company) {
                    setCompanyData(company);
                } else {
                    setError('Company not found');
                }
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated data:', companyData);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            console.log(`Company with ID ${id} has been deleted.`);
            navigate(`/`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <Helmet>
                <title>Edit Entry</title>
            </Helmet>
            <h1>Edit Company</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={companyData.name} 
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={companyData.email} 
                        onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">VAT:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={companyData.vat} 
                        onChange={(e) => setCompanyData({ ...companyData, vat: e.target.value })} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>Delete Company</button>
            </form>
        </div>
    );
};

export default Editor;