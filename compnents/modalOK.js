import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config/index";
import "materialize-css/dist/css/materialize.min.css";
if (typeof window !== "undefined") {
  const M = window;
  require("materialize-css");
}

const ModalOK = ({ cuttOff,heading, info, btnCaption, url_param_id, infopopupAccepted }) => {
  const router = useRouter();

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});

    const btnClick = document.querySelector(".clickMe");

    {!infopopupAccepted &&
      setTimeout(() => {
        btnClick.click();
      }, 1000);
    }
  }, []);


  async function postUserPopupConfirm() {
    try {
      const res = await fetch(
        `${API_URL}/api/post_user_popup_accept?UID=${url_param_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "Content-Type"
          },
        }
      );
      const result = await res.json();

      if (!res.ok) {
        router.push("/404");
        return res.status(404).json({ message: result });
      }
    } catch (e) {
      router.push("/404");
      return e;
    }
  } 

  return (
    <>
      <a
        className="clickMe hide waves-effect waves-light btn modal-trigger"
        href="#modalStart"
      >
        Modal
      </a>
      <div id="modalStart" className="modal">
        <div className="modal-content">
          <h4>{heading}</h4>
          <p>Die Afsluitingdatum vir RSVP'S is <strong style = {{fontWeight: "600"}}> {cuttOff}</strong></p>
          
          {info.map((ele, id) => {
            return (<p key={id} > {ele}</p>)
          })}

        </div>
        <div className="modal-footer">
          <a
            onClick={postUserPopupConfirm}
            href="#!"
            className="modal-close waves-effect  btn-flat"
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



