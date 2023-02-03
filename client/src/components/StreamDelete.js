import './styles/StreamDelete.css';

import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { allStreams, deleteStreams, getStreams, selectStreamById } from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";

import ReactDOM from "react-dom";

const StreamDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const streams = useSelector(allStreams);
  const stream = useSelector((state) => selectStreamById(state, Number(id)));
  
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

  const content = (
    <div className="backshadow">
    <div className="ui active modal">
      <div className="header">Delete stream</div>
      <div className="content">
        <div>
          Are you sure you want to delete the stream with title:
          <span> {stream.title.toUpperCase()}</span>
        </div>
      </div>
      <div className="actions">
        <Link to="/">
          <div
            className="ui red button"
            onClick={() => dispatch(deleteStreams({ id: stream.id }))}
          >
            Delete
          </div>
          <div className="ui button">Cancel</div>
        </Link>
      </div>
    </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default StreamDelete;
