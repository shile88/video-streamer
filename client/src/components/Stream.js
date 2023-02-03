import "../App.css";
import './styles/Stream.css';

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getUser } from "../features/streams/StreamSlice";
import { useSelector } from "react-redux";

const Stream = ({ id, title, description, userID }) => {
  const [showButtons, setShowButtons] = useState(false);
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length !== 0) {
      if (userID === user[0].sub) {
        setShowButtons(true);
      }
    }

    return () => {
      setShowButtons(false);
    };
  }, [user, userID]);

  const handle = () => {
    navigate(`/streams/${id}`);
  };

  return (
    <>
      <div className="item selected-stream">
        {showButtons && (
          <div className="right floated content">
            <Link to={`streams/edit/${id}`}>
              <button className="ui inverted blue button list-btn">Edit</button>
            </Link>
            <Link to={`streams/delete/${id}`}>
              <button className="ui inverted red button">Delete</button>
            </Link>
          </div>
        )}

        <div className="ui avatar image" onClick={handle}>
          <i className="large video icon"></i>
        </div>

        <div className="content" onClick={handle}>
          <div className="header title-color">{title}</div>
          <div className="stream-description">{description}</div>
        </div>
      </div>
    </>
  );
};

export default Stream;
