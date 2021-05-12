import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
if (typeof window !== "undefined") {
  const M = window;
  require("materialize-css");
}

const ModalOK = ({ heading, info, btnCaption, timeoutClick = false }) => {
  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});

    if (timeoutClick) {
      const btnClick = document.querySelector(".clickMe");
      setTimeout(() => {
        btnClick.click();
      }, 1000);
    }
  }, []);

  return (
    <>
      <a
        className="clickMe hide waves-effect waves-light btn modal-trigger"
        href="#ModalInfoLoad"
      >
        Modal
      </a>
      <div id="ModalInfoLoad" className="modal">
        <div className="modal-content">
          <h4>{heading}</h4>
          {info}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            {btnCaption}
          </a>
        </div>
      </div>
    </>
  );
};

ModalOK.defaultProps = {
  heading: <strong> Belangrikke Inligting </strong>,
  btnCaption: "OK",
};

export default ModalOK;