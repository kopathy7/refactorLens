interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        rounded-xl
        bg-blue-600
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-300
        hover:bg-blue-700
        hover:scale-[1.02]
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}