import React from 'react'
import { Mail, MapPin, Linkedin, Globe } from 'lucide-react'

function Classic({resume}) {
    return (
        <div id="resume-preview" className="border border-gray-300 print:shadow-none print:border-none "><div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: resume.accent }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: resume.accent }}>{resume.name || "Your Name"}</h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {resume.email &&
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{resume.email}</span>
                        </div>
                    }
                    {resume.phone &&
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone size-4" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
                            <span>{resume.phone}</span>
                        </div>
                    }
                    {resume.location &&
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{resume.location}</span>
                        </div>
                    }    {resume.linkedin &&
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-4 h-4" />
                            <span className="break-all">{resume.linkedin}</span>
                        </div>
                    }    {resume.website &&
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span className="break-all">{resume.website}</span>
                        </div>
                    }
                </div>
            </header>
            {resume.summary &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: resume.accent }}>PROFESSIONAL SUMMARY</h2>
                    <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                </section>
            }
            {Array.isArray(resume.experience) && resume.experience.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: resume.accent }}>PROFESSIONAL EXPERIENCE</h2>
                    <div className="space-y-4">
                        {(resume.experience || []).map((e, i) => (
                            <div className="border-l-3 pl-4" style={{ borderColor: resume.accent }} key={i}>
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
            {Array.isArray(resume.projects) && resume.projects.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: resume.accent }}>PROJECTS</h2>

                    {(resume.projects || []).map((p, i) => (
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
            {Array.isArray(resume.education) && resume.education.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: resume.accent }}>EDUCATION</h2>
                    <div className="space-y-3">
                        {(resume.education || []).map((e, i) => (
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
            {Array.isArray(resume.skills) && resume.skills.length > 0 &&
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: resume.accent }}>CORE SKILLS</h2>
                    <div className="flex gap-4 flex-wrap">
                        {(resume.skills || []).map((skill, i) => (
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