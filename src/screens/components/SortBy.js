function SortBy(props) {
    return (
        <select id={props.id} name={props.name} className={props.className} value={props.sortBy} onChange={props.onChange}>
            <option value={""}>{props.placeholder}</option>
            {props.sortByList?.map((sortBy, index) => {
                return(
                    <option key={`sortBy_${sortBy}_${index}`} value={sortBy}>{sortBy}</option>
                )
            })}
        </select>
    )
}

export default SortBy