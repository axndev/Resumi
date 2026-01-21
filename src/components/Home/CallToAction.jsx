import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

function CallToAction() {
     const { user } = useUser();
    return (
        <div id='contact' className="border-y mb-30 border-dashed border-slate-200 w-full max-w-6xl mx-auto md:px-16 px-8">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-lg">
                    Build a <span className="highlightedText">professional resume</span> that gets you hired.
                    <span className="block text-gray-700 text-base mt-2">
                        Create your resume in minutes with smart templates and AI guidance.
                    </span>
                </p>
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link
                        to={user ? `/app` : `/register`}
                        className="flex items-center gap-2 rounded-md py-3 px-6
               bg-(--primary) hover:bg-(--primary)/90
               transition text-white font-medium"
                    >
                        Get Started Free
                        <ArrowRight className="w-4" />
                    </Link>

                    <span className="text-xs text-slate-500 ml-1">
                        No credit card required
                    </span>
                </div>

            </div>
        </div>
    )
}

export default CallToAction