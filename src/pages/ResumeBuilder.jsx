import React, { useState, useEffect, useRef } from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
    User,
    Briefcase,
    FileText,
    GraduationCap,
    FolderGit2,
    Plus,
    Trash2,
    ChevronRight,
    ChevronLeft,
    Palette,
    Check,
    Mail,
    Phone,
    Linkedin,
    Globe,
    MapPin,
    Zap,
    X,
    ArrowLeft,
    CheckCircle,
} from "lucide-react"
import { useAuth } from "@clerk/clerk-react"

const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Summary", icon: FileText },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Education", icon: GraduationCap },
    { id: 5, title: "Projects", icon: FolderGit2 },
    { id: 6, title: "Skills", icon: Zap },
]

export default function ResumeBuilder() {
    const { userId } = useAuth();
    const { resumeId } = useParams();
    const location = useLocation();
    const [alert, setAlert] = useState(null);

    const navigate = useNavigate();

    const resumeTitle = location.state?.title || "";

    const [step, setStep] = useState(1);
    const [accent, setAccent] = useState(() => localStorage.getItem("accent") || "#3B82F6");
    const [toggleAccents, setToggleAccents] = useState(false);

    const [data, setData] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
        experience: [{ company: "", job: "", duration: "", desc: "" }],
        education: [{ school: "", degree: "", year: "", gpa: "" }],
        projects: [{ name: "", projectType: "", desc: "" }],
        skills: [],
        skillInput: "",
        createdAt: null,
    });

    const [userResumes, setUserResumes] = useState([]);
    const previewRef = useRef();

    // Load all user resumes
    useEffect(() => {
        if (!userId) return;
        const saved = localStorage.getItem(`resumes-${userId}`);
        const resumes = saved ? JSON.parse(saved) : [];
        setUserResumes(resumes);

        // If resumeId exists, load that resume for editing
        if (resumeId) {
            const resume = resumes.find(r => r.id === Number(resumeId));
            if (resume) setData(resume);
        }
    }, [userId, resumeId]);

    // Update local state helper
    const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

    const skillUpdate = (key, value) => {
        setData(prev => ({
            ...prev,
            [key]: key === "skills" && !Array.isArray(value) ? prev.skills : value,
        }));
    };

    // Add skill
    const addSkill = () => {
        const value = String(data.skillInput || "").trim();
        if (!value) return;

        setData(prev => {
            const skills = Array.isArray(prev.skills) ? prev.skills : [];
            if (skills.some(s => s.toLowerCase() === value.toLowerCase())) {
                return { ...prev, skillInput: value };
            }
            return { ...prev, skills: [...skills, value], skillInput: "" };
        });
    };

    const removeSkill = index => {
        setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
    };

    // Save current resume
    const handleSave = () => {
        if (!userId) return alert("User not signed in");

        const saved = localStorage.getItem(`resumes-${userId}`);
        const resumes = saved ? JSON.parse(saved) : [];

        let newData = { ...data };
        if (!data.id) {
            // New resume
            newData.id = Date.now();
            newData.createdAt = new Date().toISOString();
            resumes.push(newData);
        } else {
            // Update existing resume
            const index = resumes.findIndex(r => r.id === data.id);
            if (index !== -1) {
                resumes[index] = { ...newData, id: data.id, createdAt: resumes[index].createdAt };
            } else {
                // fallback if somehow not found
                resumes.push(newData);
            }
        }

        // After saving the resume
        localStorage.setItem(`resumes-${userId}`, JSON.stringify(resumes));
        setUserResumes(resumes);

        // Show custom alert
        setAlert({ title: "Saved!", message: "Resume saved successfully" });

        // Hide after 3 seconds
        setTimeout(() => setAlert(null), 3000);

    };

    // Reset form for new resume
    const createNewResume = () => {
        setData({
            id: null,
            name: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            summary: "",
            experience: [{ company: "", job: "", duration: "", desc: "" }],
            education: [{ school: "", degree: "", year: "", gpa: "" }],
            projects: [{ name: "", projectType: "", desc: "", }],
            skills: [],
            skillInput: "",
            createdAt: null,
        });
        setStep(1);
        navigate("/builder/new");
    };

    const handlePrint = () => window.print();

    const accentColors = {
        blue: "#3B82F6",
        indigo: "#615FFF",
        purple: "#8B5CF6",
        green: "#10B981",
        red: "#EF4444",
        orange: "#F97316",
        teal: "#14B8A6",
        pink: "#EC4899",
        gray: "#6B7280",
        black: "#1F2937",
    };

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);
    return (
        <div className="min-h-screen bg-gray-50 pt-0 pb-25">
            <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between">
                <Link to="/app" class="inline-flex text-sm gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeft className="w-4" />  Back to Dashboard
                </Link>
                <button
                    onClick={handlePrint}
                    type="button"
                    className="md:hidden rounded-full border border-(--primary)/30 text-(--primary) bg-(--primary)/10  font-medium px-5 py-2 cursor-pointer hover:border-(--primary) text-[13px]"
                >
                    Download Pdf
                </button>
            </div>
            {/* STEPS */}
            <div className="md:flex flex-wrap gap-3 items-center justify-center mb-10 hidden">
                {steps.map((s) => {
                    const Icon = s.icon
                    const active = step === s.id
                    return (
                        <button
                            key={s.id}
                            onClick={() => setStep(s.id)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${active
                                ? "bg-[var(--primary)] text-white"
                                : "bg-white cursor-pointer border border-gray-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            {s.title}
                        </button>
                    )
                })}
                <button
                    onClick={handlePrint}
                    type="button"
                    className="rounded-full border border-(--primary)/30 text-(--primary) bg-(--primary)/10  font-medium px-5 py-2 cursor-pointer hover:border-(--primary) text-[13px]"
                >
                    Download Pdf
                </button>
            </div>
            <div className="mx-auto grid gap-8 px-6 md:grid-cols-[0.8fr_1.2fr] max-w-7xl">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* FORM */}
                    <div className="rounded-lg border border-gray-300 bg-white p-6 space-y-6">
                        <div className="flex justify-between sm:gap-4 gap-2 pb-3 border-b border-gray-300">
                            <div className="flex flex-col text-sm relative">
                                <button
                                    onClick={() => setToggleAccents(prev => !prev)}
                                    type="button"
                                    className="peer flex items-center gap-2 rounded-md text-sm border-transparent bg-(--primary)/10 text-(--primary) border px-5 py-2 hover:border-(--primary) cursor-pointer"
                                >
                                    <Palette className="w-4 h-4" />
                                    <span className="hidden sm:block">Accent</span>
                                </button>
                                {toggleAccents && (
                                    <ul
                                        className="absolute top-10 left-0 right-0 z-20
               grid grid-cols-4 bg-white border border-gray-300
               sm:w-65 w-62 gap-2 rounded-md shadow-md mt-2 p-3"
                                    >
                                        {Object.entries(accentColors).map(([key, color]) => (
                                            <div
                                                key={key}
                                                className="flex flex-col gap-1 items-center cursor-pointer"
                                                onClick={() => {
                                                    setAccent(color);
                                                    setToggleAccents(false);
                                                }}
                                            >
                                                <li
                                                    className={`relative w-12 h-12 rounded-full
                      hover:border-2 hover:border-gray-600
                      ${accent === color ? "border-2 border-gray-300" : ""}`}
                                                    style={{ backgroundColor: color }}
                                                >
                                                    {accent === color && (
                                                        <Check
                                                            className="absolute inset-0 m-auto text-white w-4 h-4"
                                                        />
                                                    )}
                                                </li>
                                                <span className="text-[12px] capitalize text-gray-600">{key}</span>
                                            </div>
                                        ))}
                                    </ul>
                                )}

                            </div>
                            <div className="flex gap-4">
                                {step > 1 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="flex items-center gap-2 text-sm cursor-pointer"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </button>
                                )}

                                {step < steps.length && (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="flex items-center gap-2 sm:text-sm text-[13px]  cursor-pointer"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {step === 1 && (
                            <>
                                <h3 className="text-lg font-semibold mb-1">Personal Information</h3>
                                <p className="text-sm text-gray-700">Get Started with the personal information</p>
                                <Input
                                    label="Full Name"
                                    value={data.name}
                                    required
                                    onChange={(v) => update("name", v)}
                                    icon={User}
                                />
                                <Input
                                    label="Email"
                                    value={data.email}
                                    onChange={(v) => update("email", v)}
                                    required
                                    icon={Mail}
                                />
                                <Input
                                    label="Phone Number"
                                    value={data.phone}
                                    onChange={(v) => update("phone", v)}
                                    icon={Phone}
                                />
                                <Input
                                    label="Location"
                                    value={data.location}
                                    onChange={(v) => update("location", v)}
                                    icon={MapPin}
                                />
                                <Input
                                    label="LinkedIn Profile"
                                    value={data.linkedin}
                                    onChange={(v) => update("linkedin", v)}
                                    icon={Linkedin}
                                />
                                <Input
                                    label="Personal Website"
                                    value={data.website}
                                    onChange={(v) => update("website", v)}
                                    icon={Globe}
                                />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h3 className="text-lg font-semibold mb-1">Professional Summary</h3>
                                <p className="text-sm text-gray-700">Add summary for your resume here</p>
                                <Textarea
                                    value={data.summary}
                                    onChange={(v) => update("summary", v)}
                                />
                                <p className="text-[11px] mb-8  text-center max-w-[80%] m-auto mt-0 text-gray-600">Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
                            </>

                        )}
                        {step === 3 && (
                            <Repeatable
                                items={data.experience}
                                onAdd={(newItem) =>
                                    setData(prev => ({
                                        ...prev,
                                        experience: [...(prev.experience || []), newItem || { title: "", company: "", desc: "" }]
                                    }))
                                }
                                onRemove={(i) =>
                                    setData(prev => ({
                                        ...prev,
                                        experience: prev.experience.filter((_, idx) => idx !== i)
                                    }))
                                }
                                onChange={(updated) =>
                                    setData(prev => ({ ...prev, experience: updated }))
                                }
                                title="Professional Experience"
                                description="Add your job experience"
                                type="Experience"
                                render={(item, updateItem) => (
                                    <>

                                        <Input
                                            placeholder="Company Name"
                                            value={item.company}
                                            onChange={v => updateItem("company", v)}
                                        />
                                        <Input
                                            placeholder="Job Title"
                                            value={item.job}
                                            onChange={v => updateItem("job", v)}
                                        />
                                        <Input
                                            placeholder="Duration"
                                            value={item.duration}
                                            onChange={v => updateItem("duration", v)}
                                        />
                                        <Textarea
                                            label="Job Description"
                                            placeholder="Describe your key responsibilities and achievements..."
                                            value={item.desc}
                                            onChange={v => updateItem("desc", v)}
                                        />
                                    </>
                                )}
                            />

                        )}
                        {step === 4 && (
                            <Repeatable
                                items={data.education}
                                onAdd={(newItem) =>
                                    setData(prev => ({
                                        ...prev,
                                        education: [...(prev.education || []), newItem || { school: "", degree: "", year: "", gpa: "" }]
                                    }))
                                }
                                onRemove={(i) =>
                                    update(
                                        "education",
                                        data.education.filter((_, idx) => idx !== i)
                                    )
                                }
                                onChange={(updated) => update("education", updated)}
                                title="Education"
                                description="Add your education details"
                                type="Education"
                                render={(item, updateItem) => (
                                    <>
                                        <Input
                                            placeholder="Institution Name"
                                            value={item.school}
                                            onChange={(v) => updateItem("school", v)}
                                        />
                                        <Input
                                            placeholder="Degree (e.g., Bachelor's, Master's)"
                                            value={item.degree}
                                            onChange={(v) => updateItem("degree", v)}
                                        />
                                        <Input
                                            placeholder="Year"
                                            value={item.year}
                                            onChange={(v) => updateItem("year", v)}
                                        />
                                        <Input
                                            placeholder="GPA (optional)"
                                            value={item.gpa}
                                            onChange={(v) => updateItem("gpa", v)}
                                        />
                                    </>
                                )}
                            />
                        )}
                        {step === 5 && (
                            <Repeatable
                                items={data.projects}
                                onAdd={(newItem) =>
                                    setData(prev => ({
                                        ...prev,
                                        projects: [...(prev.projects || []), newItem || { name: "", projectType: "", desc: "" }]
                                    }))
                                }
                                onRemove={(i) =>
                                    update(
                                        "projects",
                                        data.projects.filter((_, idx) => idx !== i)
                                    )
                                }
                                onChange={(updated) => update("projects", updated)}
                                title="Projects"
                                description="Add your projects"
                                type="Project"
                                render={(item, updateItem) => (
                                    <>
                                        <Input
                                            placeholder="Project Name"
                                            value={item.name}
                                            onChange={(v) => updateItem("name", v)}
                                        />
                                        <Input
                                            placeholder="Project Type"
                                            value={item.projectType}
                                            onChange={(v) => updateItem("projectType", v)}
                                        />
                                        <Textarea
                                            placeholder="Describe your project..."
                                            value={item.desc}
                                            onChange={(v) => updateItem("desc", v)}
                                        />
                                    </>
                                )}
                            />
                        )}
                        {step === 6 && (
                            <>
                                <h3 className="text-lg font-semibold mb-1">Skills</h3>
                                <p className="text-sm text-gray-700">Add your technical and soft skills</p>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                                        value={data.skillInput}
                                        onChange={(v) => skillUpdate("skillInput", v)}
                                    />
                                    <button
                                        onClick={addSkill}
                                        className="flex items-center gap-2 rounded-lg px-4 h-10 cursor-pointer text-sm transition
               bg-[var(--primary)] hover:bg-indigo-600 text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {Array.isArray(data.skills) &&
                                        data.skills.map((skill, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 bg-blue-100 text-blue-800 text-[13px] rounded-full px-3 py-1 text-sm"
                                            >
                                                <span>{skill}</span>
                                                <button
                                                    onClick={() => removeSkill(i)}
                                                    className="hover:bg-blue-200  p-[2px] rounded-full"
                                                >
                                                    <X className="w-[13px] h-[13px] cursor-pointer" />
                                                </button>
                                            </div>
                                        ))}


                                </div>
                                <p className="text-[13px] leading-5 mb-8 bg-blue-100 text-blue-800 p-3 rounded-lg m-auto mt-0 "><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
                            </>

                        )}
                        {/* NEXT / SAVE / DOWNLOAD */}
                        <button
                            onClick={handleSave}
                            type="button"
                            className="rounded-lg border border-green-300 text-green-600 bg-green-100  font-medium px-5 py-2 cursor-pointer hover:border-green-600 text-[13px]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                {/* RIGHT — PREVIEW */}
                <div className="w-full" ref={previewRef}>
                    <div id="resume-preview" className="border border-gray-300 print:shadow-none print:border-none "><div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
                        <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accent }}>
                            <h1 className="text-3xl font-bold mb-2" style={{ color: accent }}>{data.name || "Your Name"}</h1>
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
                                <h2 className="text-xl font-semibold mb-3" style={{ color: accent }}>PROFESSIONAL SUMMARY</h2>
                                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
                            </section>
                        }
                        {Array.isArray(data.experience) && data.experience.length > 0 &&
                            <section className="mb-6">
                                <h2 className="text-xl font-semibold mb-4" style={{ color: accent }}>PROFESSIONAL EXPERIENCE</h2>
                                <div className="space-y-4">
                                    {(data.experience || []).map((e, i) => (
                                        <div className="border-l-3 pl-4" style={{ borderColor: accent }} key={i}>
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
                                <h2 className="text-xl font-semibold mb-4" style={{ color: accent }}>PROJECTS</h2>

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
                                <h2 className="text-xl font-semibold mb-4" style={{ color: accent }}>EDUCATION</h2>
                                <div className="space-y-3">
                                    {(data.education || []).map((e, i) => (
                                        <div key={i} className="flex justify-between items-start"><div>
                                            <h3 className="font-semibold text-gray-900">{e.degree}</h3>
                                            <p className="text-gray-700">{e.school}</p>
                                            {e.gpa && <p className="text-sm text-gray-600">GPA: {e.gpa}</p> }
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
                                <h2 className="text-xl font-semibold mb-4" style={{ color: accent }}>CORE SKILLS</h2>
                                <div className="flex gap-4 flex-wrap">
                                    {(data.skills || []).map((skill, i) => (
                                        <div key={i} className="text-gray-700">• {skill}</div>
                                    ))}
                                </div>
                            </section>
                        }
                    </div>
                    </div>
                </div>
            </div>
            {alert && (
                <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-70 bg-white flex gap-3 p-3 text-sm rounded shadow-lg transition-all duration-300 z-50`}>
                    <CheckCircle className="w-5 text-green-500" />
                    <div>
                        <h3 className="font-medium">{alert.title}</h3>
                        <p className="text-slate-500">{alert.message}</p>
                    </div>
                </div>
            )}

        </div>
    )
}

/* ---------- SMALL COMPONENTS ---------- */
const Input = ({
    label,
    value,
    onChange,
    required = false,
    icon: Icon = null,
    placeholder = "", // new prop
}) => (
    <div className="w-full">
        {label && <label className="text-sm font-medium flex items-center gap-2 mb-2 text-gray-600">
            {Icon && <Icon className="w-4 h-4" />}
            <span>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </span>
        </label>}
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder} // added here
            className="mt-1 h-10 w-full rounded-md border border-gray-300 px-3
                    outline-none focus:ring-2 ring-[var(--primary)] text-sm w-full"
        />
    </div>
);



const Textarea = ({ label, value, onChange, placeholder = "" }) => (
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
);


const Repeatable = ({
    items = [],
    onAdd,
    onRemove,
    onChange,
    render,
    title,
    description,
    type // optional type for new items
}) => (
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
                <h2 className="mb-0">{type + " #" + (i + 1)}</h2>
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
);



const Section = ({ title, children }) =>
    children ? (
        <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    ) : null
