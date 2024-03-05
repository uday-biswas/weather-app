const DateData = ({ date }) => {

    const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
    const month = new Date(date).toLocaleString('en-US', { month: 'short' });
    const dayNumber = new Date(date).toLocaleString('en-US', { day: 'numeric' });
    return (
        <div>

            {/* returning the date in the format "day, dayNumber month" */}
            {`${day}, ${dayNumber} ${month}`}
        </div>
    );
}

export default DateData;