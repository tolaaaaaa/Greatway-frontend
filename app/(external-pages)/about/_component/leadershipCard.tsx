type Props = {
  name: string;
  role: string;
  imageUrl: string;
};

export default function LeadershipCard({ name, role, imageUrl }: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src={imageUrl}
        alt={name}
        width={348}
        height={301}
        className="object-cover"
      />
      <div className="flex flex-col w-full py-6 px-17.75 justify-center items-center bg-[#CAFBE5] gap-1">
        <h3 className="font-bold text-black text-[20px]">{name}</h3>
        <p className="text-accent font-semibold">{role}</p>
      </div>
    </div>
  );
}
