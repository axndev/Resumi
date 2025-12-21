import React, { useState, useEffect, useRef } from "react"
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
    User,
    Briefcase,
    FileText,
    GraduationCap,
    FolderGit2,
    Plus,
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
    LayoutTemplate,
} from "lucide-react"
import { useAuth } from "@clerk/clerk-react"
import Classic from "../components/Templates/Classic";
import Modern from "../components/Templates/Modern";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Repeatable from "../components/ui/Repeatable";
import Alert from "../components/ui/Alert";

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
    const [visible, setVisible] = useState(false);
    const resumeTitle = location.state?.title || "";
    const [step, setStep] = useState(1);
    const [toggleAccents, setToggleAccents] = useState(false);
    const [toggleTemplates, setToggleTemplates] = useState(false);

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
        accent: localStorage.getItem("accent") || "#3B82F6",
        template: localStorage.getItem("templates") || "Modern",
    });

    const [userResumes, setUserResumes] = useState([]);
    const previewRef = useRef();

    useEffect(() => {
        document.title = 'Editing - ' + (resumeTitle || 'Resume');
    }, [resumeTitle]);


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
        setVisible(true);
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
        setAlert({ title: "Saved successfully" });

        // Hide after 3 seconds
        setTimeout(() => {
            setVisible(false);
        }, 3000);

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

    const templates = {
        Classic: "A clean, traditional resume format with clear sections and professional typography",
        Modern: "Sleek design with strategic use of color and modern font choices"
    };

    const handleAccentChange = (newAccent) => {
        setData(prev => ({ ...prev, accent: newAccent }));
        localStorage.setItem("accent", newAccent);
    };

    const handleTemplateChange = (newTemplate) => {
        setData(prev => ({ ...prev, template: newTemplate }));
        localStorage.setItem("template", newTemplate);
    };

    const formatUrl = (url) => {
        if (!url) return "#";
        if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
        }
        return "https://" + url;
    };

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);
    return (
        <div className="min-h-screen bg-gray-50 pt-0 pb-25">

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
                <Link to="/app" className="inline-flex text-sm gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
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

            {/* Resume Builder */}
            <div className="mx-auto grid gap-8 px-6 md:grid-cols-[0.8fr_1.2fr] max-w-7xl">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* FORM */}
                    <div className="rounded-lg border border-gray-300 bg-white p-6 space-y-6">
                        <div className="flex justify-between sm:gap-4 gap-2 pb-3 border-b border-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col text-sm relative">
                                    <button
                                        onClick={() => setToggleTemplates(prev => !prev)}
                                        type="button"
                                        className="peer flex items-center gap-2 rounded-md text-sm border-transparent bg-(--primary)/10 text-(--primary) border px-4 py-2 hover:border-(--primary) cursor-pointer"
                                    >
                                        <LayoutTemplate className="w-4 h-4" />
                                        <span className="hidden sm:block">Template</span>
                                    </button>
                                    {toggleTemplates && (
                                        <ul
                                            className="absolute top-10 left-0 right-0 z-20
               flex flex-col gap-2 bg-white border border-gray-300
               sm:w-75 w-65 gap-2 rounded-md shadow-md mt-2 p-3"
                                        >
                                            {Object.entries(templates).map(([key, desc]) => (
                                                <div
                                                    onClick={() => {
                                                        handleTemplateChange(key);
                                                        setToggleTemplates(false);
                                                    }}
                                                    key={key} className="relative p-3 border rounded-md cursor-pointer transition-all border-gray-300 hover:border-gray-400 hover:bg-gray-100">
                                                    {data.template == key &&
                                                        <div className="absolute top-2 right-2">
                                                            <div className="size-5 bg-blue-400 text-white rounded-full flex items-center justify-center">
                                                                <Check className="w-4" />
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="space-y-1">
                                                        <h4 className="font-medium text-gray-800">{key}</h4>
                                                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                                                            {desc}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="flex flex-col text-sm relative">
                                    <button
                                        onClick={() => setToggleAccents(prev => !prev)}
                                        type="button"
                                        className="peer flex items-center gap-2 rounded-md text-sm border-transparent bg-blue-100 text-blue-500 border px-4 py-2 hover:border-blue-500 cursor-pointer"
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
                                                        handleAccentChange(color);
                                                        setToggleAccents(false);
                                                    }}
                                                >
                                                    <li
                                                        className={`relative w-12 h-12 rounded-full
                      hover:border-2 hover:border-gray-600
                      ${data.accent === color ? "border-2 border-gray-300" : ""}`}
                                                        style={{ backgroundColor: color }}
                                                    >
                                                        {data.accent === color && (
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
                    {data.template === "Classic" && <Classic data={data} />}
                    {data.template === "Modern" && <Modern data={data} formatUrl={formatUrl} />}
                </div>
            </div>

            {/* Alert */}
            <Alert alert={alert} visible={visible} />
        </div>
    )
}

