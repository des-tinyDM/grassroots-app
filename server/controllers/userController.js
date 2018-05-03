const updateProfile = (req, res) => {
  const db = req.app.get("db");
  const {
    first_name,
    last_name,
    address,
    city,
    stateName,
    zip,
    email,
    phone
  } = req.body;
  const { id } = req.params;

  //find profile by id
  // console.log(req.params, req.body);

  db.user
    .updateProfile([
      first_name,
      last_name,
      address,
      city,
      stateName,
      zip,
      email,
      phone,
      id
    ])
    .then(profile => res.status(200).send(profile[0]))
    .catch(err => console.log(err));
};

module.exports = {
  updateProfile
};
