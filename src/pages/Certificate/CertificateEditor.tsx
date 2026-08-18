import React, { useState } from "react";
import type { CertificateTemplate, CertificateLayout } from "../../types/certificate";
import { CertificateCanvas } from "./CertificateCanvas";

// --- Icons للأصناف والحقول ---
const TextIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
);
const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const ImageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);
const IdIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3 3 0 00-3 3h6a3 3 0 00-3-3z" /></svg>
);

// البيانات الابتدائية المأخوذة مباشرة من الـ JSON الخاص بك
const initialLayout: CertificateLayout = {
  page: { size: "A4", orientation: "landscape", backgroundColor: "#ffffff" },
  colors: { primary: "#1a365d", secondary: "#4a5568", accent: "#c9a227" },
  texts: {
    title: "Certificate of Completion",
    congratulations: "Congratulations on successfully completing this course.",
    recognition: "This certificate is awarded in recognition of your achievement.",
  },
  fields: {
    studentName: { x: 421, y: 220, fontSize: 32, align: "center", enabled: true },
    courseName: { x: 421, y: 290, fontSize: 18, align: "center", enabled: true, label: "Course:" },
    grade: { x: 421, y: 340, fontSize: 16, align: "center", enabled: true, label: "Final Grade:" },
    completionDate: { x: 200, y: 480, fontSize: 12, align: "left", enabled: true, label: "Completion Date:" },
    issueDate: { x: 642, y: 480, fontSize: 12, align: "right", enabled: true, label: "Issue Date:" },
    certificateId: { x: 421, y: 520, fontSize: 10, align: "center", enabled: true, label: "Certificate ID:" },
  },
  logo: { x: 371, y: 60, width: 100, height: 60, enabled: false },
  backgroundImage: { opacity: 0.15, enabled: false },
};

export const CertificateEditor = () => {
  const [name, setName] = useState("Aya certificate");
  const [description, setDescription] = useState("Awarded after passing certifying exams");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [isDefault, setIsDefault] = useState(true);
  const [layout, setLayout] = useState<CertificateLayout>(initialLayout);
  
  const [logoPath, setLogoPath] = useState<string | null>(null);
  const [bgPath, setBgPath] = useState<string | null>(null);

  // Dynamic Selected Field State
  const [selectedField, setSelectedField] = useState<string>("studentName");
  const [fontSize, setFontSize] = useState(32);

  // المربعات المضافة بناءً على متطلبات الداتا الموجودة في الـ JSON
  const availableElements = [
    { id: "custom_text", label: "Enter Custom Text", icon: "+" },
    // Texts Group
    { id: "title", label: "Title Text", icon: <TextIcon /> },
    { id: "congratulations", label: "Congratulations", icon: <TextIcon /> },
    { id: "recognition", label: "Recognition", icon: <TextIcon /> },
    // Dynamic Fields Group
    { id: "studentName", label: "Student Name", icon: <UserIcon /> },
    { id: "courseName", label: "Course Name", icon: "📘" },
    { id: "grade", label: "Grade", icon: "🎓" },
    { id: "completionDate", label: "Completion Date", icon: <CalendarIcon /> },
    { id: "issueDate", label: "Issue Date", icon: <CalendarIcon /> },
    { id: "certificateId", label: "Certificate ID", icon: <IdIcon /> },
    // Logo Option
    { id: "logo", label: "Logo", icon: <ImageIcon /> },
  ];

  const handleSave = () => {
    const payload: CertificateTemplate = {
      name,
      description,
      status,
      isDefault,
      layout,
      logoPath,
      backgroundImagePath: bgPath,
    };
    console.log("Submitting Payload to API:", payload);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f4f5f8] font-sans overflow-hidden">
      
      {/* 1. Top Header Bar */}
      <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-base font-bold text-gray-800 border-b border-transparent hover:border-gray-300 focus:border-emerald-500 outline-none px-1 py-0.5"
          />
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-medium">
            {status}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="bg-[#10b981] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#059669] transition-all cursor-pointer shadow-xs"
          >
            Update
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* 2. Elements Drawer (تمت إزالة الـ Navigation Sidebar الجانبي) */}
        <aside className="w-64 bg-[#27272a] border-r border-zinc-800 text-white flex flex-col p-4 overflow-y-auto shrink-0 z-10">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-700/60 mb-4">
            <h2 className="text-sm font-bold text-gray-200">Elements</h2>
            <span className="text-xs text-zinc-400">Data Fields</span>
          </div>

          {/* Grid of Dynamic Element Tags matching the JSON */}
          <div className="grid grid-cols-2 gap-2.5">
            {availableElements.map((el) => (
              <button
                key={el.id}
                onClick={() => setSelectedField(el.id)}
                className={`flex flex-col items-center justify-center gap-2 p-3 bg-[#3f3f46]/40 hover:bg-[#3f3f46] border border-zinc-700/50 rounded-xl transition-all cursor-pointer text-center group ${
                  selectedField === el.id ? "ring-2 ring-emerald-500 bg-[#3f3f46]" : ""
                }`}
              >
                <div className="text-gray-300 group-hover:text-white text-base">
                  {el.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-300 group-hover:text-white leading-tight">
                  {el.label}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* 3. Main Canvas Workspace */}
        <main className="flex-1 flex flex-col items-center p-6 overflow-auto relative">
          
          {/* Floating Element Formatting Toolbar */}
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-2 flex items-center gap-3 mb-6 z-20">
            {/* Field Placeholder Name */}
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              [{selectedField}]
            </span>

            {/* Color Picker Indicator */}
            <div className="w-5 h-5 rounded bg-[#1a365d] border border-gray-300 cursor-pointer" title="Primary Color" />

            {/* Font Size Controls */}
            <div className="flex items-center border border-gray-200 rounded-lg px-2 py-0.5 gap-2 text-xs font-semibold">
              <button
                onClick={() => setFontSize((prev) => Math.max(8, prev - 2))}
                className="text-gray-500 hover:text-gray-800"
              >
                -
              </button>
              <span>{fontSize}</span>
              <button
                onClick={() => setFontSize((prev) => prev + 2)}
                className="text-gray-500 hover:text-gray-800"
              >
                +
              </button>
            </div>

            {/* Font Family Dropdown */}
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none text-gray-700 font-medium">
              <option>Serif</option>
              <option>Sans-serif</option>
              <option>Monospace</option>
            </select>

            <div className="h-4 w-px bg-gray-200" />

            {/* Styles Toggles */}
            <button className="text-xs font-bold px-2 py-1 hover:bg-gray-100 rounded text-gray-700">B</button>
            <button className="text-xs italic px-2 py-1 hover:bg-gray-100 rounded text-gray-700">I</button>
            <button className="text-xs px-2 py-1 hover:bg-gray-100 rounded text-gray-700">≡</button>

            <div className="h-4 w-px bg-gray-200" />

            {/* Action Buttons */}
            <button className="text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1">Copy</button>
            <button className="text-xs font-medium text-red-500 hover:text-red-700 px-2 py-1">Delete</button>
          </div>

          {/* Canvas Wrapper */}
          <div className="shadow-2xl rounded-lg overflow-hidden bg-white border border-gray-200">
            <CertificateCanvas
              layout={layout}
              logoUrl={logoPath}
              bgImageUrl={bgPath}
            />
          </div>
        </main>
      </div>
    </div>
  );
};