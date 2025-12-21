import React from 'react'

function Input({
    label,
    value,
    onChange,
    required = false,
    icon: Icon = null,
    placeholder = "", // new prop
}) {
    return (
        <div className="w-full">
            {label && <label className="text-sm font-medium flex items-center gap-2 mb-2 text-gray-600">
                {Icon && <Icon className="w-4 h-4" />}
                <span>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </span>
            </label>}
            <input
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder} // added here
                className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3
                    outline-none focus:ring-2 ring-[var(--primary)] text-sm w-full"
            />
        </div>
    )
}

export default Input