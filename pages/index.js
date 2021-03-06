import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config/index";

import Loader from "react-loader-spinner";
import {getStringDay,getStringDate, getStringTime, getStringDateTime} from "../helpers/dateTime"

// Components
import Layout from "../compnents/Layout";
import Banner from "../compnents/Banner";
import AboutUs from "../compnents/AboutUs";
// import InvitedPerson from "../compnents/InvitedPerson";
import Gallery from "../compnents/gallery";
import Venue from "../compnents/Venue";
import Parralax from "../compnents/Parralax";
import Rsvp from "../compnents/Rsvp";
import ModalOK from "../compnents/modalOK";

export default function Home({ siteData }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const Router = useRouter();
  const { sectBanner,
          sectAbout,
          sectGallery, 
          sectParralax1, 
          Global,
          sectWeddingInfo,
          sectModal 
        } =siteData.content_attr;

  const{weddingDate,RSVPCutOff1,RSVPCutOff2, title, calendarDescription, calLocation } = Global;
  
  const StringWeddingDate =  getStringDate(weddingDate);
  const StringWeddingTime =  getStringTime(weddingDate);
  const StringWeddingDay =  getStringDay(weddingDate);

  const StringRSVPCutOff1 = getStringDateTime(RSVPCutOff1);
  const StringRSVPCutOff2 = getStringDateTime(RSVPCutOff2);

  useEffect(() => {
    if (Router.isReady) {
      getUserInfo();
    }
  }, [Router.isReady]);

  async function getUserInfo() {
    const qry = Router.query;
    if (Object.keys(qry).length == 0 || qry.UID === "") {
      return Router.push("/404");
    }
    try {
      
      const res = await fetch(`${API_URL}/api/get_user?UID=${qry.UID}`);
      const userData = await res.json();
      if (!res.ok) {
        return Router.push("/404");
      }

      setUserData(userData);
      setLoading(false);
      return;
    } catch {
      return Router.push("/404");
    }
  }
  return (
    <>
      {loading === false ? (
        <div
          style={{
            opacity: 1,
            transition: "opacity 2s",
          }}
        >
          <Layout personName = {userData.name}>
           <ModalOK
              cuttOff = {userData.cutoff2 ? StringRSVPCutOff2 : StringRSVPCutOff1}
              info={sectModal.paragraph}
              url_param_id = {userData.url_param_id}
              btnCaption={"Ek Verstaan"}
              infopopupAccepted = {userData.infopopupaccept} 
            /> 
            
            <Banner 
              image = {sectBanner.url}  
              weddingDate = {weddingDate}
            />

            <AboutUs sectAbout={sectAbout} />
            
            <Gallery galleryData={sectGallery} />
            
            {/* <InvitedPerson
              message={userData.attr.welcome_msg}
              image={userData.attr.guest_img}
              name={userData.name}
            /> */}

            <Venue
              StringWeddingDate = {StringWeddingDate} 
              StringWeddingTime = {StringWeddingTime} 
              StringWeddingDay = {StringWeddingDay}
              IsFamilyMember = {userData.familymember}
              sectWeddingInfo = {sectWeddingInfo}
            />
          
            <Parralax parralax={sectParralax1} />
            
          
            <Rsvp
              attending={userData.attending}
              guest_comment={userData.guest_comment}
              name={userData.name}
              rsvp_date={userData.rsvp_date}
              url_param_id={userData.url_param_id}
              cutOffDate = {userData.cutoff2 ? RSVPCutOff2 : RSVPCutOff1}
              weddingDate = {weddingDate}
              calDescription ={calendarDescription} 
              weddinglocation ={calLocation} 
              calTitle ={title}
            />
          </Layout>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            background: "#efebe9",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div className="row">
            <div className="col s12" style ={{textAlign: "center"}}>
              <Loader
                type="Hearts"
                color="#f3adad"
                height={200}
                width={200}
                svgClass="my-custom-class"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/api/get_site_data`);
  const siteData = await res.json();
  return {
    props: { siteData },
  };
}
