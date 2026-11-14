function SortSelect({ params, options, setSort }) {

    return (
        <>

            <label>
                Sort by{" "}
                <select value={params?.sort} onChange={(event) => setSort(event.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

        </>
    )
}

export default SortSelect;