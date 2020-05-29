import React, { Fragment, useState, useEffect } from "react";
import Video from "./Video.js";
import axios from "axios";

const VideosList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    let vids = [];
    try {
      const res = await axios.get("http://localhost:3000/videos", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      vids = res.data;
      setVideos(vids);
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
        console.log("problem with server");
      } else {
        console.log(err);
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <h4 className="display-4 text-center mb-4">Videos</h4>
      <div className="row">
        {videos.map((v, i) => {
          return (
            <Video
              key={i}
              title={v.title}
              description={v.description}
              url={v.file_path}
              category={v.category_name}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default VideosList;
