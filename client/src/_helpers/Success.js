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
        <h1 className="success-status">Succes</h1>
        <p className="success-p">
          Votre mot de passe a bien été modifié;
          <br /> Vous pouvez désormais vous connecter avec votre nouveau mot de
          passe en cliquant sur ce{" "}
          <Link to={"/login"} style={{ color: "black" }}>
            lien
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
