select count(*), c.event_id, e.event_name, e.start, type, CONCAT(u.first_name,' ',u.last_name) as name from communication c
join users u on c.user_id = u.user_id
join events e on e.event_id = c.event_id
where u.user_id = 12
group by c.event_id, e.event_name, type, e.start, name
order by e.start asc