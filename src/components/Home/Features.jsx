import { Download, KeyRound, SquarePen, Zap } from "lucide-react"
import React, { useState } from "react"




export default function Features() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const features = [
    {
      title: "Real-Time Analytics",
      desc: "Get instant insights into your finances with live dashboards.",
      color: "violet",
      icon: (<KeyRound className="w-6 text-violet-600" />),
    },
    {
      title: "Bank-Grade Security",
      desc: "End-to-end encryption, 2FA, compliance with GDPR standards.",
      color: "green",
      icon: (<SquarePen className="w-6 text-green-600" />),
    },
    {
      title: "Customizable Reports",
      desc: "Export professional, audit-ready financial reports for tax or internal review.",
      color: "orange",
      icon: (<Download className="w-6 text-orange-600" />),
    },
  ]
  const colorMap = {
    violet: "bg-violet-100 border-violet-300 text-violet-600",
    green: "bg-green-100 border-green-300 text-green-600",
    orange: "bg-orange-100 border-orange-300 text-orange-600",
  };

  return (
    <div id="features" className="flex flex-col items-center my-10 mt-25">
      <div className="flex items-center gap-2 text-sm text-(--primary) bg-(--primary)/10 rounded-full px-6 py-1.5">
        <Zap className="w-4" />
        <span>Simple Process</span>
      </div>
      <div className="text-center mt-6 text-slate-700">
        <h2 className="text-3xl sm:text-4xl font-medium">Build your resume</h2>
        <p className="max-sm max-w-2xl mt-4 text-slate-500">Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and process.</p>
      </div>
      <div className="flex flex-col md:flex-row items-center xl:-mt-10">
        <img className="max-w-3xl w-full xl:-ml-32" alt="" src="/images/process.png" />
        <div className="flex flex-col gap-4">
          {features.map((item, i) => {
            const isActive = hoverIndex === i || (hoverIndex === null && i === 0); // first active by default

            return (
              <div
                key={i}
                className="flex items-center justify-center gap-6 max-w-md cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div
                  className={`p-6 flex gap-4 rounded-xl transition-colors border
    ${isActive ? colorMap[item.color] : "border-transparent"}`}
                >
                  {item.icon}
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-slate-700">
                      {item.title}
                    </h3>
                    <p className="text-sm max-w-xs text-slate-600">{item.desc}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
