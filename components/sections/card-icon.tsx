import {
  BookOpen,
  Compass,
  Globe,
  MailCheck,
  PhoneCall,
  ReceiptText,
  Scale,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";

import type { CardIcon } from "@/content/types";

/*
 * Card icons: the one map from a content icon key (`Service.icon`,
 * `UseCase.icon`, `resourceIcon`) to its Lucide component. CardGrid renders
 * the icon tile from it.
 */
export const cardIcons: Record<CardIcon, typeof Compass> = {
  compass: Compass,
  globe: Globe,
  workflow: Workflow,
  smartphone: Smartphone,
  wrench: Wrench,
  scale: Scale,
  "receipt-text": ReceiptText,
  "phone-call": PhoneCall,
  "mail-check": MailCheck,
  "book-open": BookOpen,
};
