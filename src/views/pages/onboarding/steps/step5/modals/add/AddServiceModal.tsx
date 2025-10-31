import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { Button } from "src/views/components/ui/forms/button";
import { BrandModal, BrandModalSection } from "src/views/components/ui/brand-modal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "src/views/components/ui/collapsible";
import { ChevronDown, Layers } from "lucide-react";
import { ServiceTypeCompanion } from "src/ultils/companions";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddServices: (services: dto.Service[]) => void;
  serviceCategories: dto.ServiceHierarchyItem[];
  isLoading?: boolean;
}

export function AddServiceModal(props: AddServiceModalProps) {
  const [selectedServices, setSelectedServices] = useState<dto.Service[]>([]);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    [dto.ServiceType.SUPPORT]: true,
    [dto.ServiceType.DEVELOPMENT]: true,
    [dto.ServiceType.ADVISORY]: true,
    [dto.ServiceType.SECURITY_AND_COMPLIANCE]: true,
  });

  const handleServiceSelection = (service: dto.Service) => {
    setSelectedServices(prev => {
      // Check if the service is already selected based on its UUID
      if (prev.some(s => s.id.uuid === service.id.uuid)) {
        // If it is, filter it out to deselect it
        return prev.filter(s => s.id.uuid !== service.id.uuid);
      } else {
        // Otherwise, add the new service to the list
        return [...prev, service];
      }
    });
  };

  const handleAddSelectedServices = () => {
    props.onAddServices(selectedServices);
    setSelectedServices([]);
  };

  const handleClose = () => {
    setSelectedServices([]);
    props.onClose();
  };

  return (
    <BrandModal
      open={props.isOpen}
      onClose={handleClose}
      size="3xl"
      preventAutoFocus={true}
      footer={
        <div className="flex items-center justify-end w-full gap-3">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddSelectedServices}
            disabled={selectedServices.length === 0}
            className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedServices.length > 0 ? `Add ${selectedServices.length} Service${selectedServices.length !== 1 ? "s" : ""}` : "Add Services"}
          </Button>
        </div>
      }
    >
      <div className="space-y-6 py-2">
        <BrandModalSection icon={<Layers />} title="Select Services" description="Choose one or more services to add with default settings" iconColor="accent">
          {props.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-sm text-brand-neutral-600">Loading services...</div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {props.serviceCategories.map(categoryItem => {
                if (categoryItem.services.length === 0) return null;

                const serviceTypeInfo = ServiceTypeCompanion.info(categoryItem.category);
                const Icon = serviceTypeInfo.icon;
                const selectedInCategory = categoryItem.services.filter(s => selectedServices.some(sel => sel.id.uuid === s.id.uuid)).length;
                const isOpen = openCategories[categoryItem.category] ?? true;

                return (
                  <Collapsible
                    key={categoryItem.category}
                    open={isOpen}
                    onOpenChange={open => setOpenCategories(prev => ({ ...prev, [categoryItem.category]: open }))}
                  >
                    <div className="bg-brand-card-blue/50 rounded-lg border border-brand-neutral-300/30">
                      {/* Category Header */}
                      <CollapsibleTrigger asChild>
                        <button className="w-full flex items-center justify-between p-3 hover:bg-brand-accent/5 transition-all rounded-t-lg cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                              <Icon className="w-4 h-4 text-brand-accent" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-sm text-brand-neutral-900">{serviceTypeInfo.label}</h4>
                              {selectedInCategory > 0 && <span className="text-xs text-brand-accent">{selectedInCategory} selected</span>}
                            </div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-brand-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </CollapsibleTrigger>

                      {/* Category Services */}
                      <CollapsibleContent>
                        <div className="px-3 pb-3 space-y-2">
                          {categoryItem.services.map(service => {
                            const isSelected = selectedServices.some(s => s.id.uuid === service.id.uuid);

                            return (
                              <div
                                key={service.id.uuid}
                                onClick={() => handleServiceSelection(service)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-brand-accent/10 border-brand-accent"
                                    : "bg-brand-card-blue/50 border-brand-neutral-300/20 hover:border-brand-accent/30"
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <div
                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all ${
                                      isSelected ? "border-brand-accent bg-brand-accent" : "border-brand-neutral-400"
                                    }`}
                                  >
                                    {isSelected && <div className="w-2 h-2 rounded-sm bg-white" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-brand-neutral-900">{service.name}</div>
                                    {service.description && <div className="text-xs text-brand-neutral-600 mt-1">{service.description}</div>}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </BrandModalSection>
      </div>
    </BrandModal>
  );
}
