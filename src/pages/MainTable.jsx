// import libs:
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import {Helmet} from "react-helmet";

// import static:
import 'bootstrap/dist/css/bootstrap.min.css';

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50];

const MainPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://fakerapi.it/api/v2/companies?_quantity=500');
            setData(response.data.data);
        };

        fetchData();
    }, []);

    const handleSort = (column) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);
    };

    const filteredData = data.filter(item =>
        Object.values(item).some(value => 
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;
        const modifier = sortOrder === 'asc' ? 1 : -1;
        return a[sortColumn] > b[sortColumn] ? modifier : -modifier;
    });

    const getTriangle = () => {
        if (sortOrder === 'asc') {
            return '⏶ ';
        }
        return '⏷ ';
    };

    const getArray = (start, end) => {
        let array = [];
        for (var i = start; i <= end; i++) {
            array.push(i);
        }
        return array;
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (confirmDelete) {
            console.log(`Company with ID ${id} has been deleted.`);
            handleRefresh();
        }
    };

    const handleRefresh = () => {
        window.location.reload();
    };


    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="container mt-5">
            <Helmet>
                <title>
                    Main Page
                </title>
            </Helmet>
            <h1 className="mb-4">Companies</h1>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="form-select mb-3" onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage}>
                {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <button class="btn btn-primary" onClick={() => navigate(`/create`)}> 
                Create a new entry in the table
            </button> 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            {
                                sortColumn === 'name'
                                ? getTriangle()
                                : ""
                            }
                            Name
                        </th>
                        <th onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                            {
                                sortColumn === 'email'
                                ? getTriangle()
                                : ""
                            }
                            Email
                        </th>
                        <th onClick={() => handleSort('vat')} style={{ cursor: 'pointer' }}>
                            {
                                sortColumn === 'vat'
                                ? getTriangle()
                                : ""
                            }
                            VAT ID
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(item => (
                        <tr key={item.id}>
                            <td onClick={() => navigate(`/view/${item.id}`)}>{item.name}</td>
                            <td onClick={() => navigate(`/view/${item.id}`)}>{item.email}</td>
                            <td onClick={() => navigate(`/view/${item.id}`)}>{item.vat}</td>
                            <td>
                            <button id={item.id} type="button" className="btn btn-danger ms-2" onClick={(e) => handleDelete(Number(e.target.id))}>Delete Company</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <MDBPagination className='mb-0' center>
                <MDBPaginationItem disabled={currentPage === 1
                    ? true
                    : false
                }>
                    <MDBPaginationLink onClick={(e) => setCurrentPage(currentPage - 1)} href='#'>
                        Previous
                    </MDBPaginationLink>
                </MDBPaginationItem>
                <MDBPaginationItem active={currentPage === 1
                    ? true
                    : false
                }>
                    <MDBPaginationLink id="1" onClick={(e) => setCurrentPage(Number(e.target.id))} href='#'>
                        1
                    </MDBPaginationLink>
                </MDBPaginationItem>
                {
                    currentPage > 3
                    ?
                    <MDBPaginationItem disabled>
                        <MDBPaginationLink href='#'>...</MDBPaginationLink>
                    </MDBPaginationItem>
                    : ""
                }
                {currentPage <= 3
                ? (
                    getArray(2, Math.min(4, totalPages)).map(
                        (item) =>
                            <MDBPaginationItem key={item} active={currentPage === item
                                ? true
                                : false
                            }>
                                <MDBPaginationLink
                                    id={item}
                                    key={item}
                                    href='#'
                                    onClick={(e) => setCurrentPage(Number(e.target.id))}
                                >
                                    {item}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                    )
                )
                : (
                    getArray(currentPage - 2, Math.min(currentPage + 2, totalPages - 1)).map(
                        (item) =>
                            <MDBPaginationItem key={item} active={currentPage === item
                                ? true
                                : false
                            }>
                                <MDBPaginationLink
                                    id={item}
                                    key={item}
                                    href='#'
                                    onClick={(e) => setCurrentPage(Number(e.target.id))}
                                >
                                    {item}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                    )
                )}
                {
                    currentPage + 3 < totalPages
                    ?
                    <MDBPaginationItem disabled>
                    <MDBPaginationLink href='#'>...</MDBPaginationLink>
                    </MDBPaginationItem>
                    : ""
                }
                {totalPages !== 0 && totalPages !== 1
                    ?
                    <MDBPaginationItem active={currentPage === totalPages
                        ? true
                        : false
                    }>
                        <MDBPaginationLink id={totalPages} onClick={(e) => setCurrentPage(Number(e.target.id))} href='#'>
                            {totalPages}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                    : ""
                }
                <MDBPaginationItem disabled={currentPage === totalPages
                    ? true
                    : false
                }>
                    <MDBPaginationLink href='#' onClick={(e) => setCurrentPage(currentPage + 1)}>
                        Next
                    </MDBPaginationLink>
                </MDBPaginationItem>
                </MDBPagination>
        </div>
    );
};

export default MainPage;