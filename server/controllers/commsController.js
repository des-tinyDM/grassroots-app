const submitContact = (req, res) => {
  const db = req.app.get("db");
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
    email,
    DOB
  } = req.body.firstName;
  console.log(req.body.firstName);

  db.comms
    .submitContactInfo([
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
      email,
      DOB
    ])
    .then(response => {
      console.log(`hit`, response), res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const submitComms = (req, res) => {
  const db = req.app.get("db");
  const { event_id, user_id, contact_id } = req.body;
};

const getCommsData = (req, res) => {
  const db = req.app.get("db");
  const { campaign_id, type } = req.params;

  db.comms
    .getCommsData([campaign_id, type])
    .then(response => {
      console.log(response), res.status(200).send(response);
    })
    .catch(err => {
      console.log(err), res.status(500).send(err);
    });
};

module.exports = {
  submitContact,
  getCommsData
};
