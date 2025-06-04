"use client";
import { UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DeleteIcon, FileIcon } from "src/ultils/Icons";

interface FileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
}

export default function FileUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Setup drag and drop event listeners
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Only set isDragging to false if we're leaving the drop area
      // Check if the related target is not contained within the drop area
      if (!dropArea.contains(e.relatedTarget as Node)) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragenter", handleDragEnter);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragenter", handleDragEnter);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);

    // Reset the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    const newFiles = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
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
        }),
      );
    }, 300);
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="flex flex-col gap-6 min-w-full  mx-auto rounded-xl">
      <div className="space-y-1.5">
        <h2 className="text-[#FFFFFF99] 3xl:text-lg font-medium">Attachments</h2>
        <div
          ref={dropAreaRef}
          className={`border transition-colors py-3 md:!py-5 rounded-[10px] flex justify-center cursor-pointer items-center 
           hover:!border-[#FF518C] hover:bg-[rgba(255,81,140,0.1)]
          ${isDragging ? "!border-[#FF518C] bg-[rgba(255,81,140,0.1)]" : "!border-[rgba(255,255,255,0.30)]"}`}
        >
          <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer text-white transition-colors text-base flex items-center gap-2">
            <span>
              <UploadIcon width={17} stroke={isDragging ? "#FF518C" : "currentColor"} />
            </span>
            {isDragging ? "Drop files to upload!" : "Drop files here or Browse"}
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
              <FileIcon />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm 3xl:text-base text-white text-opacity-50 truncate pr-3">{file.name}</p>
              <span className="text-xs 3xl:text-sm text-slate-500">{file.size}</span>

              {/* Progress Bar */}
              {file.progress < 100 && (
                <div className="relative h-1 bg-slate-700 rounded-full mt-2">
                  <div className="absolute top-0 left-0 h-full bg-[#FF518C] transition-all duration-300" style={{ width: `${file.progress}%` }} />
                </div>
              )}
            </div>
            {file.progress < 100 && <span className="text-xs text-slate-500 w-7">{Math.round(file.progress)}%</span>}

            <button className="text-slate-500 hover:text-red-400 3xl:h-8 w-5 3xl:w-8" onClick={() => handleDelete(file.id)}>
              <DeleteIcon />
              <span className="sr-only">Delete file</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
