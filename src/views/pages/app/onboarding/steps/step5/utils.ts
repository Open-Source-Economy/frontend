import * as dto from "@open-source-economy/api-types";
import { DeveloperServiceTODOChangeName } from "@open-source-economy/api-types/dist/dto/onboarding/profile";

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

/**
 * Builds a hierarchical structure of service categories from a flat list of service hierarchy items.
 * Level 0 items are considered main categories, and subsequent levels are grouped under their ancestors.
 * @param items An array of DTO ServiceHierarchyItem.
 * @returns An array of ServiceCategory objects.
 */
export const buildServiceCategories = (items: dto.ServiceHierarchyItem[]): ServiceCategory[] => {
  const categories: { [key: string]: ServiceCategory } = {};

  // First pass: identify all level 0 services as main categories
  items.forEach(item => {
    if (item.level === 0) {
      categories[item.service.id.uuid] = { service: item.service, services: [] };
    }
  });

  // Second pass: group child services under their respective parent categories
  items.forEach(item => {
    if (item.level > 0 && item.ancestors.length > 0) {
      const parentId = item.ancestors[item.ancestors.length - 1].uuid;
      if (categories[parentId]) {
        categories[parentId].services.push(item.service);
      }
    }
  });

  return Object.values(categories);
};

/**
 * Groups developer services by their respective categories based on the service hierarchy.
 * @param serviceCategories A list of all available service categories.
 * @param developerServices A list of developer's selected services, including the associated Service object.
 * @returns An array of objects, each containing a category name and a list of developer services belonging to that category.
 */
export const groupDeveloperServicesByCategory = (
  serviceCategories: ServiceCategory[],
  developerServices: [dto.Service, DeveloperServiceTODOChangeName | null][],
): { category: string; developerServices: [dto.Service, DeveloperServiceTODOChangeName | null][] }[] => {
  return serviceCategories.reduce(
    (acc, category) => {
      const servicesInThisCategory = developerServices.filter(([service, _]) =>
        category.services.some(childService => childService.id.uuid === service.id.uuid),
      );
      if (servicesInThisCategory.length > 0) {
        acc.push({ category: category.service.name, developerServices: servicesInThisCategory });
      }
      return acc;
    },
    [] as { category: string; developerServices: [dto.Service, DeveloperServiceTODOChangeName | null][] }[],
  );
};
