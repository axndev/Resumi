import React, { useState, useEffect } from 'react'
import { CloudUpload, FilePenLine, Pencil, Plus, Trash, X } from 'lucide-react'
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const { userId } = useAuth()
    const navigate = useNavigate()
    const [userResumes, setUserResumes] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [newTitle, setNewTitle] = useState("")

    useEffect(() => {
        if (!userId) return
        const saved = localStorage.getItem(`resumes-${userId}`)
        setUserResumes(saved ? JSON.parse(saved) : [])
    }, [userId])

    // Delete resume
    const handleDeleteResume = (id) => {
        if (!window.confirm("Are you sure you want to delete this resume?")) return

        const saved = localStorage.getItem(`resumes-${userId}`)
        if (!saved) return

        const resumes = JSON.parse(saved)
        const updatedResumes = resumes.filter((r) => r.id !== id)
        localStorage.setItem(`resumes-${userId}`, JSON.stringify(updatedResumes))
        setUserResumes(updatedResumes)
    }

    // Edit resume → go to builder page
    const handleEditResume = (resume) => {
        navigate(`/app/builder/${resume.id}`, { state: { title: resume.title } })
    }

    // Create new resume
    const handleCreateResume = (e) => {
        e.preventDefault()
        if (!newTitle.trim()) return

        const newResume = {
            id: Date.now(),
            title: newTitle.trim(),
            data: {
                name: "",
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                website: "",
                summary: "",
                experience: [{ company: "", job: "", duration: "", desc: "" }],
                education: [{ school: "", degree: "", year: "", gpa: "" }],
                projects: [{ name: "", desc: "" }],
                skills: [],
            },
            createdAt: new Date().toISOString(),
        }

        const saved = localStorage.getItem(`resumes-${userId}`)
        const resumes = saved ? JSON.parse(saved) : []
        const updatedResumes = [...resumes, newResume]
        localStorage.setItem(`resumes-${userId}`, JSON.stringify(updatedResumes))
        setUserResumes(updatedResumes)
        setModalOpen(false)
        setNewTitle("")
        navigate(`/app/builder/${newResume.id}`, { state: { title: newResume.title } })
    }

    return (
        <div className='bg-gray-50 py-5'>
            <div className="max-w-7xl mx-auto px-4 py-8 ">
                <p className="text-2xl font-medium mb-6 text-slate-700 sm:hidden">Welcome, User</p>
                {/* Actions */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <span className='bg-indigo-400 p-2.5 rounded-full text-white'>
                            <Plus />
                        </span>
                        <p className="text-[13px] group-hover:text-indigo-600 transition-all duration-300">Create Resume</p>
                    </button>

                    <button
                        className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <span className='bg-purple-400 p-2.5 rounded-full text-white'>
                            <CloudUpload />
                        </span>
                        <p className="text-[13px] group-hover:text-purple-600 transition-all duration-300">Upload Existing</p>
                    </button>
                </div>

                <hr className="border-slate-300 my-6 sm:w-[305px]" />

                {/* Resumes List */}
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
                    {userResumes.map((r) => (
                        <div
                            onClick={() => handleEditResume(r)}
                            key={r.id}
                            className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-purple-300 text-purple-600 bg-purple-200 group hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                            <FilePenLine className='w-7 h-7' />
                            <p className="text-[13px] font-medium text-center px-2">{r.title || "Resume"}</p>
                            <p className="absolute bottom-1 text-[10px] text-purple-400 px-2 text-center">Updated on {new Date(r.createdAt).toLocaleString()}</p>
                            <div className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1 text-gray-600">
                                <span className='hover:bg-white/50 px-1 rounded' onClick={() => handleDeleteResume(r.id)}>
                                    <Trash className='w-4' />
                                </span>
                                <span className='hover:bg-white/50 px-1 rounded' onClick={() => handleEditResume(r)}>
                                    <Pencil className='w-4' />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Resume Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
                            <X
                                className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors'
                                onClick={() => setModalOpen(false)}
                            />
                            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
                            <form onSubmit={handleCreateResume}>
                                <input
                                    placeholder="Enter resume title"
                                    className="rounded-md border border-gray-300 p-3 mb-4 outline-none focus:ring-2 ring-green-500 text-sm w-full"
                                    required
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                                <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                    Create Resume
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
