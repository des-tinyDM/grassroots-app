INSERT INTO contact_info 
(first_name, last_name, address, city, state, zip, phone, email, dob)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 )

RETURNING *