import React, { Fragment, useState, useEffect } from "react";
import Video from "./Video.js";
import axios from "axios";

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    let vids = [];
    try {
      setLoading(true);
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
    setLoading(false);
  };

  return (
    <Fragment>
      {!loading ? (
        <div>
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
                  thumbnail={v.big_thumbnail_path}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mb-5">
          <p>Loading Videos...</p>
          <div className="loader center">
            <i className="fa fa-cog fa-spin" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VideosList;
