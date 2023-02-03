import React, { useCallback, useEffect } from "react";
import { addUser, getUser, removeUser } from "../features/streams/StreamSlice";
import { useDispatch, useSelector } from "react-redux";

import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function GoogleAuth() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleCallbackResponse = useCallback(
    (response) => {
      var userObject = jwt_decode(response.credential);
      dispatch(addUser(userObject));
      document.getElementById("signInDiv").hidden = true;
      setCookie("user", userObject, { path: "/" });
    },
    [dispatch, setCookie]
  );

  useEffect(() => {
    if (cookies.user !== undefined) {
      dispatch(removeUser([]));
      dispatch(addUser(cookies.user));
    } else {
      /* global google */
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    }
  }, [handleCallbackResponse, cookies.user, dispatch]);

  const handleSignOut = () => {
    document.getElementById("signInDiv").hidden = false;
    dispatch(removeUser([]));
    removeCookie("user");
  };

  return (
    <>
      {Object.keys(user).length !== 0 && (
        <button className="ui red button" onClick={handleSignOut}>
          Sign out
        </button>
      )}
      <div id="signInDiv"></div>
    </>
  );
}

export default GoogleAuth;
