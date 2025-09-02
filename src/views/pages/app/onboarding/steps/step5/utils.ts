import * as dto from "@open-source-economy/api-types";

export interface ServiceCategory {
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

export interface GroupedDeveloperServiceEntry {
  category: string;
  developerServices: dto.DeveloperServiceEntry[];
}

/**
 * Groups developer services by their respective categories based on the service hierarchy.
 * @param serviceCategories A list of all available service categories.
 * @param developerServices A list of the developer's selected services, each with its associated Service object.
 * @returns An array of objects, each containing a category name and the list of developer services in that category.
 */
export const groupDeveloperServicesByCategory = (
  serviceCategories: ServiceCategory[],
  developerServices: dto.DeveloperServiceEntry[],
): GroupedDeveloperServiceEntry[] => {
  return serviceCategories.reduce<GroupedDeveloperServiceEntry[]>((acc, category) => {
    const servicesInThisCategory = developerServices.filter(({ service }) => category.services.some(childService => childService.id.uuid === service.id.uuid));

    if (servicesInThisCategory.length > 0) {
      acc.push({
        category: category.service.name,
        developerServices: servicesInThisCategory,
      });
    }

    return acc;
  }, []);
};
