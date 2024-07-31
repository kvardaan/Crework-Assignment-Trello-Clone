import { useModal } from "@/app/context/Context";

export const TaskButton: React.FC<{ status: string }> = ({ status }) => {
  const { openModal, setOpenModal, setStatus } = useModal();
  return (
    <button
      onClick={() => {
        setOpenModal(true);
        setStatus(status);
      }}
      className="w-full flex flex-row justify-between items-center rounded-lg p-2 bg-gradient-to-b from-[#3A3A3A] to-[#202020]"
    >
      <p className="font-normal text-[16px] leading-5 text-[#E3E1E1]">Add new</p>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18"
          stroke="#E3E1E1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
