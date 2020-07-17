import React, { useState, useRef, useEffect } from "react";
import "./form-comments.scss";

const FormComments = () => {
  const initialFormData = {
    name: "",
    comment: "",
  };

  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [comments, setComments] = useState([]);

  //form submit
  //input change
  //textarea change

  const test = () => {
    console.log(formData);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setComments([...comments, formData]);
    setFormData({ ...initialFormData });
  };

  return (
    <div>
      <form className="form" onSubmit={test}>
        <h3>Comment:</h3>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          required
        />
        <br />
        <label htmlFor="comment">Comment:</label>
        <br />
        <textarea
          cols="30"
          rows="10"
          placeholder="Your Comment"
          id="comment"
          onChange={(event) =>
            setFormData({ ...formData, comment: event.target.value })
          }
        />
        <br />
        <button type="submit" onClick={submitForm}>
          Add comment
        </button>
      </form>
      {comments.map(({ name, comment }) => (
        <div>
          <h3>{name}</h3>
          <p>{comment}</p>
        </div>
      ))}
    </div>
  );
};

export default FormComments;
