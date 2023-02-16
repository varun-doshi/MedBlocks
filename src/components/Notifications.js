import React, { useState } from "react";
import { useEffect } from "react";
import * as ethers from "ethers";
import Notification from "./Notification";
import * as PushAPI from "@pushprotocol/restapi";
import { SiPytorchlightning } from "react-icons/si";

const Notifications = ({ user }) => {
  const [notifis, setNotifis] = useState([]);
  // const PK = process.env.REACT_APP_CHANNEL_PRIVATE_KEY;
  // const  = "f62a67beedcecb77aa9721621c502e4fdf011722541c530370ad6ee16dac3df1";

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const notifs = async () => {
    if (user.length > 1) {
      const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${user}`, // user address in CAIP
        env: "staging",
      });

      setNotifis(notifications);
    }
  };
  const optIn = async () => {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0x83f5Ebac3c2806EF448946c19A371076B6A6d0CA", // channel address in CAIP
      userAddress: `eip155:5:${user}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  };

  useEffect(() => {
    notifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="notifi-wrapper">
      <h1>
        Your{" "}
        <span style={{ color: "#03c988", fontSize: "2.2rem" }}>
          Notifications
        </span>{" "}
      </h1>
      <button className="opIn-btn" onClick={optIn}>
        Opt In
        <SiPytorchlightning style={{ paddingLeft: "8px" }} />
      </button>
      {notifis?.map((notifi) => (
        <Notification notification={notifi} />
      ))}
    </div>
  );
};

export default Notifications;
