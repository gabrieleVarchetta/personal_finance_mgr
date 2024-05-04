ALTER TABLE "category" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "moneyaccount" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "moneyaccount" ADD COLUMN "type" text NOT NULL;