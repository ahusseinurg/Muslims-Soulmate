CREATE TABLE `event_reminders` (
	`id` text PRIMARY KEY NOT NULL,
	`event` text NOT NULL,
	`owner` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_reminder_once` ON `event_reminders` (`event`,`owner`);--> statement-breakpoint
CREATE INDEX `event_reminders_owner` ON `event_reminders` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`target` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `favorite_pair` ON `favorites` (`owner`,`target`);--> statement-breakpoint
CREATE INDEX `favorites_owner` ON `favorites` (`owner`,`created`);--> statement-breakpoint
CREATE TABLE `post_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`owner` text NOT NULL,
	`body` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `post_comments_post` ON `post_comments` (`post_id`,`created`);--> statement-breakpoint
CREATE TABLE `post_reactions` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `post_reaction_once` ON `post_reactions` (`post_id`,`owner`);--> statement-breakpoint
CREATE INDEX `post_reactions_post` ON `post_reactions` (`post_id`,`created`);