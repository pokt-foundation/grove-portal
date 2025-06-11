// app/types/stripe-custom.ts
// Custom types for Stripe objects that are missing from the official types

export interface UsageRecordSummary {
  id: string;
  object: 'usage_record_summary';
  invoice: string | null;
  livemode: boolean;
  period: {
    start: number | null;
    end: number | null;
  };
  subscription_item: string;
  total_usage: number;
}

// For Stripe.ApiList compatibility
export interface UsageRecordSummaryList {
  object: 'list';
  data: UsageRecordSummary[];
  has_more: boolean;
  url: string;
}
