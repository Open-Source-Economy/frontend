"use client";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { DeleteIcon, FileIcon } from "src/Utils/Icons";

interface FileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach(file => {
      simulateFileUpload(file.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      setFiles(prevFiles =>
        prevFiles.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 10, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 300);
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="flex flex-col gap-6  min-w-full max-w-md mx-auto  rounded-xl ">
      <div className="space-y-1.5">
        {" "}
        <h2 className="text-[#FFFFFF99]  3xl:text-lg font-medium">Attachments</h2>
        <div className="border !border-[rgba(255,255,255,0.30)] py-3 md:!py-5 rounded-[10px] flex justify-center items-center">
          <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer text-white transition-colors text-base flex items-center gap-2">
            <span>
              <UploadIcon width={17} />
            </span>
            Drop files here or Browse
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {files.map(file => (
          <div
            style={{ borderBottom: "1.5px solid rgba(255,255,255,0.30)" }}
            key={file.id}
            className="flex flex-wrap sm:flex-nowrap items-end gap-1.5 sm:gap-3 group relative pb-2.5 sm:pb-4 pt-2.5"
          >
            <span className="w-7 xl:w-10 3xl:w-[52px]">
              {" "}
              <FileIcon />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm 3xl:text-base text-white text-opacity-50 truncate pr-3">{file.name}</p>
              <span className="text-xs 3xl:text-sm text-slate-500">{file.size}</span>

              {/* Progress Bar */}
              {file.progress < 100 && (
                <div className="relative h-1 bg-slate-700 rounded-full mt-2">
                  <div className="absolute top-0 left-0 h-full  bg-[#FF518C] transition-all duration-300" style={{ width: `${file.progress}%` }} />
                </div>
              )}
            </div>
            {file.progress < 100 && <span className="text-xs text-slate-500 w-7">{Math.round(file.progress)}%</span>}

            <button className="text-slate-500 hover:text-red-400 3xl:h-8 w-5  3xl:w-8" onClick={() => handleDelete(file.id)}>
              <DeleteIcon />
              <span className="sr-only">Delete file</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
