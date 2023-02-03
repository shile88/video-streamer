import "../App.css";

import { Field, Form } from "react-final-form";
import { createStreams, getUser } from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { useNavigate } from "react-router-dom";

const StreamCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  return (
    <>
      <div className="ui container center">
        <h1>Create a stream</h1>
        <Form
          onSubmit={(inputs) => {
            dispatch(createStreams({...inputs, userID: user[0].sub}));
            navigate("/");
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Required";
            }
            if (!values.description) {
              errors.description = "Required";
            }
            return errors;
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="ui form">
              <div className="field">
                <label>Enter Title</label>
                <Field name="title">
                  {({ input, meta }) => (
                    <div>
                      <input type="text" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="field">
                <label>Enter Description</label>
                <Field name="description" className="field">
                  {({ input, meta }) => (
                    <div>
                      <input type="text" {...input} />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <button type="submit" className="ui button blue">
                Submit
              </button>
            </form>
          )}
        </Form>
      </div>
    </>
  );
};

export default StreamCreate;
