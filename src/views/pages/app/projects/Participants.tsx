import React from "react";

// Define the participant data interface
interface Participant {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const participants: Participant[] = [
  {
    name: "Patrik Nordwall",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: "/path-to-image/patrik.jpg",
  },
  {
    name: "Konrad",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: "/path-to-image/konrad.jpg",
  },
  {
    name: "Enno Runne",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: "/path-to-image/enno.jpg",
  },
  {
    name: "Richard Imaoka",
    title: "Akka expert",
    quote: "Quote of the person that can be a little long",
    image: "/path-to-image/richard.jpg",
  },
];

const Participants = () => {
  return (
    <section className="bg-gradient-to-r from-[#0b1120] to-[#1c2a42] py-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-white text-4xl font-bold mb-8">Who is Participating?</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <span className="w-10 h-1 bg-gradient-to-r from-orange-500 to-purple-600"></span>
        </div>

        {/* Participants List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {participants.map((participant, index) => (
            <div key={index} className="relative bg-gradient-to-b from-[#0d1b2a] to-[#1c364f] rounded-lg p-6 flex flex-col items-center text-white">
              {/* Participant Image */}
              <img src={participant.image} alt={participant.name} className="rounded-full w-32 h-32 object-cover mb-4" />
              {/* Participant Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold">{participant.name}</h3>
                <p className="text-sm text-gray-300">{participant.title}</p>
                <p className="mt-2 text-sm italic">"{participant.quote}"</p>
              </div>

              {/* Badge */}
              <div className="absolute top-[-20px] bg-blue-700 text-white rounded-full px-4 py-1 text-xs shadow-lg">OSS Full time Thanks to you!</div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">View All</button>
        </div>
      </div>
    </section>
  );
};

export default Participants;
