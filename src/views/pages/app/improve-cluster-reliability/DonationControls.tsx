interface DonationControlsProps {
  selectedAmount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
  customAmount: string;
  setCustomAmount: React.Dispatch<React.SetStateAction<string>>;
  donationType: "once" | "monthly";
  setDonationType: React.Dispatch<React.SetStateAction<"once" | "monthly">>;
}

const DonationControls: React.FC<DonationControlsProps> = ({
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  donationType,
  setDonationType,
}) => {
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={() => setDonationType("once")}
          className={`w-full py-3 rounded transition-colors ${donationType === "once" ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-700 hover:bg-pink-800"}`}
        >
          Give Once
        </button>
        <button
          onClick={() => setDonationType("monthly")}
          className={`w-full py-3 rounded transition-colors ${donationType === "monthly" ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-700 hover:bg-pink-800"}`}
        >
          Give Monthly
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[20, 200, 500, 1000].map(amount => (
          <button
            key={amount}
            onClick={() => setSelectedAmount(amount)}
            className={`${
              selectedAmount === amount ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-700 hover:bg-gray-600"
            } transition-colors text-white py-2 rounded`}
            aria-pressed={selectedAmount === amount}
          >
            ${amount}/{donationType === "monthly" ? "mo" : "once"}
          </button>
        ))}
        <button
          onClick={() => setSelectedAmount(2000)}
          className={`${
            selectedAmount === 2000 ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-700 hover:bg-gray-600"
          } transition-colors text-white py-2 rounded col-span-2`}
          aria-pressed={selectedAmount === 2000}
        >
          $2000/{donationType === "monthly" ? "mo" : "once"}
        </button>
        <input
          type="text"
          value={customAmount}
          onChange={handleCustomAmountChange}
          placeholder="$ Other amount"
          className="col-span-2 p-2 border border-gray-500 rounded bg-gray-800 text-white focus:outline-none focus:border-pink-500"
          aria-label="Custom donation amount"
        />
      </div>

      <button
        className="bg-pink-500 hover:bg-pink-600 transition-colors text-white w-full py-3 rounded mt-4"
        onClick={() => console.log(`Donating $${selectedAmount} ${donationType}`)}
      >
        Donate ${selectedAmount.toLocaleString()} {donationType === "monthly" ? "Monthly" : "Once"}
      </button>
    </>
  );
};

export default DonationControls;
