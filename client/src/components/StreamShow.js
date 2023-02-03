import "./styles/StreamShow.css";

import React, { useEffect } from "react";
import {
  allStreams,
  getStreams,
  selectStreamById,
} from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";

import flv from "flv.js";
import { useParams } from "react-router-dom";
import { useRef } from "react";

function StreamShow() {
  const { id } = useParams();
  const streams = useSelector(allStreams);
  const stream = useSelector((state) => selectStreamById(state, Number(id)));
  const videoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStreams());
  }, [dispatch]);

  useEffect(() => {
    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  }, [id]);

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
      <div className="ui container">
        <video ref={videoRef} controls className="ui container" />

        <h2 className="show-stream-title">
          Stream title: <span>{stream.title}</span>
        </h2>
        <p>{stream.description}</p>
      </div>
    </>
  );
}

export default StreamShow;
