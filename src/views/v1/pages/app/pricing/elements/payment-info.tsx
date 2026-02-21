interface PaymentInfoProps {
  cardType: string;
  lastFourDigits: string;
  expiryDate: string;
  onEdit: () => void;
}

export function PaymentInfo(props: PaymentInfoProps) {
  return (
    <div className="flex items-center gap-8 text-white w-full">
      <span>{`${props.cardType} ${props.lastFourDigits}`}</span>
      <span>{`Expires ${props.expiryDate}`}</span>
    </div>
  );
}
