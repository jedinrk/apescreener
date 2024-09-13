interface GetEarlyAccessModalProps {
  label: string;
  onClick: () => void;
  isEnabled: boolean;
}

const CustomButton: React.FC<GetEarlyAccessModalProps> = ({
  label,
  onClick,
  isEnabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-14 p-4 rounded-[500px] justify-center items-center gap-2.5 inline-flex transition-transform duration-150 ease-in-out transform active:scale-95 ${
        isEnabled
          ? "bg-gradient-to-r from-[#00fe93] to-[#15a0a0] hover:from-[#00d47b] hover:to-[#138a8a]"
          : "bg-white/10"
      }`}
    >
      <span
        className={`${
          isEnabled ? "text-black" : "text-white/50"
        } text-base font-semibold leading-snug`}
      >
        {label}
      </span>
    </button>
  );
};

export default CustomButton;
