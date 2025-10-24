import React from "react";
import { Label } from "../../../components/ui/forms/label";
import { Textarea } from "../../../components/ui/forms/textarea";
import { Checkbox } from "../../../components/ui/forms/checkbox";
import { Video } from "lucide-react";

interface MeetingRequestSectionProps {
  requestMeeting: boolean;
  meetingNotes?: string;
  onRequestMeetingChange: (checked: boolean) => void;
  onMeetingNotesChange: (notes: string) => void;
}

export function MeetingRequestSection({ requestMeeting, meetingNotes, onRequestMeetingChange, onMeetingNotesChange }: MeetingRequestSectionProps) {
  return (
    <div className="p-5 bg-brand-card-blue-light border border-brand-neutral-300 rounded-lg space-y-4">
      <div className="flex items-start gap-3">
        <Checkbox id="requestMeeting" checked={requestMeeting} onCheckedChange={checked => onRequestMeetingChange(checked === true)} className="mt-1" />
        <div className="flex-1">
          <Label htmlFor="requestMeeting" className="cursor-pointer text-brand-neutral-800 flex items-center gap-2">
            <Video className="w-4 h-4 text-brand-neutral-600" />
            <span>I'd like to schedule a meeting</span>
          </Label>
          <p className="text-brand-neutral-600 mt-1">Request a video call to discuss your needs in detail</p>
        </div>
      </div>

      {requestMeeting && (
        <div className="pl-9 pt-3 border-t border-brand-neutral-300">
          <div>
            <Label htmlFor="meetingNotes">Meeting Notes (Optional)</Label>
            <Textarea
              id="meetingNotes"
              value={meetingNotes || ""}
              onChange={e => onMeetingNotesChange(e.target.value)}
              rows={3}
              placeholder="Any specific topics or agenda items you'd like to discuss..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
