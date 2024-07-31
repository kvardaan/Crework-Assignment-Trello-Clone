export const Card = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex items-center justify-center">
      <div className="border border-[#CECECE] rounded-2xl mt-[120px] bg-white flex flex-col w-[648px] p-[60px] gap-y-8">
        {children}
      </div>
    </div>
  );
};
