export {};
// import React, { useState } from "react";
// import * as dto from "@open-source-economy/api-types";
// import { ApiError } from "../../../../../../ultils/error/ApiError";
//
// // --- Inline SVG Components ---
// const CloseIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
//
// const GitHubIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
//       fill="white"
//     />
//   </svg>
// );
//
// interface SelectProjectsModalProps {
//   service: dto.Service;
//   developerService: dto.DeveloperService[] | null;
//   developerProjectItems: [dto.DeveloperProjectItem][];
//   currency: dto.Currency;
//   onClose: () => void;
//   onUpsertDeveloperService: (upsertedServices: dto.DeveloperService[]) => void;
//   onBack: () => void;
// }
//
// // --- Component ---
// export default function SelectProjectsModal(props: SelectProjectsModalProps) {
//   const [selectedDeveloperProjectItemIds, setSelectedDeveloperProjectItemIds] = useState<[dto.DeveloperProjectItem][]>(props.developerService?.developerProfileId);
//   const [hourlyRate, setHourlyRate] = useState<number | null>(props.developerService.hourlyRate?);
//   const [currency, setCurrency] = useState<dto.Currency>(/*props.developerService.currency || */ dto.Currency.EUR); // TODO: lolo
//   const [customResponseTime, setCustomResponseTime] = useState<string>(props.developerService.responseTimeHours?.toString() || "12");
//
//   const [error, setError] = useState<ApiError | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//
//
//   const handleSave = () => {
//     const updatedDevService = {
//       ...props.developerService,
//       projectItemId: new dto.ProjectItemId(selectedDeveloperProjectItemIds),
//       hourlyRate: Number(hourlyRate),
//       currency: currency,
//       responseTimeHours: props.service.hasResponseTime ? Number(customResponseTime) : null,
//     };
//     props.onUpsertDeveloperService(updatedDevService);
//   };
//
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-[#14233a] rounded-md p-6 w-[500px] border border-[rgba(255,255,255,0.2)]">
//         <div className="flex flex-row gap-4 items-center justify-between mb-6">
//           <div>
//             <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70">
//               <p className="block leading-[1.5]">{props.service.name}</p>
//             </div>
//           </div>
//           <button onClick={props.onClose} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
//             <CloseIcon />
//           </button>
//         </div>
//         <div className="mb-4">
//           <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">For Which Project?</p>
//           <div className="bg-[#202f45] rounded-md p-3">
//             {isLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">Loading your repositories...</div>
//               </div>
//             ) : props.developerProjectItems.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-4 gap-2">
//                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">
//                   No repositories found. Please add repositories in Step 2 first.
//                 </div>
//                 <button onClick={onBack} className="text-[#ff7e4b] hover:text-[#ff518c] transition-colors text-sm underline">
//                   Go back to Step 2
//                 </button>
//               </div>
//             ) : (
//               props.developerProjectItems.map(([projectItem, devProjectItem]) => {
//                 const isSelected = selectedDeveloperProjectItemIds === devProjectItem.id.uuid;
//                 return (
//                   <div key={devProjectItem.id.uuid} className="flex flex-row gap-2 items-center mb-2">
//                     <label className="flex flex-row gap-2 items-center cursor-pointer">
//                       <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
//                         <input
//                           type="radio"
//                           name="project-selection"
//                           checked={isSelected}
//                           onChange={() => setSelectedDeveloperProjectItemIds(devProjectItem.id.uuid)}
//                           className="w-full h-full opacity-0 cursor-pointer"
//                         />
//                         {isSelected && (
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-full flex items-center justify-center">
//                             <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <circle cx="5" cy="5" r="5" fill="white" />
//                             </svg>
//                           </div>
//                         )}
//                         <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-full" />
//                       </div>
//                       <div className="flex flex-row gap-2 items-center">
//                         <GitHubIcon />
//                         <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">
//                           {/*{projectItem.sourceIdentifier}*/}
//                           TODO: lolo
//                         </span>
//                       </div>
//                     </label>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//         <div className="mb-4">
//           <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Want to change your hourly rate for this service? ℹ️</p>
//           <div className="flex flex-row gap-2 items-center">
//             <select
//               value={currency}
//               onChange={e => setCurrency(e.target.value as dto.Currency)}
//               className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none"
//             >
//               <option value={dto.Currency.EUR}>€ (EUR)</option>
//               <option value={dto.Currency.USD}>$ (USD)</option>
//               <option value={dto.Currency.GBP}>£ (GBP)</option>
//             </select>
//             <input
//               type="text"
//               value={hourlyRate}
//               onChange={e => setHourlyRate(e.target.value)}
//               placeholder="100"
//               className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none flex-1"
//             />
//           </div>
//         </div>
//         {service.hasResponseTime && (
//           <div className="mb-4">
//             <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Response Time</p>
//             <p className="font-montserrat font-normal text-[#ffffff] text-[12px] text-left mb-2 opacity-70">Expected time to respond to requests</p>
//             <div className="flex flex-row gap-2 items-center">
//               <input
//                 type="text"
//                 value={customResponseTime}
//                 onChange={e => setCustomResponseTime(e.target.value)}
//                 placeholder="12"
//                 className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none w-20"
//               />
//               <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">hours</span>
//             </div>
//           </div>
//         )}
//         <div className="flex flex-row gap-4 items-center justify-end">
//           <button
//             onClick={handleSave}
//             disabled={!selectedDeveloperProjectItemIds}
//             className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
//               !selectedDeveloperProjectItemIds
//                 ? "bg-gray-500 opacity-50 cursor-not-allowed"
//                 : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
//             }`}
//           >
//             <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//               <p className="block leading-[1.5] whitespace-pre">Select Project</p>
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
