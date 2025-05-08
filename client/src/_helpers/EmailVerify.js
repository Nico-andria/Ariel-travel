import React from "react";
import { Link } from "react-router-dom";
import "./success.css";

const Success = () => {
  return (
    <div className="justify-center text-center">
      <div className="card-success">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}>
          <i className="checkmark">✓</i>
        </div>
        <h1 className="success-status">Bienvenue sur Happy'Nice Guest House</h1>
        <p className="success-p">
          Votre compte a bien été activé
          <br /> Vous pouvez désormais jouir de nos services.
          <br /> Cliquez ce
          <Link to={"/login"} style={{ color: "black" }}>
            lien
          </Link>
          pour pouvoir vous connecter
        </p>
      </div>
    </div>
  );
};

export default Success;
