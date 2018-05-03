require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");

const session = require("express-session");
const massive = require("massive");
const passport = require("passport");

const {
  submitContact,
  getCommsData
} = require(`${__dirname}/controllers/commsController`);
const {
  getCampaigns,
  getCampaignsJoined,
  createCampaign,
  updateCampaignInfo,
  userJoinsCampaign,
  getVolRole,
  getEvents,
  scheduleUserAsVol,
  getScheduledEvents,
  getVolunteers,
  createEvent
} = require(`${__dirname}/controllers/campaignController`);
const {
  strategy,
  getUser,
  logout
} = require(`${__dirname}/controllers/authController`);

const { updateProfile } = require(`${__dirname}/controllers/userController`);

const port = process.env.PORT || 3001;

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 100000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  // console.log(user);
  app
    .get("db")
    .user.getUserByAuthid(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .user.addUserByAuthid([
            user.name.givenName,
            user.name.familyName,
            user.picture,
            user.id
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});
passport.deserializeUser((user, done) => {
  return done(null, user);
});

//AUTH ENDPOINTS
app.get(
  `/auth`,
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/dash",
    failureRedirect: "http://localhost:3001/auth"
  })
);

//AUTH ENDPOINTS
app.get("/logout", logout);
app.get("/api/me", getUser);

//USER ENDPOINTS
app.put(`/api/volunteer/:id`, updateProfile);

//ENDPOINTS
app.get(`/api/campaigns`, getCampaigns);
app.get(`/api/campaigns/joined/:user_id`, getCampaignsJoined);
app.get(`/api/campaigns/:campaign_id/:user_id`, getVolRole);
app.get(`/api/campaigns/:campaign_id`, getEvents);
app.get(`/api/events/volunteers/:event_id`, getVolunteers);
app.get(`/api/camapaigns/events/:user_id`, getScheduledEvents);

app.post(`/api/campaign`, createCampaign);
app.post(`/api/:campaign_id/events`, createEvent);
app.post(`/api/campaigns/join/:campaign_id`, userJoinsCampaign);
app.post(`/api/campaigns/events`, scheduleUserAsVol);

app.post(`/api/campaign/submit_contact/`, submitContact);

app.get(`/api/campaigns/data/:campaign_id/:type`, getCommsData);

// app.put(`/api/campaign/:id`, updateCampaignInfo);

app.listen(port, () => {
  console.log(`Comin' at you from ${port}`);
});
