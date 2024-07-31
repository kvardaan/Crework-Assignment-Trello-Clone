import Image from "next/image";

export const InfoCards = () => {
  const cardContent = [
    {
      id: 1,
      title: "Introducting tags",
      description: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
      image: "/dashboard-img1.svg",
      width: 77,
      height: 61,
    },
    {
      id: 2,
      title: "Share Notes Instantly",
      description:
        "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
      image: "/dashboard-img2.svg",
      width: 76,
      height: 50,
    },
    {
      id: 3,
      title: "Access Anywhere",
      description: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
      image: "/dashboard-img3.svg",
      width: 76,
      height: 70,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 justify-between items-center">
      {cardContent.map((card) => (
        <div
          key={card.id}
          className="h-[123px] rounded-lg border border-[#F4F4F4] bg-[#FFFFFF] p-4 flex flex-row justify-start items-center gap-[16px]"
        >
          <Image src={card.image} alt="image-1" width={card.width} height={card.height} />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-[16px] leading-5 text-[#757575]">{card.title}</p>
            <p className="font-normal text-[14px] leading-4 text-[#868686]">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
