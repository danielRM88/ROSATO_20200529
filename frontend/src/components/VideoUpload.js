import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let cats = [];

    try {
      const res = await axios.get("http://localhost:3000/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      cats = res.data;
      console.log(res.data);
      console.log("Categories loaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
        console.log("problem with server");
      } else {
        console.log(err);
        console.log(err.response.data.msg);
      }
    }

    if (cats.length > 0) {
      setCategoryId(cats[0].id);
    }

    setCategories(cats);
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onCategoryChange = (e) => {
    console.log(e.target.value);
    setCategoryId(e.target.value);
  };
  const onTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const onDescriptionChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category_id", categoryId);

    try {
      const res = await axios.post("http://localhost:3000/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      console.log("File uploaded");
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
      <h4 className="display-4 text-center mb-4">Upload Video</h4>
      <form onSubmit={uploadFile}>
        <div className="custom-file mb-4 mt-4 form-group">
          <input
            type="file"
            className="custom-file-input form-control"
            id="file"
            onChange={onFileChange}
          />
          <label className="custom-file-label" htmlFor="file">
            {filename}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="title">Category</label>
          <select
            name="category_id"
            className="form-control"
            onChange={onCategoryChange}
          >
            {categories.map((c, i) => {
              return (
                <option key={i} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            onChange={onTitleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            className="form-control"
            onChange={onDescriptionChange}
          />
        </div>

        <div className="d-flex justify-content-center">
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
