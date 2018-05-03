INSERT INTO campaigns
    (name, organization, orglogo, type, scope, description, created_by)
VALUES
    ($1, $2, $3, $4, $5, $6, $7);

RETURNING *;