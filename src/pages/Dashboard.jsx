import React, { useState, useEffect } from "react";
import {
    CloudUpload,
    FilePenLine,
    Pencil,
    Plus,
    Trash,
    X,
    CheckCircle,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const colorVariants = [
    { bg: "bg-purple-200", border: "border-purple-300", text: "text-purple-600", muted: "text-purple-400" },
    { bg: "bg-indigo-200", border: "border-indigo-300", text: "text-indigo-600", muted: "text-indigo-400" },
    { bg: "bg-green-200", border: "border-green-300", text: "text-green-600", muted: "text-green-400" },
    { bg: "bg-pink-200", border: "border-pink-300", text: "text-pink-600", muted: "text-pink-400" },
    { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-600", muted: "text-yellow-500" },
    { bg: "bg-blue-200", border: "border-blue-300", text: "text-blue-600", muted: "text-blue-400" },
];

const getColorById = (id) => colorVariants[id % colorVariants.length];

export default function Dashboard() {
    const { userId } = useAuth();
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    const [userResumes, setUserResumes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [editingResume, setEditingResume] = useState(null);
    const [alert, setAlert] = useState(null);

    const [deleteConfirm, setDeleteConfirm] = useState(null); // ✅ holds resume to delete

    useEffect(() => {
        if (!userId) return;
        const saved = localStorage.getItem(`resumes-${userId}`);
        setUserResumes(saved ? JSON.parse(saved) : []);
    }, [userId]);

    if (!isLoaded) return null;

    const fullName = user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    const showAlert = (type, title, message) => {
        setAlert({ type, title, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleDeleteResume = (id) => {
        const updated = userResumes.filter((r) => r.id !== id);
        localStorage.setItem(`resumes-${userId}`, JSON.stringify(updated));
        setUserResumes(updated);
        setDeleteConfirm(null);
        showAlert("success", "Deleted", "Resume removed successfully");
    };

    const handleEditTitle = (resume) => {
        setEditingResume(resume);
        setNewTitle(resume.title);
        setModalOpen(true);
    };

    const handleEditResume = (resume) => {
        navigate(`/app/builder/${resume.id}`, { state: { title: resume.title } });
    };

    const handleSaveResume = (e) => {
        e.preventDefault();
        let updatedResumes;

        if (editingResume) {
            updatedResumes = userResumes.map((r) =>
                r.id === editingResume.id ? { ...r, title: newTitle } : r
            );
            showAlert("success", "Updated", "Resume title updated");
        } else {
            const newResume = {
                id: Date.now(),
                title: newTitle,
                createdAt: new Date().toISOString(),
                data: {},
            };
            updatedResumes = [...userResumes, newResume];
            showAlert("success", "Created", "New resume created");
            navigate(`/app/builder/${newResume.id}`);
        }

        localStorage.setItem(`resumes-${userId}`, JSON.stringify(updatedResumes));
        setUserResumes(updatedResumes);
        setModalOpen(false);
        setEditingResume(null);
        setNewTitle("");
    };

    return (
        <div className="bg-gray-50 py-5 min-h-screen relative">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <p className="text-2xl font-medium mb-6 text-slate-700 sm:hidden">Welcome, {fullName}</p>

                {/* Actions */}
                <div className="flex gap-4 mb-6">
                    <button onClick={() => setModalOpen(true)} className="cursor-pointer w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300 hover:border-indigo-500 transition">
                        <span className="bg-indigo-400 p-2.5 rounded-full text-white"><Plus /></span>
                        <p className="text-[13px]">Create Resume</p>
                    </button>
                    <button className="w-full cursor-not-allowed sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed border-slate-300">
                        <span className="bg-purple-400 p-2.5 rounded-full text-white"><CloudUpload /></span>
                        <p className="text-[13px]">Upload Existing</p>
                    </button>
                </div>

                <hr className="my-6 sm:w-[305px] border-gray-300" />

                {/* Resumes */}
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
                    {userResumes.map((r) => {
                        const colors = getColorById(r.id);
                        return (
                            <div key={r.id} onClick={() => handleEditResume(r)} className={`relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer transition-all hover:shadow-lg ${colors.bg} ${colors.border} ${colors.text} border group`}>
                                <FilePenLine className="w-7 h-7" />
                                <p className="text-[13px] font-medium text-center px-2">{r.title}</p>
                                <p className={`absolute bottom-1 text-[10px] px-2 text-center ${colors.muted}`}>
                                    Updated on {new Date(r.createdAt).toLocaleDateString()}
                                </p>
                                <div className="absolute top-1 right-1 sm:hidden flex group-hover:flex gap-1">
                                    <span onClick={(e) => { e.stopPropagation(); setDeleteConfirm(r); }} className="hover:bg-white/50 px-1 rounded">
                                        <Trash className="w-4" />
                                    </span>
                                    <span onClick={(e) => { e.stopPropagation(); handleEditTitle(r); }} className="hover:bg-white/50 px-1 rounded">
                                        <Pencil className="w-4" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Create / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg w-full max-w-sm p-6 mx-5">
                        <X className="absolute top-4 right-4 cursor-pointer" onClick={() => {
                            setModalOpen(false);
                            setEditingResume(null);
                            setNewTitle("");
                        }} />
                        <h2 className="text-xl font-bold mb-4">{editingResume ? "Edit Resume Title" : "Create Resume"}</h2>
                        <form onSubmit={handleSaveResume}>
                            <input required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Resume title" className="w-full border border-gray-300  p-3 rounded mb-4" />
                            <button className="w-full py-2 bg-green-600 hover:opacity-80 text-white rounded cursor-pointer">{editingResume ? "Update" : "Create"}</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center">
                    <div className="relative bg-white rounded-lg w-full max-w-sm p-6 mx-5">
                        <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setDeleteConfirm(null)} />
                        <h2 className="text-lg font-bold mb-4">Delete Resume</h2>
                        <p className="mb-5 text-sm">Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-gray-100 border-gray-300">Cancel</button>
                            <button onClick={() => handleDeleteResume(deleteConfirm.id)} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm cursor-pointer hover:opacity-70">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Alert */}
            <div className={`fixed ${alert ? 'opacity-100' : 'opacity-0'} top-5 transition-all duration-300  left-1/2 transform -translate-x-1/2 w-70  bg-white flex gap-3 p-3 text-sm rounded shadow-lg`}>
                <CheckCircle className="w-5 text-green-500" />
                <div>
                    <h3 className="font-medium">{alert?.title}</h3>
                    <p className="text-slate-500">{alert?.message}</p>
                </div>
            </div>
        </div>
    );
}
