import { Plus, Trash2 } from 'lucide-react';
import React from 'react'

function Repeatable({
    items = [],
    onAdd,
    onRemove,
    onChange,
    render,
    title,
    description,
    type
}) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 items-start sm:flex-row justify-between sm:items-center">
                {title && (
                    <div>
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                        {description && <p className="text-sm text-gray-700">{description}</p>}
                    </div>
                )}
                <button
                    onClick={() =>
                        onAdd(type ? { type, title: "", company: "", desc: "" } : undefined)
                    }
                    className="flex items-center gap-2 text-sm border border-transparent hover:border-(--priamry) text-[var(--primary)] bg-(--primary)/10 px-3 rounded-lg py-1 cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    Add {type || ""}
                </button>
            </div>

            {items.map((item, i) => (
                <div
                    key={i}
                    className="rounded-lg border border-gray-300 px-4 py-5 space-y-3 relative"
                >
                    <h2 className="mb-2">{type + " #" + (i + 1)}</h2>
                    {render(item, (key, value) => {
                        const updated = items.map((it, idx) =>
                            idx === i ? { ...it, [key]: value } : it
                        );
                        onChange(updated);
                    })}

                    {items.length > 0 && (
                        <button
                            onClick={() => onRemove(i)}
                            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 absolute top-5 right-4 cursor-pointer"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Repeatable