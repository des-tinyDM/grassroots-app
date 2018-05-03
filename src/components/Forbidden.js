import React from "react";
import heroImage from "./heroImage.png";

const Forbidden = () => {
  return (
    <div>
      <h1>
        You are trying to access restricted campaign data. Unlike some other
        companies, we take our data security seriously. The FBI have been
        dispatched.
      </h1>
      <img src={heroImage} />
      <p>We will call them off if you log in now.</p>
    </div>
  );
};

export default Forbidden;
