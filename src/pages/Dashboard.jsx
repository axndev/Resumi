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
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";

export default function Dashboard() {
  const { userId, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userResumes, setUserResumes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editingResume, setEditingResume] = useState(null);
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(null); // ✅ holds resume to delete
  const colorVariants = [
    {
      bg: "bg-purple-200",
      border: "border-purple-300",
      text: "text-purple-600",
      muted: "text-purple-400",
    },
    {
      bg: "bg-indigo-200",
      border: "border-indigo-300",
      text: "text-indigo-600",
      muted: "text-indigo-400",
    },
    {
      bg: "bg-green-200",
      border: "border-green-300",
      text: "text-green-600",
      muted: "text-green-400",
    },
    {
      bg: "bg-pink-200",
      border: "border-pink-300",
      text: "text-pink-600",
      muted: "text-pink-400",
    },
    {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-600",
      muted: "text-yellow-500",
    },
    {
      bg: "bg-blue-200",
      border: "border-blue-300",
      text: "text-blue-600",
      muted: "text-blue-400",
    },
  ];

  const getColorById = (id) => colorVariants[id % colorVariants.length];
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId) return;

    const loadResumes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Load error:", error);
      } else {
        setUserResumes(data || []);
      }

      setLoading(false);
    };

    loadResumes();
  }, [isLoaded, isSignedIn, userId]);

  if (!isLoaded) return null;

  const fullName =
    user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  const showAlert = (type, title, message) => {
    setAlert({ type, title, message });
    setTimeout(() => setAlert(null), 3000);
  };
  const handleDeleteResume = async (id) => {
    const { error } = await supabase
      .from("resumes")
      .delete()
      .eq("data->>id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    setUserResumes((prev) => prev.filter((r) => r.data.id !== id));
    setAlert({ title: "Resume deleted" });
    setVisible(true);
    setDeleteConfirm(false);
    setTimeout(() => setVisible(false), 2000);
  };
  const handleEditTitle = (resume) => {
    setEditingResume(resume);
    setNewTitle(resume.title);
    setModalOpen(true);
  };

  // Navigate to builder page using app-level ID inside resume.data
  const handleEditResume = (resume) => {
    if (!resume?.data?.id) return;
    navigate(`/app/builder/${resume.data.id}`, {
      state: { title: resume.title },
    });
  };

  // Save or create a resume in Supabase
  const handleSaveResume = async (e) => {
    e.preventDefault();
    setVisible(true);

    try {
      if (editingResume) {
        // UPDATE existing resume (keep the same data.id)
        const updatedData = {
          ...editingResume.data,
        };

        const { data, error } = await supabase
          .from("resumes")
          .update({
            title: newTitle,
            data: updatedData,
            updated_at: new Date().toISOString(),
          })
          .eq("data->>id", editingResume.data.id) // filter by app-level ID inside JSON
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setUserResumes((prev) =>
          prev.map((r) => (r.data.id === data.data.id ? data : r)),
        );

        showAlert("success", "Updated", "Resume title updated");
      } else {
        // CREATE new resume
        const appId = new Date().getTime().toString();
        const newResume = {
          user_id: userId,
          title: newTitle || "New Resume",
          data: {
            id: appId,
            name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            summary: "",
            experience: [],
            education: [],
            projects: [],
            skills: [],
            accent: "#3B82F6",
            template: "Modern",
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from("resumes")
          .insert(newResume)
          .select()
          .single();

        if (error) throw error;

        setUserResumes((prev) => [...prev, data]);

        // Navigate to builder using app-level ID inside data
        navigate(`/app/builder/${data.data.id}`, {
          state: { title: data.title },
        });
      }
    } catch (err) {
      console.error("Resume save error:", err);
      setAlert({ title: "Failed to save resume" });
    } finally {
      setTimeout(() => setVisible(false), 2000);
      setModalOpen(false);
      setEditingResume(null);
      setNewTitle("");
    }
  };

  return (
    <div className="bg-gray-50 py-5 min-h-screen relative">
      {loading ? (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-sm text-slate-600">
              Loading your resumes...
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:py-8 pt-5">
          <p className="text-2xl font-medium text-slate-700 sm:hidden">
            Welcome, {fullName}
          </p>
          <h1 className="md:text-xl text-lg font-medium text-slate-800 mb-1 mt-3 md:mt-0">
            Your Resumes
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            {userResumes.length} total
          </p>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <button
              aria-label="Create new resume"
              onClick={() => setModalOpen(true)}
              className="cursor-pointer w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 
  border border-dashed border-slate-300 
  hover:border-indigo-500 hover:bg-indigo-50 hover:-translate-y-0.5
  transition-all"
            >
              <span
                aria-hidden
                className="bg-indigo-400 p-2.5 rounded-full text-white"
              >
                <Plus />
              </span>
              <p className="text-[13px]">Create Resume</p>
            </button>
            <button
              className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 
  border border-dashed border-slate-300 
  opacity-60 cursor-not-allowed"
            >
              <span className="bg-purple-400 p-2.5 rounded-full text-white">
                <CloudUpload />
              </span>
              <p className="text-[13px]">Upload Existing</p>
              <p className="text-[11px] text-slate-400">Coming soon</p>
            </button>
          </div>

          <hr className="my-6 sm:w-[305px] border-gray-300" />
          {userResumes.length === 0 && (
            <div className="text-sm text-slate-500 mt-8">
              You don’t have any resumes yet. Create your first one to get
              started.
            </div>
          )}
          {/* Resumes */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  flex-wrap gap-4 mt-10 mb-7">
            {userResumes.map((r) => {
              const colors = getColorById(r.data.id);
              return (
                <div
                  key={r.data.id}
                  onClick={() => handleEditResume(r)}
                  id={r.data.id}
                  className={`relative w-full  h-48 sm:h-57 flex flex-col items-center justify-center rounded-lg gap-2 cursor-pointer transition-all hover:shadow-lg  ${ colors ? colors.bg + " " + colors.border + " " + colors.text : ""} border group`}
                >
                  <FilePenLine className="w-7 h-7" />
                  <p className="text-sm font-medium text-center px-2">
                    {r.title}
                  </p>
                  <p
                    className={`absolute sm:bottom-4 bottom-2 text-xs px-2 text-center ${colors ? colors.muted : "text-slate-400"}`}
                  >
                    Updated on{" "}
                    {new Date(r.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <div className="absolute top-1 right-1 sm:hidden flex group-hover:flex gap-1">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(r);
                      }}
                      className="hover:bg-white/70 px-1 rounded"
                    >
                      <Trash className="w-4" />
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTitle(r);
                      }}
                      className="hover:bg-white/70 px-1 rounded"
                    >
                      <Pencil className="w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="relative bg-white rounded-lg w-full max-w-sm p-6 mx-5">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                setModalOpen(false);
                setEditingResume(null);
                setNewTitle("");
              }}
            />
            <h2 className="text-xl font-bold mb-4">
              {editingResume ? "Edit Resume Title" : "Create Resume"}
            </h2>
            <form onSubmit={handleSaveResume}>
              <input
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Resume title"
                className="w-full border border-gray-300  p-3 rounded mb-4"
              />
              <button className="w-full py-2 bg-green-600 hover:opacity-80 text-white rounded cursor-pointer">
                {editingResume ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="relative bg-white rounded-lg w-full max-w-sm p-6 mx-5">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setDeleteConfirm(null)}
            />
            <h2 className="text-lg font-bold mb-4">Delete Resume</h2>
            <p className="mb-5 text-sm">
              Are you sure you want to delete{" "}
              <strong>{deleteConfirm.title}</strong>?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border rounded-md text-sm cursor-pointer hover:bg-gray-100 border-gray-300"
              >
                Cancel
              </button>
              <button
                id={deleteConfirm.id}
                onClick={() => handleDeleteResume(deleteConfirm.data.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm cursor-pointer hover:opacity-70"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Alert */}
      <Alert alert={alert} visible={visible} />
    </div>
  );
}
