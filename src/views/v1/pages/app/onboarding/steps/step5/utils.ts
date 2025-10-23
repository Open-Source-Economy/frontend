import * as dto from "@open-source-economy/api-types";

export interface GroupedDeveloperServiceEntry {
  category: dto.ServiceType;
  developerServices: dto.DeveloperServiceEntry[];
}

/**
 * Groups developer services by their respective categories.
 * @param serviceHierarchy A list of all available service categories with their services.
 * @param developerServices A list of the developer's selected services, each with its associated Service object.
 * @returns An array of objects, each containing a category name and the list of developer services in that category.
 */
export const groupDeveloperServicesByCategory = (
  serviceHierarchy: dto.ServiceHierarchyItem[],
  developerServices: dto.DeveloperServiceEntry[],
): GroupedDeveloperServiceEntry[] => {
  return serviceHierarchy.reduce<GroupedDeveloperServiceEntry[]>((acc, categoryItem) => {
    const servicesInThisCategory = developerServices.filter(({ service }) => service.serviceType === categoryItem.category);

    if (servicesInThisCategory.length > 0) {
      acc.push({
        category: categoryItem.category,
        developerServices: servicesInThisCategory,
      });
    }

    return acc;
  }, []);
};
