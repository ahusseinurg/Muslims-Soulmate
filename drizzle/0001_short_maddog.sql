CREATE TABLE `capture_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`slot` text NOT NULL,
	`created` integer NOT NULL,
	`expires` integer NOT NULL,
	`used` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile_photos` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`slot` text NOT NULL,
	`media` text NOT NULL,
	`captured` integer NOT NULL,
	`expires` integer NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `photo_slot` ON `profile_photos` (`owner`,`slot`);