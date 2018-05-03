SELECT * 
FROM events e 
JOIN event_participants ep 
ON e.event_id = ep.event_id 

WHERE user_id = $1;