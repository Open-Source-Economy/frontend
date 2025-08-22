// import React, { useState, useEffect } from "react";
// import { OnboardingState } from "../OnboardingFlow";
// import ProgressBar from "../components/ProgressBar";
// import { getOnboardingBackendAPI } from "src/services";
//
// // Inline SVG components replacing localhost assets
// const CloseIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
//
// const AddIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );
//
// interface Step5TasksPreferencesProps {
//   state: OnboardingState;
//   updateState: (updates: Partial<OnboardingState>) => void;
//   onNext: () => void;
//   onBack: () => void;
//   currentStep: number;
// }
//
// interface Task {
//   id: string;
//   serviceId: string;
//   name: string;
//   category: string;
//   projects?: string[];
//   hourlyRate?: number;
//   currency?: string;
//   responseTime?: string;
//   customService?: string;
//   hasResponseTime?: boolean;
// }
//
// interface TasksData {
//   selectedTasks: Task[];
// }
//
// interface RepositoryData {
//   projectItemId: string;
//   repository: string | null;
//   roles: string[];
//   mergeRights: string[];
//   services: any[];
// }
//
// interface ServiceData {
//   id: string;
//   name: string;
//   parentId?: string | null;
//   isCustom: boolean;
//   hasResponseTime: boolean;
// }
//
// interface ServiceCategory {
//   id: string;
//   name: string;
//   services: ServiceData[];
// }
//
// // Dynamic task categories will be built from fetched services
//
// export default function Step5TasksPreferences({ state, updateState, onNext, onBack, currentStep }: Step5TasksPreferencesProps) {
//   const [tasks, setTasks] = useState<TasksData>(state.tasks || { selectedTasks: [] });
//
//   // Repository state
//   const [repositories, setRepositories] = useState<RepositoryData[]>([]);
//   const [loadingRepositories, setLoadingRepositories] = useState(true);
//
//   // Services state
//   const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
//   const [loadingServices, setLoadingServices] = useState(true);
//   const [savingServices, setSavingServices] = useState(false);
//
//   // UpsertProjectItemModal states
//   const [showTaskSelectionModal, setShowTaskSelectionModal] = useState(false);
//   const [showAddProjectModal, setShowAddProjectModal] = useState(false);
//   const [showSelectProjectsModal, setShowSelectProjectsModal] = useState(false);
//   const [showCustomServiceModal, setShowCustomServiceModal] = useState(false);
//   const [showIncidentResponseModal, setShowIncidentResponseModal] = useState(false);
//
//   // Task selection state
//   const [selectedTasksInModal, setSelectedTasksInModal] = useState<string[]>([]);
//
//   // Current task being edited
//   const [currentTaskForProjects, setCurrentTaskForProjects] = useState<Task | null>(null);
//
//   // Project selection state
//   const [selectedProjectsInModal, setSelectedProjectsInModal] = useState<string[]>([]);
//   const [allProjectsSelected, setAllProjectsSelected] = useState(false);
//
//   // Form states
//   const [customServiceText, setCustomServiceText] = useState("");
//   const [hourlyRate, setHourlyRate] = useState(state.availability?.hourlyRate || "");
//   const [currency, setCurrency] = useState(state.availability?.currency || "EUR");
//   const [responseTime, setResponseTime] = useState("12");
//   const [customResponseTime, setCustomResponseTime] = useState("12");
//
//   // Fetch services from database on component mount
//   useEffect(() => {
//     const fetchServices = async () => {
//       setLoadingServices(true);
//       const api = getOnboardingBackendAPI();
//
//       try {
//         console.log("Fetching services from database...");
//         const result = await api.getServices();
//
//         if (result && !(result instanceof Error)) {
//           console.log("Services fetched successfully:", result);
//           console.log("Raw services data:", result.data);
//           // Build service categories from fetched data
//           const services = result.data || [];
//           console.log("Services before building categories:", services);
//           const categories = buildServiceCategories(services);
//           console.log("Built categories:", categories);
//           setServiceCategories(categories);
//         } else {
//           console.error("Failed to fetch services:", result);
//           setServiceCategories([]);
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServiceCategories([]);
//       } finally {
//         setLoadingServices(false);
//       }
//     };
//
//     fetchServices();
//   }, []);
//
//   // Fetch repositories from database on component mount
//   useEffect(() => {
//     const fetchRepositories = async () => {
//       setLoadingRepositories(true);
//       const api = getOnboardingBackendAPI();
//
//       try {
//         console.log("Fetching repositories from database...");
//         const result = await api.getRepositories();
//
//         console.log("Raw API result:", result);
//         console.log("Result type:", typeof result);
//         console.log("Is result an Error?", result instanceof Error);
//
//         if (result && !(result instanceof Error)) {
//           console.log("Repositories fetched successfully:", result);
//           console.log("result.data:", result.data);
//           // Handle the response format: { data: [...] }
//           setRepositories(result.data || []);
//         } else {
//           console.error("Failed to fetch repositories:", result);
//           setRepositories([]);
//         }
//       } catch (error) {
//         console.error("Error fetching repositories:", error);
//         setRepositories([]);
//       } finally {
//         setLoadingRepositories(false);
//       }
//     };
//
//     fetchRepositories();
//   }, []);
//
//   // Helper function to parse PostgreSQL array format like "{item1,item2}" to ["item1", "item2"]
//   const parsePostgresArray = (pgArray: string | string[]): string[] => {
//     if (Array.isArray(pgArray)) {
//       return pgArray;
//     }
//     if (typeof pgArray === "string") {
//       // Remove curly braces and split by comma
//       return pgArray
//         .replace(/[{}]/g, "")
//         .split(",")
//         .filter(item => item.trim() !== "");
//     }
//     return [];
//   };
//
//   // Helper function to build service categories from flat service list
//   const buildServiceCategories = (services: any[]): ServiceCategory[] => {
//     console.log("Building categories from services:", services);
//     const categories: { [key: string]: ServiceCategory } = {};
//
//     // Normalize services to handle both camelCase and snake_case
//     const normalizedServices = services.map(service => ({
//       id: service.id,
//       name: service.name,
//       parentId: service.parentId || service.parent_id,
//       isCustom: service.isCustom || service.is_custom,
//       hasResponseTime: service.hasResponseTime || service.has_response_time,
//     }));
//
//     console.log("Normalized services:", normalizedServices);
//
//     // First pass: create categories (parent services)
//     normalizedServices.forEach(service => {
//       console.log("Processing service:", service, "parentId:", service.parentId);
//       if (!service.parentId) {
//         console.log("Adding parent category:", service.name);
//         categories[service.id] = {
//           id: service.id,
//           name: service.name,
//           services: [],
//         };
//       }
//     });
//
//     console.log("Parent categories created:", Object.keys(categories));
//
//     // Second pass: add child services to categories
//     normalizedServices.forEach(service => {
//       if (service.parentId && categories[service.parentId]) {
//         console.log("Adding child service:", service.name, "to category:", categories[service.parentId].name);
//         categories[service.parentId].services.push(service);
//       } else if (service.parentId) {
//         console.log("WARNING: Parent category not found for service:", service.name, "parentId:", service.parentId);
//       }
//     });
//
//     // Custom services will come from the database with isCustom: true
//     // Group them in an "Other" category if they don't have a parent
//     const customServices = normalizedServices.filter(service => service.isCustom && !service.parentId);
//     if (customServices.length > 0) {
//       categories["custom"] = {
//         id: "custom",
//         name: "Other Task",
//         services: customServices,
//       };
//     }
//
//     const result = Object.values(categories);
//     console.log("Final categories with services:", result);
//     return result;
//   };
//
//   // Convert repositories to the format expected by project selection modals
//   const availableProjects = repositories.map((repo, index) => ({
//     id: repo.projectItemId,
//     organization: repo.repository ? repo.repository.split("/")[0] : `unknown-${index}`,
//     repository: repo.repository ? repo.repository.split("/")[1] : `repo-${index}`,
//     role: parsePostgresArray(repo.roles).join(", "),
//     mergeRights: parsePostgresArray(repo.mergeRights).join(", "),
//   }));
//
//   const handleTaskSelection = (service: ServiceData, categoryName: string) => {
//     const taskKey = `${service.id}:${service.name}`;
//     setSelectedTasksInModal(prev => {
//       if (prev.includes(taskKey)) {
//         return prev.filter(t => t !== taskKey);
//       } else {
//         return [...prev, taskKey];
//       }
//     });
//   };
//
//   const handleAddSelectedTasks = () => {
//     const newTasks = selectedTasksInModal
//       .map(taskKey => {
//         const [serviceId, serviceName] = taskKey.split(":");
//
//         // Find the service and its category
//         let categoryName = "";
//         let service: ServiceData | null = null;
//
//         for (const category of serviceCategories) {
//           const foundService = category.services.find(s => s.id === serviceId);
//           if (foundService) {
//             service = foundService;
//             categoryName = category.name;
//             break;
//           }
//         }
//
//         if (!service) return null; // Skip if service not found
//
//         const baseTask: Task = {
//           id: Date.now().toString() + Math.random(),
//           serviceId: service.id,
//           name: service.name,
//           category: categoryName,
//           projects: [],
//           hourlyRate: state.availability?.hourlyRate ? Number(state.availability.hourlyRate) : 100,
//           currency: state.availability?.currency || "EUR",
//           hasResponseTime: service.hasResponseTime,
//         };
//
//         // Add response time for services that need it
//         if (service.hasResponseTime) {
//           baseTask.responseTime = "12"; // Default 12 hours
//         }
//
//         return baseTask;
//       })
//       .filter(task => task !== null) as Task[];
//
//     const updatedTasks = {
//       selectedTasks: [...tasks.selectedTasks, ...newTasks],
//     };
//
//     setTasks(updatedTasks);
//     updateState({ tasks: updatedTasks });
//     setSelectedTasksInModal([]);
//     setShowTaskSelectionModal(false);
//   };
//
//   const handleSelectProjects = (task: Task) => {
//     setCurrentTaskForProjects(task);
//     // Pre-populate with current task's projects
//     setSelectedProjectsInModal(task.projects || []);
//     setAllProjectsSelected(false);
//     // Pre-populate hourly rate and currency with task's current values
//     setHourlyRate(task.hourlyRate?.toString() || state.availability?.hourlyRate || "");
//     setCurrency(task.currency || state.availability?.currency || "EUR");
//     // Pre-populate response time if the task has it
//     setCustomResponseTime(task.responseTime || "12");
//     setShowSelectProjectsModal(true);
//   };
//
//   const handleProjectToggle = (projectId: string) => {
//     setSelectedProjectsInModal(prev => {
//       if (prev.includes(projectId)) {
//         return prev.filter(id => id !== projectId);
//       } else {
//         return [...prev, projectId];
//       }
//     });
//     setAllProjectsSelected(false);
//   };
//
//   const handleAllProjectsToggle = () => {
//     if (allProjectsSelected) {
//       setSelectedProjectsInModal([]);
//       setAllProjectsSelected(false);
//     } else {
//       setSelectedProjectsInModal(availableProjects.map(p => p.id)); // Use project item ID
//       setAllProjectsSelected(true);
//     }
//   };
//
//   const handleProjectSelectionComplete = () => {
//     if (currentTaskForProjects) {
//       const finalSelectedProjects = allProjectsSelected
//         ? availableProjects.map(p => p.id) // Use project item ID
//         : selectedProjectsInModal;
//
//       const updatedTasks = {
//         selectedTasks: tasks.selectedTasks.map(task =>
//           task.id === currentTaskForProjects.id
//             ? {
//                 ...task,
//                 projects: finalSelectedProjects,
//                 hourlyRate: Number(hourlyRate) || task.hourlyRate,
//                 currency: currency || task.currency,
//                 responseTime: task.hasResponseTime ? customResponseTime : task.responseTime,
//               }
//             : task,
//         ),
//       };
//       setTasks(updatedTasks);
//       updateState({ tasks: updatedTasks });
//     }
//     setShowSelectProjectsModal(false);
//     setCurrentTaskForProjects(null);
//     setSelectedProjectsInModal([]);
//     setAllProjectsSelected(false);
//   };
//
//   const handleCustomServiceSave = () => {
//     // Find the "Custom Service" from the available services
//     let customServiceId = "custom_task"; // fallback
//
//     for (const category of serviceCategories) {
//       const customService = category.services.find(s => s.name === "Custom Service" || s.isCustom);
//       if (customService) {
//         customServiceId = customService.id;
//         break;
//       }
//     }
//
//     const customTask: Task = {
//       id: Date.now().toString(),
//       serviceId: customServiceId,
//       name: "Custom Task",
//       category: "Other Task",
//       customService: customServiceText,
//       projects: [],
//       hourlyRate: Number(hourlyRate) || (state.availability?.hourlyRate ? Number(state.availability.hourlyRate) : 100),
//       currency: currency || state.availability?.currency || "EUR",
//       hasResponseTime: false,
//     };
//
//     const updatedTasks = {
//       selectedTasks: [...tasks.selectedTasks, customTask],
//     };
//
//     setTasks(updatedTasks);
//     updateState({ tasks: updatedTasks });
//     setCustomServiceText("");
//     setHourlyRate("");
//     setShowCustomServiceModal(false);
//   };
//
//   const handleIncidentResponseSave = () => {
//     const incidentTask: Task = {
//       id: Date.now().toString(),
//       serviceId: "756736f3-dd2e-4db5-b51c-5d740b06187a", // Incident Response service ID
//       name: "Incident Response",
//       category: "Operation",
//       responseTime: responseTime || "12",
//       projects: [],
//       hourlyRate: Number(hourlyRate) || (state.availability?.hourlyRate ? Number(state.availability.hourlyRate) : 100),
//       currency: currency || state.availability?.currency || "EUR",
//       hasResponseTime: true,
//     };
//
//     const updatedTasks = {
//       selectedTasks: [...tasks.selectedTasks, incidentTask],
//     };
//
//     setTasks(updatedTasks);
//     updateState({ tasks: updatedTasks });
//     setResponseTime("");
//     setHourlyRate("");
//     setShowIncidentResponseModal(false);
//   };
//
//   const handleRemoveTask = (taskId: string) => {
//     const updatedTasks = {
//       selectedTasks: tasks.selectedTasks.filter(task => task.id !== taskId),
//     };
//     setTasks(updatedTasks);
//     updateState({ tasks: updatedTasks });
//   };
//
//   const handleNext = async () => {
//     if (tasks.selectedTasks.length === 0) return;
//
//     setSavingServices(true);
//     const api = getOnboardingBackendAPI();
//
//     try {
//       console.log("Saving services to backend...", tasks.selectedTasks);
//
//       // Save each task as developer services
//       for (const task of tasks.selectedTasks) {
//         const projectIds = task.projects || [];
//
//         // If no projects selected, skip this task
//         if (projectIds.length === 0) {
//           console.log(`Skipping task "${task.name}" - no projects selected`);
//           continue;
//         }
//
//         // Create a developer service for each selected project
//         for (const projectId of projectIds) {
//           const serviceData = {
//             projectItemId: projectId, // projectId is now already the correct UUID
//             serviceId: task.serviceId,
//             hourlyRate: task.hourlyRate || 100,
//             currency: task.currency || ("EUR" as any),
//             responseTimeHours: task.hasResponseTime ? parseInt(task.responseTime || "12") : null,
//           };
//
//           console.log("Creating developer service:", serviceData);
//           const result = await api.addDeveloperService(serviceData);
//
//           if (result instanceof Error) {
//             console.error("Failed to create developer service:", result);
//             throw new Error(`Failed to save service "${task.name}" for project ${projectId}`);
//           }
//
//           console.log("Developer service created successfully:", result);
//         }
//       }
//
//       // Mark onboarding as completed
//       console.log("Completing onboarding...");
//       const completionResult = await api.completeOnboarding();
//
//       if (completionResult instanceof Error) {
//         console.error("Failed to complete onboarding:", completionResult);
//         throw new Error("Failed to complete onboarding");
//       }
//
//       console.log("Onboarding completed successfully");
//
//       // Navigate to next step/dashboard
//       onNext();
//     } catch (error) {
//       console.error("Error saving services:", error);
//       // TODO: Show error message to user
//       alert(`Error saving services: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setSavingServices(false);
//     }
//   };
//
//   return (
//     <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-start pt-[80px] pb-0 px-0 relative size-full">
//       {/* Progress Bar */}
//       <ProgressBar currentStep={currentStep} />
//
//       {/* Form Content */}
//       <div className="box-border content-stretch flex flex-col gap-12 items-center justify-start p-0 relative shrink-0 w-full">
//         <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-[900px]">
//           {/* Section Title */}
//           <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-[700px]">
//             <div className="font-michroma not-italic relative shrink-0 text-[32px] w-full">
//               <p className="block leading-[1.3]">Tasks & Preferences</p>
//             </div>
//           </div>
//
//           {/* Selected Tasks Display */}
//           <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-full">
//             {/* Task Categories */}
//             {serviceCategories.map(category => {
//               const categoryTasks = tasks.selectedTasks.filter(task => task.category === category.name);
//               if (categoryTasks.length === 0) return null;
//
//               return (
//                 <div key={category.id} className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
//                   <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
//                     <p className="block leading-[1.3]">{category.name}</p>
//                   </div>
//
//                   {categoryTasks.map(task => {
//                     // Convert project IDs to repository names for display
//                     const projectNames =
//                       task.projects && task.projects.length > 0
//                         ? task.projects
//                             .map(projectId => {
//                               const repo = repositories.find(r => r.projectItemId === projectId);
//                               return repo ? repo.repository || `${repo.projectItemId}` : projectId;
//                             })
//                             .filter(name => name) // Remove any undefined/null values
//                         : [];
//
//                     // Format projects display
//                     const projectsDisplay =
//                       projectNames.length > 0
//                         ? projectNames.length > 5
//                           ? `${projectNames.slice(0, 5).join(" | ")} | +${projectNames.length - 5} more...`
//                           : projectNames.join(" | ")
//                         : "No projects selected";
//
//                     // Get default rate from availability if not set on task
//                     const displayRate = task.hourlyRate || (state.availability?.hourlyRate ? Number(state.availability.hourlyRate) : 100);
//                     const displayCurrency = task.currency || state.availability?.currency || "EUR";
//                     const currencySymbol = displayCurrency === "EUR" ? "€" : displayCurrency === "USD" ? "$" : "£";
//
//                     return (
//                       <div key={task.id} className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
//                         <div className="box-border content-stretch flex flex-row gap-4 items-start justify-between p-0 relative shrink-0 w-full">
//                           <div className="flex-1">
//                             <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left mb-1">
//                               <p className="block leading-[1.5]">{task.customService || task.name}</p>
//                             </div>
//                             <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70 mb-2">
//                               <p className="block leading-[1.4]">{projectsDisplay}</p>
//                             </div>
//                             <div className="flex flex-row gap-4 items-center">
//                               <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
//                                 <p className="block leading-[1.4]">
//                                   Hourly rate: {currencySymbol} {displayRate}
//                                 </p>
//                               </div>
//                               {(task.name === "Incident Response" || task.responseTime) && (
//                                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
//                                   <p className="block leading-[1.4]">Response time: {task.responseTime || "12"} hours</p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//
//                           <div className="flex flex-row gap-2 items-center">
//                             <button
//                               onClick={() => handleSelectProjects(task)}
//                               className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors p-1"
//                               title="Edit task"
//                             >
//                               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path
//                                   d="M11.333 2.00009C11.5081 1.82499 11.7167 1.68595 11.9457 1.59129C12.1747 1.49663 12.4194 1.44788 12.6663 1.44788C12.9133 1.44788 13.158 1.49663 13.387 1.59129C13.616 1.68595 13.8246 1.82499 13.9997 2.00009C14.1748 2.17518 14.3138 2.38383 14.4085 2.61281C14.5032 2.8418 14.5519 3.08651 14.5519 3.33342C14.5519 3.58033 14.5032 3.82504 14.4085 4.05403C14.3138 4.28302 14.1748 4.49167 13.9997 4.66676L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00009Z"
//                                   stroke="currentColor"
//                                   strokeWidth="1.5"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => handleRemoveTask(task.id)}
//                               className="text-[#ffffff] hover:text-red-400 transition-colors p-1"
//                               title="Remove task"
//                             >
//                               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </div>
//
//           {/* Add Task Section */}
//           <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-6 items-start justify-start px-8 py-6 relative rounded-md shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
//             <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[25px] text-left">
//               <p className="block leading-[1.3]">Add Task</p>
//             </div>
//
//             <div className="box-border content-stretch flex flex-row gap-6 items-center justify-center p-0 relative shrink-0 w-full">
//               <button
//                 onClick={() => setShowTaskSelectionModal(true)}
//                 className="bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 hover:bg-[#2a3f56] transition-colors"
//               >
//                 <AddIcon />
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
//                   <p className="block leading-[normal] whitespace-pre">Add Task</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//
//           {/* Button Group */}
//           <div className="box-border content-stretch flex flex-row gap-4 h-12 items-end justify-end p-0 relative shrink-0 w-[900px]">
//             <button
//               onClick={onBack}
//               className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
//             >
//               <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
//                 <p className="block leading-[1.5] whitespace-pre">Back</p>
//               </div>
//             </button>
//
//             <button
//               onClick={handleNext}
//               disabled={tasks.selectedTasks.length === 0 || savingServices}
//               className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
//                 tasks.selectedTasks.length === 0 || savingServices
//                   ? "bg-gray-500 opacity-50 cursor-not-allowed"
//                   : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
//               }`}
//             >
//               {savingServices && (
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//               )}
//               <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
//                 <p className="block leading-[1.5] whitespace-pre">{savingServices ? "Saving..." : "Get Started"}</p>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//
//       {/* Task Selection UpsertProjectItemModal */}
//       {showTaskSelectionModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#14233a] rounded-md p-6 w-[600px] max-h-[80vh] overflow-y-auto border border-[rgba(255,255,255,0.2)]">
//             <div className="flex flex-row gap-4 items-center justify-between mb-6">
//               <div className="font-michroma not-italic text-[#ffffff] text-[25px] text-left">
//                 <p className="block leading-[1.3]">Add Task</p>
//               </div>
//               <button onClick={() => setShowTaskSelectionModal(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
//                 <CloseIcon />
//               </button>
//             </div>
//
//             <div className="flex flex-col gap-2 mb-6">
//               {loadingServices ? (
//                 <div className="flex items-center justify-center py-4">
//                   <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">Loading services...</div>
//                 </div>
//               ) : (
//                 serviceCategories.map(category => (
//                   <div key={category.id}>
//                     <div className="font-montserrat font-medium text-[#ffffff] text-[16px] text-left py-2 bg-[#202f45] px-4">
//                       <p className="block leading-[1.5]">{category.name}</p>
//                     </div>
//                     {category.services.map(service => {
//                       const taskKey = `${service.id}:${service.name}`;
//                       return (
//                         <div
//                           key={service.id}
//                           className="bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-start pl-6 pr-3 py-3 border-b border-[#2a3f56] last:border-b-0"
//                         >
//                           <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
//                             <input
//                               type="checkbox"
//                               checked={selectedTasksInModal.includes(taskKey)}
//                               onChange={() => handleTaskSelection(service, category.name)}
//                               className="w-full h-full opacity-0 cursor-pointer"
//                             />
//                             {selectedTasksInModal.includes(taskKey) && (
//                               <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
//                                 <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                   <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg>
//                               </div>
//                             )}
//                             <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-sm" />
//                           </div>
//                           <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
//                             <p className="block leading-[1.5]">{service.name}</p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ))
//               )}
//             </div>
//
//             <div className="flex flex-row gap-4 items-center justify-end">
//               <button
//                 onClick={() => setShowTaskSelectionModal(false)}
//                 className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
//               >
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//                   <p className="block leading-[1.5] whitespace-pre">Cancel</p>
//                 </div>
//               </button>
//               <button
//                 onClick={handleAddSelectedTasks}
//                 disabled={selectedTasksInModal.length === 0}
//                 className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
//                   selectedTasksInModal.length === 0
//                     ? "bg-gray-500 opacity-50 cursor-not-allowed"
//                     : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
//                 }`}
//               >
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//                   <p className="block leading-[1.5] whitespace-pre">Add Selected</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//
//       {/* Select Projects UpsertProjectItemModal */}
//       {showSelectProjectsModal && currentTaskForProjects && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#14233a] rounded-md p-6 w-[500px] border border-[rgba(255,255,255,0.2)]">
//             <div className="flex flex-row gap-4 items-center justify-between mb-6">
//               <div>
//                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70">
//                   <p className="block leading-[1.5]">Open Source Development</p>
//                 </div>
//                 <div className="font-michroma not-italic text-[#ffffff] text-[20px] text-left">
//                   <p className="block leading-[1.3]">{currentTaskForProjects.name}</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowSelectProjectsModal(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
//                 <CloseIcon />
//               </button>
//             </div>
//
//             <div className="mb-4">
//               <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-3">
//                 Fix a bug on an open source project. List the projects you're involved with
//               </p>
//
//               <div className="mb-4">
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">For Which Project(s)?</p>
//                 <div className="bg-[#202f45] rounded-md p-3">
//                   <div className="flex flex-row gap-2 items-center justify-between mb-2 pb-2 border-b border-[#2a3f56]">
//                     <label className="flex flex-row gap-2 items-center cursor-pointer">
//                       <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
//                         <input
//                           type="checkbox"
//                           checked={allProjectsSelected}
//                           onChange={handleAllProjectsToggle}
//                           className="w-full h-full opacity-0 cursor-pointer"
//                         />
//                         {allProjectsSelected && (
//                           <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
//                             <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                           </div>
//                         )}
//                         <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-sm" />
//                       </div>
//                       <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">All projects</span>
//                     </label>
//                   </div>
//
//                   {loadingRepositories ? (
//                     <div className="flex items-center justify-center py-4">
//                       <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">Loading your repositories...</div>
//                     </div>
//                   ) : availableProjects.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-4 gap-2">
//                       <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">
//                         No repositories found. Please add repositories in Step 2 first.
//                       </div>
//                       <button onClick={onBack} className="text-[#ff7e4b] hover:text-[#ff518c] transition-colors text-sm underline">
//                         Go back to Step 2
//                       </button>
//                     </div>
//                   ) : (
//                     availableProjects.map(project => {
//                       const projectId = project.id; // Use project item ID
//                       const isSelected = selectedProjectsInModal.includes(projectId);
//
//                       return (
//                         <div key={project.id} className="flex flex-row gap-2 items-center mb-2">
//                           <label className="flex flex-row gap-2 items-center cursor-pointer">
//                             <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
//                               <input
//                                 type="checkbox"
//                                 checked={isSelected}
//                                 onChange={() => handleProjectToggle(projectId)}
//                                 className="w-full h-full opacity-0 cursor-pointer"
//                               />
//                               {isSelected && (
//                                 <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
//                                   <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                   </svg>
//                                 </div>
//                               )}
//                               <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-sm" />
//                             </div>
//                             <div className="flex flex-row gap-2 items-center">
//                               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path
//                                   fillRule="evenodd"
//                                   clipRule="evenodd"
//                                   d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
//                                   fill="white"
//                                 />
//                               </svg>
//                               <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">
//                                 {project.organization}/{project.repository}
//                               </span>
//                             </div>
//                           </label>
//                         </div>
//                       );
//                     })
//                   )}
//
//                   <button className="flex flex-row gap-2 items-center text-[#ff7e4b] hover:text-[#ff518c] transition-colors mt-2">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     <span className="font-montserrat font-normal text-[14px]">Add different project</span>
//                   </button>
//                 </div>
//               </div>
//
//               <div className="mb-4">
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Want to change your hourly rate for this service? ℹ️</p>
//                 <div className="flex flex-row gap-2 items-center">
//                   <select
//                     value={currency}
//                     onChange={e => setCurrency(e.target.value)}
//                     className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none"
//                   >
//                     <option value="EUR">€ (EUR)</option>
//                     <option value="USD">$ (USD)</option>
//                     <option value="GBP">£ (GBP)</option>
//                   </select>
//                   <input
//                     type="text"
//                     value={hourlyRate}
//                     onChange={e => setHourlyRate(e.target.value)}
//                     placeholder="100"
//                     className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none flex-1"
//                   />
//                 </div>
//               </div>
//
//               {currentTaskForProjects?.hasResponseTime && (
//                 <div className="mb-4">
//                   <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Response Time</p>
//                   <p className="font-montserrat font-normal text-[#ffffff] text-[12px] text-left mb-2 opacity-70">Expected time to respond to requests</p>
//                   <div className="flex flex-row gap-2 items-center">
//                     <input
//                       type="text"
//                       value={customResponseTime}
//                       onChange={e => setCustomResponseTime(e.target.value)}
//                       placeholder="12"
//                       className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none w-20"
//                     />
//                     <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">hours</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//
//             <div className="flex flex-row gap-4 items-center justify-end">
//               <button
//                 onClick={handleProjectSelectionComplete}
//                 disabled={!allProjectsSelected && selectedProjectsInModal.length === 0}
//                 className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
//                   !allProjectsSelected && selectedProjectsInModal.length === 0
//                     ? "bg-gray-500 opacity-50 cursor-not-allowed"
//                     : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
//                 }`}
//               >
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//                   <p className="block leading-[1.5] whitespace-pre">Select Project(s)</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//
//       {/* Custom Service UpsertProjectItemModal */}
//       {showCustomServiceModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#14233a] rounded-md p-6 w-[500px] border border-[rgba(255,255,255,0.2)]">
//             <div className="flex flex-row gap-4 items-center justify-between mb-6">
//               <div>
//                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70">
//                   <p className="block leading-[1.5]">Custom Service</p>
//                 </div>
//                 <div className="font-michroma not-italic text-[#ffffff] text-[20px] text-left">
//                   <p className="block leading-[1.3]">Other Service</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowCustomServiceModal(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
//                 <CloseIcon />
//               </button>
//             </div>
//
//             <div className="mb-4">
//               <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-3">Service you want to offer *</p>
//               <textarea
//                 value={customServiceText}
//                 onChange={e => setCustomServiceText(e.target.value)}
//                 className="w-full h-24 bg-[#202f45] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none resize-none"
//                 placeholder="Describe the custom service you want to offer..."
//               />
//             </div>
//
//             <div className="mb-4">
//               <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">For Which Project(s)?</p>
//               <div className="bg-[#202f45] rounded-md p-3 flex flex-row gap-2 items-center justify-between">
//                 <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">Select...</span>
//                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div>
//             </div>
//
//             <div className="mb-6">
//               <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Want to change your hourly rate for this service? ℹ️</p>
//               <div className="flex flex-row gap-2 items-center">
//                 <select
//                   value={currency}
//                   onChange={e => setCurrency(e.target.value)}
//                   className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none"
//                 >
//                   <option value="EUR">€ (EUR)</option>
//                   <option value="USD">$ (USD)</option>
//                   <option value="GBP">£ (GBP)</option>
//                 </select>
//                 <input
//                   type="text"
//                   value={hourlyRate}
//                   onChange={e => setHourlyRate(e.target.value)}
//                   placeholder="100"
//                   className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none flex-1"
//                 />
//               </div>
//             </div>
//
//             <div className="flex flex-row gap-4 items-center justify-end">
//               <button
//                 onClick={handleCustomServiceSave}
//                 disabled={!customServiceText.trim()}
//                 className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
//                   !customServiceText.trim()
//                     ? "bg-gray-500 opacity-50 cursor-not-allowed"
//                     : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
//                 }`}
//               >
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//                   <p className="block leading-[1.5] whitespace-pre">Select Project(s)</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//
//       {/* Incident Response UpsertProjectItemModal */}
//       {showIncidentResponseModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-[#14233a] rounded-md p-6 w-[500px] border border-[rgba(255,255,255,0.2)]">
//             <div className="flex flex-row gap-4 items-center justify-between mb-6">
//               <div>
//                 <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70">
//                   <p className="block leading-[1.5]">Operation</p>
//                 </div>
//                 <div className="font-michroma not-italic text-[#ffffff] text-[20px] text-left">
//                   <p className="block leading-[1.3]">Incident Response</p>
//                 </div>
//               </div>
//               <button onClick={() => setShowIncidentResponseModal(false)} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
//                 <CloseIcon />
//               </button>
//             </div>
//
//             <div className="mb-4">
//               <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-3">
//                 Fix a bug on an open source project. List the projects you're involved with
//               </p>
//
//               <div className="mb-4">
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">For Which Project(s)?</p>
//                 <div className="bg-[#202f45] rounded-md p-3 flex flex-row gap-2 items-center justify-between">
//                   <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">Select...</span>
//                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                 </div>
//               </div>
//
//               <div className="mb-4">
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">First Response Time</p>
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[12px] text-left mb-2 opacity-70">Expect sickness and vacations</p>
//                 <div className="flex flex-row gap-2 items-center">
//                   <input
//                     type="text"
//                     value={responseTime}
//                     onChange={e => setResponseTime(e.target.value)}
//                     placeholder="eg. 30"
//                     className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none w-20"
//                   />
//                   <span className="font-montserrat font-normal text-[#ffffff] text-[14px]">h</span>
//                   <button className="ml-2 text-[#ff7e4b] hover:text-[#ff518c] transition-colors">
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
//                       <path d="M8 12V8M8 4H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//
//               <div className="mb-4">
//                 <p className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left mb-2">Want to change your hourly rate for this service? ℹ️</p>
//                 <div className="flex flex-row gap-2 items-center">
//                   <select
//                     value={currency}
//                     onChange={e => setCurrency(e.target.value)}
//                     className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none"
//                   >
//                     <option value="EUR">€ (EUR)</option>
//                     <option value="USD">$ (USD)</option>
//                     <option value="GBP">£ (GBP)</option>
//                   </select>
//                   <input
//                     type="text"
//                     value={hourlyRate}
//                     onChange={e => setHourlyRate(e.target.value)}
//                     placeholder="100"
//                     className="bg-[#202f45] px-3 py-2 rounded-md font-montserrat font-normal text-[#ffffff] text-[14px] outline-none flex-1"
//                   />
//                 </div>
//               </div>
//             </div>
//
//             <div className="flex flex-row gap-4 items-center justify-end">
//               <button
//                 onClick={handleIncidentResponseSave}
//                 className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:scale-105"
//               >
//                 <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
//                   <p className="block leading-[1.5] whitespace-pre">Select Project(s)</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
