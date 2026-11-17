export function formatDate(date) {
    const [day, month] = date.split(" ")[0].split("-").reverse();
    return `${day}/${month}`;
}

export function formatTime(time) {
    return time.slice(0, 5);
}

export function validDate(date, time) {
    const datetime = `${date} ${time}`;
    return datetime >= new Date(datetime);
}