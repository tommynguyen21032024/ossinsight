WITH prs_with_latest_repo_name AS (
    SELECT
        event_month,
        actor_id,
        FIRST_VALUE(repo_name) OVER (PARTITION BY repo_id ORDER BY created_at DESC) AS repo_name,
        ROW_NUMBER() OVER(PARTITION BY actor_id) AS row_num
    FROM github_events
    USE INDEX(index_github_events_on_repo_id)
    WHERE
        type = 'WatchEvent' AND repo_id = 41986369
), acc AS (
    SELECT
        event_month,
        repo_name,
        COUNT(actor_id) OVER(PARTITION BY repo_name ORDER BY event_month ASC) AS total
    FROM prs_with_latest_repo_name
    WHERE row_num = 1
    ORDER BY 1
)
SELECT event_month, ANY_VALUE(repo_name) AS repo_name, ANY_VALUE(total) AS total
FROM acc
GROUP BY 1
ORDER BY 1
