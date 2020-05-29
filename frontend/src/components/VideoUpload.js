import React, { Fragment } from "react";

const VideoUpload = () => {
  return (
    <Fragment>
      <h4 className="display-4 text-center mb-4">Upload Video</h4>
      <form>
        <div className="custom-file mb-4 mt-4">
          <input type="file" className="custom-file-input" id="file" />
          <label className="custom-file-label" htmlFor="file">
            Choose File
          </label>
        </div>

        <div class="d-flex justify-content-center">
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary mt-4"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default VideoUpload;
