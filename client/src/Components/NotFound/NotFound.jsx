import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div>
        <Link to="/home">
          <button>Go Home</button>
        </Link>
      </div>
      <div>
        <img
          src="https://cdn.dribbble.com/users/2019005/screenshots/5508560/404-page.gif"
          alt="404image"
        />
      </div>
    </>
  );
}
