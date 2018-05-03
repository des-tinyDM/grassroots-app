SELECT * FROM event_participants ep JOIN users u 
ON ep.user_id = u.user_id
WHERE event_id = $1;