CREATE TABLE `blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `block_pair` ON `blocks` (`owner`,`target`);--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`sender` text NOT NULL,
	`recipient` text NOT NULL,
	`status` text NOT NULL,
	`created` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiry_recipient` ON `inquiries` (`recipient`);--> statement-breakpoint
CREATE UNIQUE INDEX `inquiry_pair` ON `inquiries` (`sender`,`recipient`);--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`user` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `membership` ON `members` (`group_id`,`user`);--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`thread` text NOT NULL,
	`sender` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `message_thread` ON `messages` (`thread`,`created`);--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`body` text NOT NULL,
	`media` text,
	`status` text NOT NULL,
	`created` integer NOT NULL,
	`expires` integer
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`owner` text PRIMARY KEY NOT NULL,
	`stars` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL,
	`reason` text NOT NULL,
	`created` integer NOT NULL
);
