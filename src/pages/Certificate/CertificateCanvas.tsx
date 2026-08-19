import React from "react";
import type { CertificateLayout } from "../../types/Certificate";

interface CanvasProps {
  layout: CertificateLayout;
  logoUrl?: string | null;
  bgImageUrl?: string | null;
}

export const CertificateCanvas: React.FC<CanvasProps> = ({
  layout,
  logoUrl,
  bgImageUrl,
}) => {
  const { page, colors, texts, fields, logo, backgroundImage } = layout;

  return (
    <div className="w-full flex justify-center items-center p-4 bg-gray-200 overflow-auto">
      {/* Container simulating A4 Landscape (Standard ratio 842px x 595px) */}
      <div
        className="relative shadow-2xl border transition-all duration-300 bg-white overflow-hidden"
        style={{
          width: "842px",
          height: "595px",
          backgroundColor: page.backgroundColor,
          backgroundImage:
            backgroundImage.enabled && bgImageUrl ? `url(${bgImageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: backgroundImage.enabled ? backgroundImage.opacity : 1,
        }}
      >
        {/* Title */}
        <h1
          className="absolute text-center w-full font-serif font-bold"
          style={{ top: "100px", color: colors.primary, fontSize: "36px" }}
        >
          {texts.title}
        </h1>

        {/* Subtitles */}
        <p
          className="absolute text-center w-full"
          style={{ top: "160px", color: colors.secondary, fontSize: "14px" }}
        >
          {texts.congratulations}
        </p>

        {/* Dynamic Fields */}
        {Object.entries(fields).map(([key, field]) => {
          if (!field.enabled) return null;

          // Mock Data to show during editing
          const mockValues: Record<string, string> = {
            studentName: "John Doe",
            courseName: "Advanced React & TypeScript",
            grade: "A+ (98%)",
            completionDate: "2026-08-01",
            issueDate: "2026-08-11",
            certificateId: "CERT-2026-8891",
          };

          return (
            <div
              key={key}
              className="absolute transform -translate-x-1/2 whitespace-nowrap"
              style={{
                left: `${field.x}px`,
                top: `${field.y}px`,
                fontSize: `${field.fontSize}px`,
                textAlign: field.align,
                color: key === "studentName" ? colors.primary : colors.secondary,
              }}
            >
              {field.label && <span className="font-semibold mr-1">{field.label} </span>}
              <span className={key === "studentName" ? "font-bold border-b-2 border-amber-500 pb-1" : ""}>
                {mockValues[key]}
              </span>
            </div>
          );
        })}

        {/* Logo Element */}
        {logo.enabled && logoUrl && (
          <img
            src={logoUrl}
            alt="Certificate Logo"
            className="absolute object-contain"
            style={{
              left: `${logo.x}px`,
              top: `${logo.y}px`,
              width: `${logo.width}px`,
              height: `${logo.height}px`,
            }}
          />
        )}
      </div>
    </div>
  );
};