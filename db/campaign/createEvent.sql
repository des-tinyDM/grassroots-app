INSERT INTO events (campaign_id, event_name, description, location, address, city, state, zip, start, end)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 ,$10)

RETURNING *;