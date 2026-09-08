import { useEffect, useRef, useState } from "react";

function CustomSelect({
    value,
    onChange,
    options,
    placeholder = "Select an option"
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`
                    input
                    flex
                    items-center
                    justify-between
                    text-left
                    cursor-pointer
                    ${open ? "border-[#4A4D52]" : ""}
                `}
            >
                <span
                    className={
                        selectedOption
                            ? "text-[#F2F2F2]"
                            : "text-[#686A70]"
                    }
                >
                    {selectedOption?.label || placeholder}
                </span>

                <span
                    className={`
                        text-[#A1A3A8]
                        transition-transform
                        duration-200
                        ${open ? "rotate-180" : ""}
                    `}
                >
                    ↓
                </span>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="
                    mt-2
                    overflow-hidden
                    border
                    border-[#2A2D32]
                    bg-[#101214]
                    rounded-lg
                    shadow-lg
                ">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                            className={`
                                w-full
                                text-left
                                px-4
                                py-3
                                text-sm
                                transition-colors
                                duration-150
                                ${
                                    value === option.value
                                        ? "bg-[#1C1F23] text-[#F2F2F2]"
                                        : "text-[#A1A3A8] hover:bg-[#181B1F] hover:text-[#F2F2F2]"
                                }
                            `}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;