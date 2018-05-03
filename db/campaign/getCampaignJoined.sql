SELECT *
FROM campaigns c JOIN campaign_members m ON c.campaign_id = m.campaign_id
WHERE user_id = $1;
