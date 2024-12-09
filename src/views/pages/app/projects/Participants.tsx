import React from "react";
import ParticipantCard from "./ParticipantCard";
import participant from "src/assets/participant-1.png";
import participant2 from "src/assets/participant-2.png";
import participant3 from "src/assets/participant-3.png";
import participant4 from "src/assets/participant-4.png";
import mascot1 from "src/assets/participant-card-1.png";
import mascot2 from "src/assets/participant-card-2.png";
import mascot3 from "src/assets/participant-card-3.png";
import mascot4 from "src/assets/participant-card-4.png";

// Define the participant data interface
interface Participant {
  name: string;
  title: string;
  quote: string;
  image: string;
  mascot: string;
}

const participants: Participant[] = [
  {
    name: "Patrik Nordwall",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: participant,
    mascot: mascot1,
  },
  {
    name: "Konrad",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: participant2,
    mascot: mascot2,
  },
  {
    name: "Enno Runne",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: participant3,
    mascot: mascot3,
  },
  {
    name: "Richard Imaoka",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: participant4,
    mascot: mascot4,
  },
];

const Participants = () => {
  return (
    <section className=" py-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-4xl font-bold mb-8">Who is Participating?</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="w-10 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></span>
        </div>

        {/* Participants List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {participants.map((participant, index) => (
            <ParticipantCard participant={participant} key={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8">
          <button className="bg-secondary text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">View All</button>
        </div>
      </div>
    </section>
  );
};

export default Participants;
