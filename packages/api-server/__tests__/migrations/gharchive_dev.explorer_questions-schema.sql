CREATE TABLE `explorer_questions` (
  `id` varbinary(16) NOT NULL,
  `hash` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL COMMENT 'The user id of system user',
  `status` enum('new','waiting','running','success','error','cancel') NOT NULL,
  `title` varchar(255) NOT NULL,
  `query_sql` text NOT NULL,
  `query_hash` varchar(128) NOT NULL,
  `engines` json NOT NULL,
  `queue_name` enum('explorer_high_concurrent_queue','explorer_low_concurrent_queue') DEFAULT NULL,
  `queue_job_id` varchar(128) NULL,
  `result` json DEFAULT NULL,
  `chart` json DEFAULT NULL,
  `recommended` tinyint(1) NOT NULL DEFAULT '0',
  `hit_cache` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `requested_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `executed_at` datetime DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  `spent` float DEFAULT NULL,
  `error` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  KEY `idx_eq_on_user_id_created_at` (`user_id`,`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin
