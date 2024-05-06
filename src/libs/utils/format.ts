import moment from 'moment';

// Format: 2021-12-31T00:00:00
export const formatDate = (date: string | Date) => {
    return moment(date).format('LLL');
};

// Format: 12/31/2021
export const formatDateShort = (date: string | Date) => {
    return moment(date).format('LL');
};

// Format: December 2021
export const formatDateShortMonth = (date: string | Date) => {
    return moment(date).format('MMMM YYYY');
};

// Format: December 31st
export const formatDateShortDay = (date: string | Date) => {
    return moment(date).format('MMMM Do');
};

// Format: 2 days ago
export const formatDateFromNow = (date: string | Date) => {
    return moment(date).fromNow();
};

// Format: December 31st 2021, 12:00:00 am
export const formatDateFull = (date: string | Date) => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
};
