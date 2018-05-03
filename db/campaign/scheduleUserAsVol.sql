INSERT INTO event_participants (campaign_id, event_id, user_id) VALUES ($1, $2, $3)

RETURNING *;