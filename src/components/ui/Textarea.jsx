import React from 'react'

function Textarea({ label, value, onChange, placeholder = "" }) {
    return (
        <div className="mb-0">
            <label className="text-sm font-medium mb-2 text-gray-600">{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} // added here
                className="resize-none mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 ring-[var(--primary)] text-sm"
                rows={6}
            />
        </div>
    )
}

export default Textarea