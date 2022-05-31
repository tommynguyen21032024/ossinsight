
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`key`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `blacklist_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blacklist_repos` (
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `blacklist_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blacklist_users` (
  `login` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cn_orgs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cn_orgs` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cn_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cn_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `collection_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collection_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `collection_id` bigint(20) DEFAULT NULL,
  `repo_name` varchar(255) NOT NULL,
  `repo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  KEY `index_collection_items_on_collection_id` (`collection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=60001;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collections` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `public` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  UNIQUE KEY `index_collections_on_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=60001;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `css_framework_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `css_framework_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `db_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `db_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `event_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  KEY `index_event_logs_on_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=22008342393;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `gh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gh` (
  `id` bigint(20) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `repo_id` bigint(20) DEFAULT NULL,
  `repo_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_id` bigint(20) DEFAULT NULL,
  `actor_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additions` bigint(20) DEFAULT NULL,
  `deletions` bigint(20) DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `commit_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `org_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_id` bigint(20) DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `comments` int(11) DEFAULT NULL,
  `pr_merged_at` datetime DEFAULT NULL,
  `pr_merged` tinyint(1) DEFAULT NULL,
  `pr_changed_files` int(11) DEFAULT NULL,
  `pr_review_comments` int(11) DEFAULT NULL,
  `pr_or_issue_id` bigint(20) DEFAULT NULL,
  `event_day` date DEFAULT NULL,
  `event_month` date DEFAULT NULL,
  `author_association` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_year` int(11) DEFAULT NULL,
  `push_size` int(11) DEFAULT NULL,
  `push_distinct_size` int(11) DEFAULT NULL,
  KEY `index_github_events_on_id` (`id`),
  KEY `index_github_events_on_action` (`action`),
  KEY `index_github_events_on_actor_id` (`actor_id`),
  KEY `index_github_events_on_actor_login` (`actor_login`),
  KEY `index_github_events_on_additions` (`additions`),
  KEY `index_github_events_on_closed_at` (`closed_at`),
  KEY `index_github_events_on_comment_id` (`comment_id`),
  KEY `index_github_events_on_comments` (`comments`),
  KEY `index_github_events_on_commit_id` (`commit_id`),
  KEY `index_github_events_on_created_at` (`created_at`),
  KEY `index_github_events_on_deletions` (`deletions`),
  KEY `index_github_events_on_event_day` (`event_day`),
  KEY `index_github_events_on_event_month` (`event_month`),
  KEY `index_github_events_on_event_year` (`event_year`),
  KEY `index_github_events_on_language` (`language`),
  KEY `index_github_events_on_org_id` (`org_id`),
  KEY `index_github_events_on_org_login` (`org_login`),
  KEY `index_github_events_on_pr_changed_files` (`pr_changed_files`),
  KEY `index_github_events_on_pr_merged_at` (`pr_merged_at`),
  KEY `index_github_events_on_pr_or_issue_id` (`pr_or_issue_id`),
  KEY `index_github_events_on_pr_review_comments` (`pr_review_comments`),
  KEY `index_github_events_on_repo_id` (`repo_id`),
  KEY `index_github_events_on_repo_name` (`repo_name`),
  KEY `index_github_events_on_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `github_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `github_events` (
  `id` bigint(20) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `repo_id` bigint(20) DEFAULT NULL,
  `repo_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_id` bigint(20) DEFAULT NULL,
  `actor_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additions` bigint(20) DEFAULT NULL,
  `deletions` bigint(20) DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `commit_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `org_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_id` bigint(20) DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `comments` int(11) DEFAULT NULL,
  `pr_merged_at` datetime DEFAULT NULL,
  `pr_merged` tinyint(1) DEFAULT NULL,
  `pr_changed_files` int(11) DEFAULT NULL,
  `pr_review_comments` int(11) DEFAULT NULL,
  `pr_or_issue_id` bigint(20) DEFAULT NULL,
  `event_day` date DEFAULT NULL,
  `event_month` date DEFAULT NULL,
  `author_association` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_year` int(11) DEFAULT NULL,
  `push_size` int(11) DEFAULT NULL,
  `push_distinct_size` int(11) DEFAULT NULL,
  KEY `index_github_events_on_id` (`id`),
  KEY `index_github_events_on_action` (`action`),
  KEY `index_github_events_on_actor_id` (`actor_id`),
  KEY `index_github_events_on_actor_login` (`actor_login`),
  KEY `index_github_events_on_additions` (`additions`),
  KEY `index_github_events_on_closed_at` (`closed_at`),
  KEY `index_github_events_on_comment_id` (`comment_id`),
  KEY `index_github_events_on_comments` (`comments`),
  KEY `index_github_events_on_commit_id` (`commit_id`),
  KEY `index_github_events_on_created_at` (`created_at`),
  KEY `index_github_events_on_deletions` (`deletions`),
  KEY `index_github_events_on_event_day` (`event_day`),
  KEY `index_github_events_on_event_month` (`event_month`),
  KEY `index_github_events_on_event_year` (`event_year`),
  KEY `index_github_events_on_language` (`language`),
  KEY `index_github_events_on_org_id` (`org_id`),
  KEY `index_github_events_on_org_login` (`org_login`),
  KEY `index_github_events_on_pr_changed_files` (`pr_changed_files`),
  KEY `index_github_events_on_pr_merged_at` (`pr_merged_at`),
  KEY `index_github_events_on_pr_or_issue_id` (`pr_or_issue_id`),
  KEY `index_github_events_on_pr_review_comments` (`pr_review_comments`),
  KEY `index_github_events_on_repo_id` (`repo_id`),
  KEY `index_github_events_on_repo_name` (`repo_name`),
  KEY `index_github_events_on_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
PARTITION BY LIST COLUMNS(`type`)
(PARTITION `push_event` VALUES IN ("PushEvent"),
 PARTITION `create_event` VALUES IN ("CreateEvent"),
 PARTITION `pull_request_event` VALUES IN ("PullRequestEvent"),
 PARTITION `watch_event` VALUES IN ("WatchEvent"),
 PARTITION `issue_comment_event` VALUES IN ("IssueCommentEvent"),
 PARTITION `issues_event` VALUES IN ("IssuesEvent"),
 PARTITION `delete_event` VALUES IN ("DeleteEvent"),
 PARTITION `fork_event` VALUES IN ("ForkEvent"),
 PARTITION `pull_request_review_comment_event` VALUES IN ("PullRequestReviewCommentEvent"),
 PARTITION `pull_request_review_event` VALUES IN ("PullRequestReviewEvent"),
 PARTITION `gollum_event` VALUES IN ("GollumEvent"),
 PARTITION `release_event` VALUES IN ("ReleaseEvent"),
 PARTITION `member_event` VALUES IN ("MemberEvent"),
 PARTITION `commit_comment_event` VALUES IN ("CommitCommentEvent"),
 PARTITION `public_event` VALUES IN ("PublicEvent"),
 PARTITION `gist_event` VALUES IN ("GistEvent"),
 PARTITION `follow_event` VALUES IN ("FollowEvent"),
 PARTITION `event` VALUES IN ("Event"),
 PARTITION `download_event` VALUES IN ("DownloadEvent"),
 PARTITION `team_add_event` VALUES IN ("TeamAddEvent"),
 PARTITION `fork_apply_event` VALUES IN ("ForkApplyEvent"));
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `import_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `local_file` varchar(255) DEFAULT NULL,
  `start_download_at` datetime DEFAULT NULL,
  `end_download_at` datetime DEFAULT NULL,
  `start_import_at` datetime DEFAULT NULL,
  `end_import_at` datetime DEFAULT NULL,
  `start_batch_at` datetime DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  KEY `index_import_logs_on_filename` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=1590001;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `js_framework_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `js_framework_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `new_github_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_github_events` (
  `id` bigint(20) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `repo_id` bigint(20) DEFAULT NULL,
  `repo_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_id` bigint(20) DEFAULT NULL,
  `actor_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actor_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `additions` bigint(20) DEFAULT NULL,
  `deletions` bigint(20) DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `commit_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `org_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_id` bigint(20) DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pr_or_issue_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` mediumtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creator_user_login` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creator_user_id` bigint(20) DEFAULT NULL,
  `pr_or_issue_created_at` datetime DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `comments` int(11) DEFAULT NULL,
  `pr_merged_at` datetime DEFAULT NULL,
  `pr_merged` tinyint(1) DEFAULT NULL,
  `pr_changed_files` int(11) DEFAULT NULL,
  `pr_review_comments` int(11) DEFAULT NULL,
  `pr_or_issue_id` bigint(20) DEFAULT NULL,
  `event_day` date DEFAULT NULL,
  `event_month` date DEFAULT NULL,
  `author_association` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_year` int(11) DEFAULT NULL,
  `push_size` int(11) DEFAULT NULL,
  `push_distinct_size` int(11) DEFAULT NULL,
  KEY `index_github_events_on_id` (`id`),
  KEY `index_github_events_on_action` (`action`),
  KEY `index_github_events_on_actor_id` (`actor_id`),
  KEY `index_github_events_on_actor_login` (`actor_login`),
  KEY `index_github_events_on_closed_at` (`closed_at`),
  KEY `index_github_events_on_comment_id` (`comment_id`),
  KEY `index_github_events_on_comments` (`comments`),
  KEY `index_github_events_on_commit_id` (`commit_id`),
  KEY `index_github_events_on_created_at` (`created_at`),
  KEY `index_github_events_on_event_day` (`event_day`),
  KEY `index_github_events_on_event_month` (`event_month`),
  KEY `index_github_events_on_event_year` (`event_year`),
  KEY `index_github_events_on_language` (`language`),
  KEY `index_github_events_on_org_id` (`org_id`),
  KEY `index_github_events_on_org_login` (`org_login`),
  KEY `index_github_events_on_pr_merged_at` (`pr_merged_at`),
  KEY `index_github_events_on_pr_or_issue_id` (`pr_or_issue_id`),
  KEY `index_github_events_on_repo_id` (`repo_id`),
  KEY `index_github_events_on_repo_name` (`repo_name`),
  KEY `index_github_events_on_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
PARTITION BY LIST COLUMNS(`type`)
(PARTITION `push_event` VALUES IN ("PushEvent"),
 PARTITION `create_event` VALUES IN ("CreateEvent"),
 PARTITION `pull_request_event` VALUES IN ("PullRequestEvent"),
 PARTITION `watch_event` VALUES IN ("WatchEvent"),
 PARTITION `issue_comment_event` VALUES IN ("IssueCommentEvent"),
 PARTITION `issues_event` VALUES IN ("IssuesEvent"),
 PARTITION `delete_event` VALUES IN ("DeleteEvent"),
 PARTITION `fork_event` VALUES IN ("ForkEvent"),
 PARTITION `pull_request_review_comment_event` VALUES IN ("PullRequestReviewCommentEvent"),
 PARTITION `pull_request_review_event` VALUES IN ("PullRequestReviewEvent"),
 PARTITION `gollum_event` VALUES IN ("GollumEvent"),
 PARTITION `release_event` VALUES IN ("ReleaseEvent"),
 PARTITION `member_event` VALUES IN ("MemberEvent"),
 PARTITION `commit_comment_event` VALUES IN ("CommitCommentEvent"),
 PARTITION `public_event` VALUES IN ("PublicEvent"),
 PARTITION `gist_event` VALUES IN ("GistEvent"),
 PARTITION `follow_event` VALUES IN ("FollowEvent"),
 PARTITION `event` VALUES IN ("Event"),
 PARTITION `download_event` VALUES IN ("DownloadEvent"),
 PARTITION `team_add_event` VALUES IN ("TeamAddEvent"),
 PARTITION `fork_apply_event` VALUES IN ("ForkApplyEvent"));
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `nocode_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nocode_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `osdb_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `osdb_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `programming_language_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programming_language_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `static_site_generator_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `static_site_generator_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USR',
  `fake` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `long` decimal(11,8) DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `country_code` char(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  KEY `index_login_on_users` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=68024323;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `web_framework_repos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_framework_repos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] NONCLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `schema_migrations` (version) VALUES
('20211118190004'),
('20211205174309'),
('20211205190931'),
('20211206155721'),
('20211208112931'),
('20211214161151'),
('20220110101625'),
('20220111101529'),
('20220111105518'),
('20220111105944'),
('20220111112315'),
('20220112163444'),
('20220512044547'),
('20220512044558'),
('20220526073719'),
('20220526174823');


