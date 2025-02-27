import React from "react";
import { CardHeader } from "./card-header";
import { SubscriptionDetails } from "./subscription-details";
import { PaymentInfo } from "./payment-info";
import { PaymentSchedule } from "./payment-schedule";
import { Card } from "./card";
import { CurrentSubscriptionIcon, PaymentInfoIcon, PaymentScheduleIcon } from "src/Utils/Icons";
import type { PlanDescription } from "./data/data";
import { PlanPriceType } from "../../../../../model";

interface PaymentDetails {
  cardType: string;
  lastFourDigits: string;
  expiryDate: string;
}

interface PaymentScheduleDetails {
  lastPayment: string;
  nextPayment: string;
}

interface CurrentSubscriptionProps {
  plan: PlanDescription;
  billingPeriod: PlanPriceType;
  prices: Record<PlanPriceType, number>;
  payment: PaymentDetails;
  schedule: PaymentScheduleDetails;
  onCancelSubscription: () => void;
  onEditPayment: () => void;
  onViewInvoices: () => void;
  className?: string;
  gridLayout?: string;
}

export function CurrentSubscription({
  plan,
  billingPeriod,
  prices,
  payment,
  schedule,
  onCancelSubscription,
  onEditPayment,
  onViewInvoices,
  className = "",
  gridLayout = "grid md:grid-cols-2 lg:grid-cols-5 gap-8",
}: CurrentSubscriptionProps) {
  return (
    <div className={`${gridLayout} ${className}`}>
      <Card className="row-span-2 lg:col-span-2" data-aos="fade-up" data-aos-delay="0">
        <CardHeader icon={CurrentSubscriptionIcon} title="Current Subscription" />
        <SubscriptionDetails plan={plan} planPriceType={billingPeriod} prices={prices} />
        {
          <div className="p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg w-full">
            <button
              type="button"
              className="group text-center uppercase w-full p-[14px] rounded-lg font-medium text-sm bg-theme-blue hover:bg-opacity-0 transition"
              onClick={onCancelSubscription}
            >
              <span className="bg-clip-text text-transparent group-hover:text-white text-lg bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 w-full font-semibold transition">
                Cancel Subscription
              </span>
            </button>
          </div>
        }
      </Card>

      <Card className="lg:col-span-3" data-aos="fade-up" data-aos-delay="100">
        <CardHeader icon={PaymentInfoIcon} title="Payment Info" action={onEditPayment ? { label: "Edit", onClick: onEditPayment } : undefined} />
        <PaymentInfo cardType={payment.cardType} lastFourDigits={payment.lastFourDigits} expiryDate={payment.expiryDate} onEdit={onEditPayment} />
      </Card>

      <Card className="lg:col-span-3" data-aos="fade-up" data-aos-delay="200">
        <CardHeader
          icon={PaymentScheduleIcon}
          title="Payment Schedule"
          action={onViewInvoices ? { label: "See invoices", onClick: onViewInvoices } : undefined}
        />
        <PaymentSchedule lastPayment={schedule.lastPayment} nextPayment={schedule.nextPayment} />
      </Card>
    </div>
  );
}
