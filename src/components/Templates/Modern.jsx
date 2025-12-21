import React from 'react'
import { Mail, MapPin, Linkedin, Globe, Phone } from 'lucide-react'
function Modern({ data, formatUrl }) {
    return (
        <div id="resume-preview" className="border border-gray-200 print:shadow-none print:border-none ">
            <div className="max-w-4xl mx-auto bg-white text-gray-800">
                <header className="p-8 text-white" style={{ backgroundColor: data.accent }}>
                    <h1 className="text-4xl font-light mb-3">{data.name || 'Your Name'}</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
                        {data.email &&
                            <div className="flex items-center gap-2">
                                <Mail className="w-4" />
                                <span>{data.email}</span>
                            </div>
                        }
                        {data.phone &&
                            <div className="flex items-center gap-2">
                                <Phone className="w-4" />
                                <span>{data.phone}</span>
                            </div>
                        }
                        {data.location &&
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4" />
                                <span>{data.location}</span>
                            </div>
                        }
                        {data.linkedin &&
                            <a target="_blank" href={formatUrl(data.linkedin)} rel="noopener noreferrer" className="flex items-center gap-2">
                                <Linkedin className="w-4" />
                                <span className="break-all text-xs">{data.linkedin}</span>
                            </a>
                        }
                        {data.website &&
                            <a target="_blank" href={formatUrl(data.website)} className="flex items-center gap-2">
                                <Globe className="w-4" />
                                <span className="break-all text-xs">w{data.website}</span>
                            </a>
                        }
                    </div>
                </header>
                <div className="p-8">
                    {data.summary &&
                        <section className="mb-8">
                            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Professional Summary</h2>
                            <p className="text-gray-700 ">{data.summary}</p>
                        </section>
                    }
                    {Array.isArray(data.experience) && data.experience.length > 0 &&
                        <section className="mb-8" >
                            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Experience</h2>
                            <div className="space-y-6">
                                {(data.experience || []).map((e, i) => (
                                    <div className="relative pl-6 border-l border-gray-200" key={i}>
                                        <div className="flex justify-between items-start mb-2"><div>
                                            <h3 className="text-xl font-medium text-gray-900">{e.job}</h3>
                                            <p className="font-medium" style={{ color: data.accent }}>{e.company}</p>
                                        </div>
                                            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">{e.duration}</div>
                                        </div>
                                        <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">{e.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    }
                    {Array.isArray(data.projects) && data.projects.length > 0 &&
                        <section className="mb-8">
                            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Projects</h2>
                            <div className="space-y-6">
                                {(data.projects || []).map((p, i) => (
                                    <div key={i} className="relative pl-6 border-l border-gray-200" style={{ borderLeftColor: data.accent }}>
                                        <div className="flex justify-between items-start"><div>
                                            <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                                        </div>
                                        </div>
                                        <div className="text-gray-800 leading-relaxed text-[14px] mt-1">{p.projectType}</div>
                                        <div className="text-gray-700 leading-relaxed text-sm mt-3">{p.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    }
                    <div className="grid sm:grid-cols-2 gap-8">
                        {Array.isArray(data.education) && data.education.length > 0 &&
                            <section>
                                <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Education</h2>
                                <div className="space-y-4">
                                    {(data.education || []).map((e, i) => (
                                        <div key={i}>
                                            <h3 className="font-semibold text-gray-900">{e.degree}</h3>
                                            <p style={{ color: data.accent }}>{e.school}</p>
                                            <div className="flex justify-between items-center text-sm text-gray-600">
                                                <span>{e.year}</span>
                                                {e.gpa && <span>GPA: {e.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        }
                        {Array.isArray(data.skills) && data.skills.length > 0 &&
                            <section>
                                <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {(data.skills || []).map((s, i) => (
                                        <span key={i} className="px-3 py-1 text-sm text-white rounded-full" style={{ backgroundColor: data.accent }}>{s}</span>
                                    ))}
                                </div>
                            </section>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modern