import React from "react";
import heroImage from "./heroImage.png";
import "./LandingPage.css";
import "./Footer/Footer.css";
import Footer from "./Footer/Footer";

const LandingPage = props => {
  console.log(props);
  return (
    <div className="content-container">
      <img src={heroImage} id="hero-img" />

      <main id="landing">
        <div className="desc-container">
          <div className="desc-box">
            <h3>Create Events</h3>
            <p>
              Aliquam mollis elit mi, ut varius risus vestibulum vitae. Etiam
              sed ultricies mauris, non gravida eros. Praesent imperdiet massa
              in ligula dignissim posuere. Maecenas a tortor ullamcorper,
              pretium nibh id, blandit massa. Proin eu nulla id arcu eleifend
              auctor.
            </p>
          </div>
          <div className="desc-box">
            <h3>Manage Volunteers</h3>
            <p>
              Sed vulputate scelerisque fermentum. Sed sem lorem, semper eget
              dui eu, ornare molestie sem. Aliquam feugiat scelerisque dolor sit
              amet molestie. Quisque quis odio eget erat ultricies sollicitudin
              eget sit amet lacus. Proin in lorem pharetra, blandit ipsum eu,
              varius lectus. Nam posuere aliquam est a tempor. Curabitur nec
              turpis non diam fringilla gravida in nec diam.
            </p>
          </div>
          <div className="desc-box">
            <h3>Track Campaign</h3>
            <p>
              Aliquam eu enim arcu. Aliquam id tempus ipsum. Curabitur gravida
              euismod nunc, et molestie leo interdum eget. Aliquam non nisi
              gravida, efficitur velit a, ornare ante. Suspendisse vitae lacinia
              urna.
            </p>
          </div>
        </div>
        <a href={process.env.REACT_APP_LOGIN}>
          <button id="landing-btn">JOIN OR VOLUNTEER</button>
        </a>
      </main>
      <Footer campaigns={props.campaigns} />
    </div>
  );
};

export default LandingPage;
