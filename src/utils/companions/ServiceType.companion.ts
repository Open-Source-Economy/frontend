/**
 * Companion utilities for ServiceType enum
 * Centralizes all display and formatting logic for service types
 */

import * as dto from "@open-source-economy/api-types";
import { Bug, Headphones, LucideIcon, Puzzle, Shield, Target } from "lucide-react";

export interface ServiceTypeInfo {
  icon: LucideIcon;
  label: string;
  description: string;
  accentColor: "accent" | "highlight" | "warning" | "success";
}

const serviceTypeInfoMap: Record<dto.ServiceType, ServiceTypeInfo> = {
  [dto.ServiceType.SUPPORT]: {
    icon: Headphones,
    label: "Support",
    description: "Provide timely responses and assistance to users and enterprises",
    accentColor: "accent",
  },
  [dto.ServiceType.DEVELOPMENT]: {
    icon: Bug,
    label: "Development",
    description: "Build features, fix bugs, and improve project quality",
    accentColor: "highlight",
  },
  [dto.ServiceType.ADVISORY]: {
    icon: Target,
    label: "Advisory",
    description: "Share expertise through consulting, training, and mentorship",
    accentColor: "warning",
  },
  [dto.ServiceType.SECURITY_AND_COMPLIANCE]: {
    icon: Shield,
    label: "Security & Compliance",
    description: "Ensure project security and regulatory compliance",
    accentColor: "success",
  },
  [dto.ServiceType.CUSTOM]: {
    icon: Puzzle,
    label: "Custom",
    description: "Custom services tailored to specific needs",
    accentColor: "highlight",
  },
};

export namespace ServiceTypeCompanion {
  /**
   * Get all information for a service type (icon, label, description)
   */
  export function info(type: dto.ServiceType): ServiceTypeInfo {
    return serviceTypeInfoMap[type] || serviceTypeInfoMap[dto.ServiceType.CUSTOM];
  }

  /**
   * Get just the icon for a service type
   */
  export function icon(type: dto.ServiceType): LucideIcon {
    return info(type).icon;
  }

  /**
   * Get just the label for a service type
   */
  export function label(type: dto.ServiceType): string {
    return info(type).label;
  }

  /**
   * Get just the description for a service type
   */
  export function description(type: dto.ServiceType): string {
    return info(type).description;
  }
}
