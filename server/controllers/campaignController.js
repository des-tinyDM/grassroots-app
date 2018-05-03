const getCampaigns = (req, res) => {
  const db = req.app.get("db");
  const {
    name,
    organization,
    orglogo,
    type,
    scope,
    description,
    active
  } = req.body;

  db.campaign
    .getCampaignList()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const createCampaign = (req, res) => {
  const db = req.app.get("db");
  const {
    name,
    organization,
    orglogo,
    type,
    scope,
    description,
    user_id
  } = req.body;

  db.campaign
    .createCampaign([
      name,
      organization,
      orglogo,
      type,
      scope,
      description,
      user_id
    ])
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(console.log);
};

// const updateCampaignInfo = (req, res, next) => {
//   const db = req.app.get("db");
//   const {
//     name,
//     organization,
//     orglogo,
//     type,
//     scope,
//     description,
//     active
//   } = req.body;
// };

// db
//   .updateCampaignInfo([
//     name,
//     organization,
//     orglogo,
//     type,
//     scope,
//     description,
//     active
//   ])
//   .then(response =>
//     res
//       .status(200)
//       .json(response)
//       .catch(console.log)
//   );

const addCampaigns = (req, res) => {
  const db = req.app.get("db");

  db.campaign
    .userJoinsCampaign([req.user.id, req.params.id])
    .then(response => getCampaigns(req, res))
    .catch(err => res.status(500).json(err));
};

const getCampaignsJoined = (req, res) => {
  const db = req.app.get("db");
  // console.log(req.params);

  db.campaign
    .getCampaignJoined(req.params.user_id)
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json(err);
    });
};

const getEvents = (req, res) => {
  const db = req.app.get("db");
  const { campaign_id } = req.params;
  // console.log(req.params);

  db.campaign
    .getCampaignEvents(campaign_id)
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      // console.log(err);
      res.status(500).json(err);
    });
};

const userJoinsCampaign = (req, res) => {
  const db = req.app.get("db");
  const { campaign_id } = req.params;
  const { user_id, role } = req.body;

  db.campaign
    .userJoinsCampaign([campaign_id, user_id, role])
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getVolRole = (req, res) => {
  const db = req.app.get("db");
  const { campaign_id, user_id } = req.params;

  db.campaign
    .getVolRole([campaign_id, user_id])
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const scheduleUserAsVol = (req, res) => {
  const db = req.app.get("db");
  const { campaign_id, event_id, user_id } = req.body;

  db.campaign
    .scheduleUserAsVol([campaign_id, event_id, user_id])
    .then(scheduled => {
      // console.log(scheduled);
      res.status(200).json(scheduled);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getVolunteers = (req, res) => {
  const db = req.app.get("db");
  const { event_id } = req.params;

  db.campaign
    .getScheduledVolunteers([event_id])
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const getScheduledEvents = (req, res) => {
  const db = req.app.get("db");
  console.log(req.params);
  console.dir(req.params);

  db.campaign
    .getScheduledEvents(req.params.user_id)
    .then(scheduledEvents => {
      res.status(200).json(scheduledEvents);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

const createEvent = (req, res) => {
  const db = req.app.get("db");
  console.log(req.params, req.body);
  let { campaign_id } = req.params;
  let {
    name,
    desc,
    location,
    address,
    city,
    stateName,
    zip,
    start,
    end
  } = req.body;

  db.campaign
    .createEvent([
      campaign_id,
      name,
      desc,
      location,
      address,
      city,
      stateName,
      zip,
      start,
      end
    ])
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err), res.status(500).json(err);
    });
};

module.exports = {
  getCampaigns,
  createCampaign,
  getCampaignsJoined,
  userJoinsCampaign,
  getVolRole,
  getEvents,
  scheduleUserAsVol,
  getScheduledEvents,
  getVolunteers,
  createEvent
  // updateCampaignInfo
};
