import "../App.css";
import "./styles/StreamList.css";

import React, { useEffect } from "react";
import {
  allStreams,
  getStreams,
  getUser,
} from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Stream from "./Stream";

const StreamList = () => {
  const dispatch = useDispatch();
  const streams = useSelector(allStreams);
  const user = useSelector(getUser);

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
      <h1 className="stream-list-title">Streams</h1>
      <div className="ui middle aligned divided list">
        {streams.map((stream) => {
          return (
            <Stream
              key={stream.id}
              id={stream.id}
              title={stream.title}
              description={stream.description}
              userID={stream.userID}
            />
          );
        })}
        {user.length !== 0 && (
          <div className="create-btn">
            <Link to="/streams/new">
              <button className="ui green button">Create new stream</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default StreamList;
