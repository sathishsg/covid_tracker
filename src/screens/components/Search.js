function SearchBar(props) {
    return (
        <input
            id={props.id}
            type={props.type}
            value={props.search}
            className={props.className}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChangeSearch}
        />
    )
}

export default SearchBar