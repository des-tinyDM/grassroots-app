INSERT INTO users
    (first_name, last_name, profile_img, authid)
VALUES
    ($1, $2, $3, $4)
RETURNING *;