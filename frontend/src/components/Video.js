import React, { Fragment } from "react";

const Video = ({ title, description, category, url }) => {
  return (
    <Fragment>
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <video
            poster="thumbnail256x256"
            controls="controls"
            src={"http://localhost:3000" + url}
            title={title}
            style={{ maxHeight: "18rem" }}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
          <div className="card-body">
            <h5 class="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Video;
