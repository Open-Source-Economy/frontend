import React from "react";
import { CardHeader } from "./card-header";
import { SubscriptionDetails } from "./subscription-details";
import { PaymentInfo } from "./payment-info";
import { PaymentSchedule } from "./payment-schedule";
import { Card } from "./card";
import { CurrentSubscriptionIcon, PaymentInfoIcon, PaymentScheduleIcon } from "src/ultils/Icons";
import type { PlanDescription } from "./data/data";
import { PlanPriceType } from "@open-source-economy/api-types";

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

export function CurrentSubscription(props: CurrentSubscriptionProps) {
  const className = props.className ?? "";
  const gridLayout = props.gridLayout ?? "grid md:grid-cols-2 lg:grid-cols-5 gap-8";

  return (
    <div className={`${gridLayout} ${className}`}>
      <Card className="row-span-2 lg:col-span-2" data-aos="fade-up" data-aos-delay="0">
        <CardHeader icon={CurrentSubscriptionIcon} title="Current Subscription" />
        <SubscriptionDetails plan={props.plan} planPriceType={props.billingPeriod} prices={props.prices} />
        {
          <div className="p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg w-full">
            <button
              type="button"
              className="group text-center uppercase w-full p-[14px] rounded-lg font-medium text-sm bg-theme-blue hover:bg-opacity-0 transition"
              onClick={props.onCancelSubscription}
            >
              <span className="bg-clip-text text-transparent group-hover:text-white text-lg bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 w-full font-semibold transition">
                Cancel Subscription
              </span>
            </button>
          </div>
        }
      </Card>

      <Card className="lg:col-span-3" data-aos="fade-up" data-aos-delay="100">
        <CardHeader icon={PaymentInfoIcon} title="Payment Info" action={props.onEditPayment ? { label: "Edit", onClick: props.onEditPayment } : undefined} />
        <PaymentInfo cardType={props.payment.cardType} lastFourDigits={props.payment.lastFourDigits} expiryDate={props.payment.expiryDate} onEdit={props.onEditPayment} />
      </Card>

      <Card className="lg:col-span-3" data-aos="fade-up" data-aos-delay="200">
        <CardHeader
          icon={PaymentScheduleIcon}
          title="Payment Schedule"
          action={props.onViewInvoices ? { label: "See invoices", onClick: props.onViewInvoices } : undefined}
        />
        <PaymentSchedule lastPayment={props.schedule.lastPayment} nextPayment={props.schedule.nextPayment} />
      </Card>
    </div>
  );
}
