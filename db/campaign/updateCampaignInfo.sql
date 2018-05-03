UPDATE campaigns
SET 
name = $1,
organization = $2,
orglogo = $3, 
type = $4, 
scope= $5, 
description = $6

WHERE campaign_id = $7