import React from "react";
import { POINT_CONVERSION_COMPRESSED } from "constants";

const NewsItem = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <p>{props.source}</p>
    </div>
  );
};

export default NewsItem;
