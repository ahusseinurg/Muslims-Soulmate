CREATE TABLE `message_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`message_id` text NOT NULL,
	`viewer` text NOT NULL,
	`delivered` integer NOT NULL,
	`viewed` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `message_receipt_once` ON `message_receipts` (`message_id`,`viewer`);--> statement-breakpoint
CREATE INDEX `message_receipts_message` ON `message_receipts` (`message_id`);