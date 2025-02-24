"use client";

import { useState } from "react";
import { Button } from "src/views/components";

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
      <h2 className="text-slate-300 text-sm font-medium">Attachments</h2>

      <div className="border border-dashed border-slate-800 p-4 rounded-[10px] text-center">
        <input type="file" multiple onChange={handleFileChange} className="hidden" id="file-upload" />
        <label htmlFor="file-upload" className="cursor-pointer text-slate-300 hover:text-white transition-colors text-sm">
          Drop files here or <span className="text-blue-400 underline">Browse</span>
        </label>
      </div>

      <div className="space-y-4">
        {files.map(file => (
          <div style={{ borderBottom: "1.5px solid rgba(255,255,255,0.30)" }} key={file.id} className="flex items-end gap-3 group relative pb-4 pt-2.5">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <path
                  d="M25.3254 6.6391C26.1537 7.01568 26.9074 7.53823 27.5506 8.18177L40.4813 21.1168C41.1313 21.7668 41.6513 22.5186 42.0218 23.3398M25.3254 6.6391C24.34 6.19178 23.2703 5.96055 22.1881 5.96094H16.8841C14.8729 5.96094 12.944 6.75989 11.5219 8.18204C10.0997 9.6042 9.30078 11.533 9.30078 13.5443V38.4609C9.30078 40.4722 10.0997 42.401 11.5219 43.8232C12.944 45.2453 14.8729 46.0443 16.8841 46.0443H35.1188C37.13 46.0443 39.0589 45.2453 40.481 43.8232C41.9032 42.401 42.7021 40.4722 42.7021 38.4609V26.4793C42.7021 25.3851 42.4659 24.3169 42.0218 23.3398M25.3254 6.6391V19.0043C25.3254 20.1535 25.782 21.2557 26.5947 22.0684C27.4073 22.8811 28.5095 23.3376 29.6588 23.3376L42.0218 23.3398"
                  stroke="#FF518C"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300 truncate pr-4">{file.name}</p>
              <span className="text-xs text-slate-500">{file.size}</span>

              {/* Progress Bar */}
              {file.progress < 100 && (
                <div className="relative h-1 bg-slate-700 rounded-full mt-2">
                  <div className="absolute top-0 left-0 h-full  bg-[#FF518C] transition-all duration-300" style={{ width: `${file.progress}%` }} />
                </div>
              )}
            </div>
            {file.progress < 100 && <span className="text-xs text-slate-500 w-7">{Math.round(file.progress)}%</span>}

            <button className="text-slate-500 hover:text-red-400 h-8 w-8" onClick={() => handleDelete(file.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M4.5 8.5026H6.83333M6.83333 8.5026H25.5M6.83333 8.5026V24.8359C6.83333 25.4548 7.07917 26.0483 7.51675 26.4859C7.95434 26.9234 8.54783 27.1693 9.16667 27.1693H20.8333C21.4522 27.1693 22.0457 26.9234 22.4832 26.4859C22.9208 26.0483 23.1667 25.4548 23.1667 24.8359V8.5026H6.83333ZM10.3333 8.5026V6.16927C10.3333 5.55043 10.5792 4.95694 11.0168 4.51935C11.4543 4.08177 12.0478 3.83594 12.6667 3.83594H17.3333C17.9522 3.83594 18.5457 4.08177 18.9832 4.51935C19.4208 4.95694 19.6667 5.55043 19.6667 6.16927V8.5026M12.6667 14.3359V21.3359M17.3333 14.3359V21.3359"
                  stroke="#FF595B"
                  stroke-width="2.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="sr-only">Delete file</span>
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5">
        <Button audience="USER" level="SECONDARY" size="MEDIUM" className="!capitalize !font-semibold !text-base !font-montserrat">
          Save for later
        </Button>
        <Button audience="USER" level="PRIMARY" size="MEDIUM" className="!capitalize !font-semibold !text-base !font-montserrat">
          Submit Support ticket
        </Button>
      </div>
    </div>
  );
}
