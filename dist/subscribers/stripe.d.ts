import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa";
import Stripe from "stripe";
export default function stripeHandler({ data, container, }: SubscriberArgs<Stripe.Event>): Promise<void>;
export declare const config: SubscriberConfig;
