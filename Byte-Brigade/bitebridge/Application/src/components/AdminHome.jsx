import React from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import DishList from "./DishList";
import "./styles/home.css";

export default function AdminHome() {
  return (
    <div className="HomeComponentContainer">
      <Navbar></Navbar>
      <div className="HomeComponentFirstLayer">
        {/* <div className="ListOfProducts">
          <DishList></DishList>
        </div> */}
        {/* <div className="ProfileComponent">
          <Profile></Profile>
        </div> */}
      </div>
    </div>
  );
}
