import React from "react";

const profiles = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=10",
    Batch: "Y"+"2023",
    Branch: "CSE",
    Gender: "Female",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=11",
    Batch: "Y"+"2023",
    Branch: "BSBE",
    Gender: "Male",

  },
  {
    id: 3,
    name: "Charlie Davis",
    avatar: "https://i.pravatar.cc/150?img=12",
    Batch: "Y"+"2023",
    Branch: "CE",
    Gender: "Male",
  },
  {
    id: 4,
    name: "Dana Lee",
    avatar: "https://i.pravatar.cc/150?img=13",
    Batch: "Y"+"2022",
    Branch: "BSBE",
    Gender: "Male",

  },
  {
    id: 5,
    name: "Eve Martinez",
    avatar: "https://i.pravatar.cc/150?img=14",
    Batch: "Y"+"2024",
    Branch: "ECO",
    Gender: "Male",

  },
];

const Matches=() =>{
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-10">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center">
        Meet Your Matches
      </h1>
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {profiles.map(({ id, name, avatar, Batch, Branch ,Gender}) => (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-lg transform transition-all hover:shadow-2xl hover:scale-105 duration-300 p-6 flex flex-col items-center text-center"
            tabIndex={0}
            aria-label={`Profile card of ${name}, ${Batch}`}
          >
            <img
              src={avatar}
              alt={`${name} avatar`}
              className="w-32 h-32 mb-4 rounded-full object-cover shadow-md"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold text-indigo-800 mb-1">{name}</h2>
            <p className="text-indigo-600 font-medium ">{Batch}</p>
            <p className="text-indigo-500 text-sm leading-relaxed">{Branch}</p>
            <p className="text-indigo-500 text-sm leading-relaxed">{Gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Matches;