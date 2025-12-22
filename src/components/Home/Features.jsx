import { Bot, Download, KeyRound, MonitorSmartphone, ScrollText, SquarePen, Zap } from "lucide-react"
import React, { useState } from "react"




export default function Features() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const features = [
    {
      title: "AI-Powered Resume Builder",
      desc: "Generate professional resumes in minutes with intelligent suggestions and formatting guidance.",
      icon: (<Bot className="w-6 " />),
    },
    {
      title: "ATS-Friendly Templates",
      desc: "Use ready-made templates that pass applicant tracking systems and highlight your skills effectively.",
      icon: (<ScrollText className="w-6 " />),
    },
    {
      title: "Mobile & Desktop Ready",
      desc: "Build and download resumes seamlessly on any device, anytime, without compatibility issues.",
      icon: (<MonitorSmartphone className="w-6 " />),
    },
  ]
  const colorMap = {
    violet: "bg-violet-100 border-violet-300 text-violet-600",
    green: "bg-green-100 border-green-300 text-green-600",
    orange: "bg-orange-100 border-orange-300 text-orange-600",
  };

  return (
    <div id="features" className="flex flex-col max-w-5xl m-auto my-10">
      <div className="text-left mt-6">
        <h2 class="text-5xl font-semibold">Powerful Features</h2>
        <p class="text-slate-500  mt-2 max-w-md">Everything you need to manage, track, and grow your finances, securely and efficiently.</p>
      </div>
      <div class="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {features.map((item, i) => (
          <div class='bg-linear-to-b text-(--primary) from-white to-(--primary)/20 border border-slate-200 rounded-lg p-6 space-y-3 hover:-translate-y-1 transition duration-300'>
            <div className="p-2 bg-white/50 max-w-fit rounded border border-slate-300 text-(--primary)/50">
              {item.icon}
            </div>
            <p class='font-medium text-lg text-slate-900'>{item.title}</p>
            <p class='text-sm/5 text-slate-500'> {item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
