import { useState, useEffect } from 'react';

const useIsToday = () => {
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        const today = new Date();
        if(
            date.getDate() === today.getDate() && 
            date.getMonth() === today.getMonth() && 
            date.getFullYear() === today.getFullYear()
        ){
            return setDateString(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }
        return setDateString(date.toLocaleDateString());
    }, [date]);

    return { dateString, setDate };
}

export default useIsToday;