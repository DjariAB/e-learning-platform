CREATE TABLE `chapter` (
	`id` varchar(196) NOT NULL,
	`course_id` varchar(196) NOT NULL,
	`chapter_name` varchar(255) NOT NULL,
	CONSTRAINT `chapter_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `educator` (
	`id` varchar(196) NOT NULL,
	`educator_name` varchar(255) NOT NULL,
	`user_name` varchar(255) NOT NULL,
	`description` varchar(1000) NOT NULL,
	CONSTRAINT `educator_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `enrolled_Courses` (
	`course_id` varchar(196) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`user_progress` int,
	`current_lesson_id` varchar(196),
	CONSTRAINT `enrolled_Courses_course_id` PRIMARY KEY(`course_id`)
);
--> statement-breakpoint
CREATE TABLE `lesson` (
	`id` varchar(196) NOT NULL,
	`lesson_title` varchar(255) NOT NULL,
	`chapter_id` varchar(196) NOT NULL,
	CONSTRAINT `lesson_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` varchar(196) NOT NULL,
	`lesson_id` varchar(196),
	`question` varchar(255) NOT NULL,
	`choice_1` varchar(255) NOT NULL,
	`choice_2` varchar(255) NOT NULL,
	`choice_3` varchar(255) NOT NULL,
	`correct_choice` varchar(255) NOT NULL,
	CONSTRAINT `question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `educator_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `courses` MODIFY COLUMN `level` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `chapter` ADD CONSTRAINT `chapter_course_id_courses_id_fk` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lesson` ADD CONSTRAINT `lesson_chapter_id_chapter_id_fk` FOREIGN KEY (`chapter_id`) REFERENCES `chapter`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `question` ADD CONSTRAINT `question_lesson_id_lesson_id_fk` FOREIGN KEY (`lesson_id`) REFERENCES `lesson`(`id`) ON DELETE no action ON UPDATE no action;