select c.event_id, e.date_start as event_date, c.user_id, CONCAT( u.first_name,' ',u.last_name) as name,  count (*) as VR from communication c  
join users u on u.user_id = c.user_id 
join events e on c.event_id = e.event_id
where e.campaign_id = $1 AND c.type = 'VR'
group by c.user_id, c.event_id, u.first_name, u.last_name, e.date_start
order by e.date_start asc