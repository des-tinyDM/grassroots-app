UPDATE users
SET 
first_name = $1, 
last_name = $2, 
address = $3, 
city = $4, 
state = $5, 
zip =$6, 
email =$7, 
phone = $8

WHERE user_id = $9
RETURNING *;