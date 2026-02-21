interface PaymentScheduleProps {
  lastPayment: string;
  nextPayment: string;
}

export function PaymentSchedule(props: PaymentScheduleProps) {
  return (
    <div className="flex items-center gap-8 text-white w-full">
      <div>
        <span className="text-gray-400">Last Payment: </span>
        {props.lastPayment}
      </div>
      <div>
        <span className="text-gray-400">Next Payment: </span>
        {props.nextPayment}
      </div>
    </div>
  );
}
