interface ProgressSectionProps {
  currentAmount: number;
  targetAmount: number;
  backers: number;
  daysLeft: number;
}

const Progress: React.FC<ProgressSectionProps> = ({ currentAmount, targetAmount, backers, daysLeft }) => {
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <>
      <h2 className="text-2xl font-bold">${currentAmount.toLocaleString()}/mo</h2>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="text-sm">
        ${currentAmount.toLocaleString()} pledged of ${targetAmount.toLocaleString()}/mo
      </p>
      <p className="text-sm">{backers.toLocaleString()} Backers</p>
      <p className="text-sm">{daysLeft} Days to go</p>
    </>
  );
};

export default Progress;
