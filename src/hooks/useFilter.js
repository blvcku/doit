import { useState, useEffect } from "react";

const useFilter = () => {
    
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const matchesFilter = new RegExp(filter.trim(), 'i');
        const items = data.filter(({title}) => matchesFilter.test(title));
        setFilteredData(items);
    }, [data, filter]);

    return { filter, setFilter, filteredData, setData };
}

export default useFilter;