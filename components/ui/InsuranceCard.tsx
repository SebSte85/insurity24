import { IconType } from "react-icons";

interface InsuranceCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const InsuranceCard = ({ title, icon, onClick }: InsuranceCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#6B7BF7] w-[140px] h-[140px] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-[#5A6AE6] transition-all hover:scale-105"
    >
      <div className="text-white w-10 h-10">{icon}</div>
      <span className="text-white text-base font-medium">{title}</span>
    </button>
  );
};
