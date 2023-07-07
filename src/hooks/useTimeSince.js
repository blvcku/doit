import { useState, useEffect } from 'react';

const useTimeSince = () => {
    const [seconds, setSeconds] = useState(0);
    const [timeSince, setTimeSince] = useState('');

    useEffect(() => {
        const secondsSince = Math.floor(new Date() / 1000 - seconds);
        let interval = secondsSince / 31536000;
        if (interval > 1) {
            return setTimeSince(
                `${Math.floor(interval)} year${
                    Math.floor(interval) === 1 ? '' : 's'
                } ago`,
            );
        }
        interval = secondsSince / 2592000;
        if (interval > 1) {
            return setTimeSince(
                `${Math.floor(interval)} month${
                    Math.floor(interval) === 1 ? '' : 's'
                } ago`,
            );
        }
        interval = secondsSince / 86400;
        if (interval > 1) {
            return setTimeSince(
                `${Math.floor(interval)} day${
                    Math.floor(interval) === 1 ? '' : 's'
                } ago`,
            );
        }
        interval = secondsSince / 3600;
        if (interval > 1) {
            return setTimeSince(
                `${Math.floor(interval)} hour${
                    Math.floor(interval) === 1 ? '' : 's'
                } ago`,
            );
        }
        interval = secondsSince / 60;
        if (interval > 1) {
            return setTimeSince(
                `${Math.floor(interval)} minute${
                    Math.floor(interval) === 1 ? '' : 's'
                } ago`,
            );
        }
        return setTimeSince(`${Math.floor(secondsSince)} seconds ago`);
    }, [seconds]);

    return { timeSince, setSeconds };
};

export default useTimeSince;
