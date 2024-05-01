import React from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
    return (
        <div className="search-bar">
            <Form.Control
                className="search-bar-input"
                type="text"
                placeholder={placeholder || "Search..."}
                value={searchTerm}
                onChange={onSearchChange}
            />
        </div>
    );
};

export default SearchBar;