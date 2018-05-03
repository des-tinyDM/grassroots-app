import React from "react";

const CreateAccountButton = () => {
  return (
    <div>
      <a href={process.env.REACT_APP_LOGIN}>
        <button>Login to Volunteer</button>
      </a>
    </div>
  );
};

export default CreateAccountButton;
