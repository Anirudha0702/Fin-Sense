CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`amount` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`payment_method` text DEFAULT 'upi' NOT NULL,
	`category` text DEFAULT 'bills' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
