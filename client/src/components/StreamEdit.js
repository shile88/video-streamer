import "../App.css";

import { Field, Form } from "react-final-form";
import React, {useEffect} from "react";
import { allStreams, getStreams, selectStreamById, updateStreams } from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const StreamCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const streams = useSelector(allStreams);
  const { id } = useParams();
  const stream = useSelector((state) => selectStreamById(state, Number(id)))

  useEffect(() => {
    dispatch(getStreams());
  }, [dispatch]);

  if (streams.length === 0) {
    return (
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui medium text loader">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ui container center">
        <h1>Create a stream</h1>
        <Form
          onSubmit={(inputs) => {
            dispatch(updateStreams({id: stream.id, title: inputs.title, description: inputs.description, userID: stream.userID}));
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
                      <input type="text" {...input} placeholder={stream.title}/>
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
                      <input type="text" {...input} placeholder={stream.description}/>
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
