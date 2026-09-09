CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`thread` text NOT NULL,
	`kind` text NOT NULL,
	`media` text NOT NULL,
	`mime` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `background_checks` (
	`owner` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`reference` text NOT NULL,
	`completed` integer NOT NULL,
	`expires` integer NOT NULL,
	`reviewer` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `call_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`thread` text NOT NULL,
	`caller` text NOT NULL,
	`callee` text NOT NULL,
	`kind` text NOT NULL,
	`status` text NOT NULL,
	`offer` text NOT NULL,
	`answer` text,
	`created` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `check_requests` (
	`owner` text PRIMARY KEY NOT NULL,
	`consented` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `daily_usage` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`owner` text NOT NULL,
	`status` text NOT NULL,
	`session` text,
	`amount` integer NOT NULL,
	`fee` integer NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_attendee` ON `event_tickets` (`event`,`owner`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`venue` text NOT NULL,
	`starts` integer NOT NULL,
	`capacity` integer NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`owner` text NOT NULL,
	`actor` text NOT NULL,
	`kind` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `notification_owner_id` ON `notifications` (`owner`,`id`);--> statement-breakpoint
CREATE TABLE `payout_accounts` (
	`owner` text PRIMARY KEY NOT NULL,
	`account` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`owner` text PRIMARY KEY NOT NULL,
	`customer` text NOT NULL,
	`subscription` text NOT NULL,
	`plan` text NOT NULL,
	`expires` integer NOT NULL
);
