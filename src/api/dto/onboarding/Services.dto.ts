import { CurrencyType } from "./DeveloperProfile.dto";

export interface Service {
  id: string;
  name: string;
  parentId?: string | null;
  isCustom: boolean;
  hasResponseTime: boolean;
  createdAt: string;
  updatedAt: string;
  level?: number;
  ancestors?: string[];
}

export interface GetServicesResponse {
  success: boolean;
  data: Service[];
}

export interface AddDeveloperServiceDto {
  projectItemId: string;
  serviceId: string;
  hourlyRate: number;
  currency: CurrencyType;
  responseTimeHours?: number | null;
}

export interface UpdateDeveloperServiceDto {
  hourlyRate: number;
  currency: CurrencyType;
  responseTimeHours?: number | null;
}

export interface DeveloperServiceResponse {
  success: boolean;
  data: {
    id: string;
    developerProfileId: string;
    projectItemId: string;
    serviceId: string;
    hourlyRate: number;
    currency: CurrencyType;
    responseTimeHours?: number | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DeleteDeveloperServiceResponse {
  success: boolean;
  message: string;
}