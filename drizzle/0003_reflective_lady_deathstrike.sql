CREATE TABLE `health_share_groups` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`region` text NOT NULL,
	`monthly_target` integer NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `health_share_members` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`owner` text NOT NULL,
	`role` text NOT NULL,
	`status` text NOT NULL,
	`joined` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `health_share_membership` ON `health_share_members` (`group_id`,`owner`);--> statement-breakpoint
CREATE INDEX `health_share_group_members` ON `health_share_members` (`group_id`,`status`);