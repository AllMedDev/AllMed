import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

import './CardFiltering.css'
import ItemDoctorCard from './ItemDoctorCard';
import SearchBar from '../Filtering/SearchBar';
import FilterCheckBox from '../Filtering/FilterCheckBox';


const CardFiltering = ({ items }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [townFilters, setTownFilters] = useState({});
    const [specializationFilters, setSpecializationFilters] = useState({});
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        const uniqueTowns = [...new Set(items.map((item) => item.address_city))];
        const initialTownFilters = uniqueTowns.reduce((acc, town) => {
            acc[town] = false;
            return acc;
        }, {});

        setTownFilters(initialTownFilters);

        const uniqueSpecializations = [...new Set(items.map((item) => item.specialization))];
        const initialSpecializationFilters = uniqueSpecializations.reduce((acc, specialization) => {
            acc[specialization] = false;
            return acc;
        }, {});

        setSpecializationFilters(initialSpecializationFilters);
    }, [items]);

    useEffect(() => {
        const activeTowns = Object.keys(townFilters).filter((town) => townFilters[town]);
        const activeSpecializations = Object.keys(specializationFilters).filter(
            (spec) => specializationFilters[spec]
        );

        const results = items.filter((item) => {
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearchTerm =
                item.first_name.toLowerCase().includes(searchTermLower) ||
                item.surname.toLowerCase().includes(searchTermLower);

            const matchesTownFilter =
                activeTowns.length === 0 || activeTowns.includes(item.address_city);

            const matchesSpecializationFilter =
                activeSpecializations.length === 0 || activeSpecializations.includes(item.specialization);

            return matchesSearchTerm && matchesTownFilter && matchesSpecializationFilter;
        });

        setFilteredItems(results);
    }, [searchTerm, townFilters, specializationFilters, items]);

    const handleTownCheckboxChange = (town) => {
        setTownFilters((prev) => ({
            ...prev,
            [town]: !prev[town], 
        }));
    };

    const handleSpecializationCheckboxChange = (specialization) => {
        setSpecializationFilters((prev) => ({
            ...prev,
            [specialization]: !prev[specialization],
        }));
    };

    return (
        <div>
            <Row>
                <Col sm={6} className="filteringCol">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <h6>Vyberte špecializáciu</h6>
                    <Form className="scrollableFilterCheckBoxes">
                        {Object.keys(specializationFilters).map((spec) => (
                            <FilterCheckBox
                                key={spec}
                                label={spec}
                                checked={specializationFilters[spec]}
                                onChange={() => handleSpecializationCheckboxChange(spec)}
                            />
                        ))}
                    </Form>
                    <h6>Vyberte mesto</h6>
                    <Form className="scrollableFilterCheckBoxes"> 
                        {Object.keys(townFilters).map((town) => (
                            <FilterCheckBox
                                key={town}
                                label={town}
                                checked={townFilters[town]}
                                onChange={() => handleTownCheckboxChange(town)}
                            />
                        ))}
                    </Form>
                </Col>
                <Col sm={6} className="cardListDoctors">
                    {filteredItems.map((item) => (
                        <ItemDoctorCard key={item.id} person={item} />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default CardFiltering;