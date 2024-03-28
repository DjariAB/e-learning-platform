CREATE TABLE `courses` (
	`id` varchar(196) NOT NULL DEFAULT (uuid()),
	`name` varchar(256) NOT NULL,
	`image_url` varchar(511) NOT NULL,
	`educator_id` varchar(256) NOT NULL,
	`level` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255),
	`github_id` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`),
	CONSTRAINT `user_github_id_unique` UNIQUE(`github_id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `courses` (`name`);--> statement-breakpoint
ALTER TABLE `courses` ADD CONSTRAINT `courses_educator_id_user_id_fk` FOREIGN KEY (`educator_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;