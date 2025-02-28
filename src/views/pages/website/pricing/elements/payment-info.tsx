interface PaymentInfoProps {
  cardType: string;
  lastFourDigits: string;
  expiryDate: string;
  onEdit: () => void;
}

export function PaymentInfo({ cardType, lastFourDigits, expiryDate, onEdit }: PaymentInfoProps) {
  return (
    <div className="flex items-center gap-8 text-white w-full">
      <span>{`${cardType} ${lastFourDigits}`}</span>
      <span>{`Expires ${expiryDate}`}</span>
    </div>
  );
}
