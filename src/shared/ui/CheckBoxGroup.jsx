function CheckBoxGroup({ name, options, selected, onChange }) {
    
    function toggle(value) {
        const next = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
        onChange(name, next);
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {options.map((option) => {
                const isChecked = selected.includes(option);
                return (
                    <label
                        key={option}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            border: `1px solid ${isChecked ? "#4a90d9" : "#ccc"}`,
                            borderRadius: "4px",
                            padding: "4px 10px",
                            background: isChecked ? "#eaf2fb" : "transparent",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(option)}
                            style={{ margin: 0 }}
                        />
                        {option.replace('_', ' ')}
                    </label>
                );
            })}
        </div>
    )
}

export default CheckBoxGroup;