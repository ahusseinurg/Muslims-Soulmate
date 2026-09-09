CREATE TABLE `status_audience` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`viewer` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `status_audience_member` ON `status_audience` (`post_id`,`viewer`);--> statement-breakpoint
CREATE INDEX `status_audience_viewer` ON `status_audience` (`viewer`,`post_id`);--> statement-breakpoint
CREATE TABLE `status_privacy` (
	`post_id` text PRIMARY KEY NOT NULL,
	`mode` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `status_views` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`viewer` text NOT NULL,
	`viewed` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `status_view_once` ON `status_views` (`post_id`,`viewer`);--> statement-breakpoint
CREATE INDEX `status_views_post` ON `status_views` (`post_id`,`viewed`);