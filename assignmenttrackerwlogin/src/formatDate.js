const formatDate = (dateString) => {
    const [yearMonthDay, time] = dateString.split('T');
    const [year, month, day] = yearMonthDay.split('-');

    let correctedYear = year.length === 6 ? year.slice(-4) : year;

    const correctedDateString = `${correctedYear}-${month}-${day}T${time}`;
    const date = new Date(correctedDateString);

    if (isNaN(date)) {
        return "Invalid Date";
    }

    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const formattedTime = date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toLowerCase().replace(':00', '');

    return `${formattedDate}, ${formattedTime}`;
};

export default formatDate;
