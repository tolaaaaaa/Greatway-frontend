import LeadershipCard from "./leadershipCard";


const dummyLeadership = [
  {
    name: "Adebayo Okafor",
    role: "Chief Executive Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Chidinma Eze",
    role: "Head of Development",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Emeka Nwosu",
    role: "Head of Design",
    imageUrl: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Emeka Ojire",
    role: "Chief Financial Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Adamu Oloye",
    role: "Chief Infrastructure Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Emeka china",
    role: "Chief Technical Officer",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  }
];

export default function Leadership() {
  return (
    <section className="mt-25 py-17.75 bg-black">
      <div className="app-container">
        <div className="flex flex-col justify-center items-center gap-20">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-accent font-bold uppercase text-[20px]">
              Faces Behind Greatway
            </h2>
            <h1 className="font-bold text-[40px] text-[#FCEEE2] leading-13.75 tracking-[0.01em]">
              Our Leadership Team
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyLeadership.map((leader) => (
              <LeadershipCard
                key={leader.name}
                name={leader.name}
                role={leader.role}
                imageUrl={leader.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}