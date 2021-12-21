function DatePicker(props) {
    return (
        <input
            id={props.id}
            type={props.type}
            value={props.dateFilter}
            className={props.className}
            name={props.name}
            onChange={props.onChangeDate}
        />
    )
}

export default DatePicker