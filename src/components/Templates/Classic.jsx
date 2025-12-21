import React from 'react'
import { Mail, MapPin, Linkedin, Globe } from 'lucide-react'

function Classic({data}) {
    return (
        <div id="resume-preview" className="border border-gray-300 print:shadow-none print:border-none "><div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: data.accent }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: data.accent }}>{data.name || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.email &&
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{data.email}</span>
                        </div>
                    }
                    {data.phone &&
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                            <span>{data.phone}</span>
                        </div>
                    }
                    {data.location &&
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{data.location}</span>
                        </div>
                    }    {data.linkedin &&
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-4 h-4" />
                            <span className="break-all">{data.linkedin}</span>
                        </div>
                    }    {data.website &&
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span className="break-all">{data.website}</span>
                        </div>
                    }
                </div>
            </header>
            {data.summary &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: data.accent }}>PROFESSIONAL SUMMARY</h2>
                    <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                </section>
            }
            {Array.isArray(data.experience) && data.experience.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: data.accent }}>PROFESSIONAL EXPERIENCE</h2>
                    <div className="space-y-4">
                        {(data.experience || []).map((e, i) => (
                            <div className="border-l-3 pl-4" style={{ borderColor: data.accent }} key={i}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{e.company}</h3>
                                        <p className="text-gray-700 font-medium">{e.job}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{e.duration}</p>
                                    </div>
                                </div>
                                <div className="text-gray-700 leading-relaxed whitespace-pre-line">{e.desc}</div>
                            </div>

                        ))}
                    </div>
                </section>
            }
            {Array.isArray(data.projects) && data.projects.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: data.accent }}>PROJECTS</h2>

                    {(data.projects || []).map((p, i) => (
                        <ul key={i} className="space-y-3 ">
                            <div className="flex justify-between items-start border-l-3 border-gray-300 pl-6"><div>
                                <li className="font-semibold text-gray-800 ">{p.name}</li>
                                <p className="text-gray-700 font-medium">{p.projectType}</p>
                                <p className="text-gray-600">{p.desc}</p>
                            </div>
                            </div>
                        </ul>
                    ))}
                </section>
            }
            {Array.isArray(data.education) && data.education.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: data.accent }}>EDUCATION</h2>
                    <div className="space-y-3">
                        {(data.education || []).map((e, i) => (
                            <div key={i} className="flex justify-between items-start"><div>
                                <h3 className="font-semibold text-gray-900">{e.degree}</h3>
                                <p className="text-gray-700">{e.school}</p>
                                {e.gpa && <p className="text-sm text-gray-600">GPA: {e.gpa}</p>}
                            </div>
                                <div className="text-sm text-gray-600">
                                    <p>{e.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            }
            {Array.isArray(data.skills) && data.skills.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: data.accent }}>CORE SKILLS</h2>
                    <div className="flex gap-4 flex-wrap">
                        {(data.skills || []).map((skill, i) => (
                            <div key={i} className="text-gray-700">• {skill}</div>
                        ))}
                    </div>
                </section>
            }
        </div>
        </div>
    )
}

export default Classic