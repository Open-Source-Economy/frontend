interface PaymentScheduleProps {
  lastPayment: string;
  nextPayment: string;
}

export function PaymentSchedule({ lastPayment, nextPayment }: PaymentScheduleProps) {
  return (
    <div className="flex items-center gap-8 text-white w-full">
      <div>
        <span className="text-gray-400">Last Payment: </span>
        {lastPayment}
      </div>
      <div>
        <span className="text-gray-400">Next Payment: </span>
        {nextPayment}
      </div>
    </div>
  );
}
