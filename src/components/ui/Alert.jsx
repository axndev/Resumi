import { CheckCircle } from 'lucide-react'
import React from 'react'

function Alert({alert, visible}) {
    return (
        <div
            className={`fixed alert left-1/2 -translate-x-1/2 bg-white rounded-md shadow p-4 flex gap-2
  ${visible ? 'animate-slide-down top-2 scale-100' : '-top-30 scale-50'}`}
        >
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
                <h3 className="font-medium text-sm">{alert?.title}</h3>
            </div>
        </div>
    )
}

export default Alert