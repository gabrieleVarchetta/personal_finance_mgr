CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "moneyaccount" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "money_account_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "money_account_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "category_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transaction" ADD COLUMN "category_name" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_money_account_id_moneyaccount_id_fk" FOREIGN KEY ("money_account_id") REFERENCES "moneyaccount"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
