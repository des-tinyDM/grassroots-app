const Auth0Strategy = require("passport-auth0");

const { CLIENT_ID, CLIENT_SECRET, DOMAIN } = process.env;

const strategy = new Auth0Strategy(
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    scope: "openid profile",
    callbackURL: "/auth"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  //   if (!req.user) {
  //     res.status(401).json({ message: "Not Authorized" });
  //   } else {
  //     res.status(200).json(req.user);
  //   }
  // console.log(req.user);
  req.app
    .get("db")
    .user.getUserByAuthid(req.user.authid)
    .then(user => res.status(200).json(user[0]))
    .catch(err => res.status(500).json(err));
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

module.exports = {
  strategy,
  getUser,
  logout
};
