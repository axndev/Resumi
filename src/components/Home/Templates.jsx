import { useAuth } from "@clerk/clerk-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function Templates() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [userResumes, setUserResumes] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const features = [
    {
      title: "Classic",
      desc: "Generate professional resumes in minutes with intelligent suggestions and formatting guidance.",
      image: "/images/classic.png",
    },
    {
      title: "Modern",
      desc: "Use ready-made templates that pass applicant tracking systems and highlight your skills effectively.",
      image: "/images/modern.png",
    },
  ];

  const handleCreate = async (template) => {
    if (!userId) return  navigate(`/register`);
       const appId = new Date().getTime().toString();
    try {
      // Insert new resume into Supabase
      const { data, error } = await supabase
        .from("resumes")
        .insert([
          {
            user_id: userId,
            title: template.title,
            data: {
                id: appId,
              accent: "#3B82F6",
              template: template.title,
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
            },
          },
        ])
        .select() // returns inserted row(s)
        .single();

      if (error) throw error;

      // Update local state
      const updatedResumes = [...userResumes, data];
      setUserResumes(updatedResumes);

      // Navigate to builder using data.id
      navigate(`/app/builder/${data.id}`, { state: { title: data.title } });
    } catch (err) {
      console.error("Failed to create resume:", err.message);
      setAlert({ title: "Failed to create resume" });
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    }
  };

  return (
    <div id="templates" className="flex flex-col max-w-6xl m-auto mb-10 mt-10">
      <div className="text-left mt-10">
        <h2 className="md:text-5xl text-3xl font-semibold">
          Professional Templates
        </h2>
        <p className="text-gray-700 md:mt-5 mt-2 max-w-md">
          Browse professional templates and start building your resume in
          minutes.
        </p>
      </div>

      <div className="relative max-w-6xl mt-10 w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedTemplate(item)}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white overflow-hidden
             transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative h-[320px] bg-slate-100 overflow-hidden border-b border-gray-200">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-top
                 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {item.desc}
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-(--primary)">
                Preview template
                <ChevronRight className="w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-10 text-center">
        More ATS-optimized templates coming soon
      </p>
      {/* Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white mx-2 rounded-lg max-w-3xl w-full p-6 flex flex-col md:flex-row gap-6 relative">
            <div className="bg-gray-100/50 max-w-90 rounded border border-gray-300 p-1">
              <img
                src={selectedTemplate.image}
                alt=""
                className="w-full rounded-md shadow object-contain"
              />
            </div>
            <div className="flex flex-col items-start md:gap-5 md:w-1/2">
              <div className="md:mt-10">
                <h3 className="text-2xl font-semibold">
                  {selectedTemplate.title}
                </h3>
                <p className="text-slate-500 mt-5">{selectedTemplate.desc}</p>
                <span className="bg-black/80 text-white text-xs px-3 py-1 mt-5 inline-block rounded-full">
                  ATS Friendly
                </span>
              </div>
              <button
                onClick={() => handleCreate(selectedTemplate)}
                className="bg-(--primary) flex mt-3 gap-1 hover:gap-2 transition-all duration-100 items-center text-sm text-white w-auto px-4 py-2 rounded hover:bg-(--primary)/90 cursor-pointer transition"
              >
                <span>Create</span>
                <ChevronRight className="w-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute top-6 right-6 text-slate-500 bg-red-500 hover:bg-red-400 transition text-white cursor-pointer p-1 rounded"
            >
              <X />
            </button>
          </div>
        </div>
      )}
      <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

export default Templates;
