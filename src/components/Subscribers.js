import React, { useEffect, useState } from "react";

import { MdOutlineContentCopy } from "react-icons/md";

const Subscribers = ({ user }) => {
  const [subs, setSubs] = useState([]);
  const getDetails = async () => {
    try {
      await fetch(
        "https://backend-staging.epns.io/apis/channels/_get_subscribers",
        {
          method: "post",
          headers: {
            "content-type": "application/json ; charset=UTF-8",
          },
          body: JSON.stringify({
            channel: "0xf1393811682ecbAb1c2fcb0fBc30245f8744CdcA",
            op: "read",
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setSubs(data.subscribers);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = (sub) => {
    navigator.clipboard.writeText(sub);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <h1>
        Your{" "}
        <span style={{ color: "#03c988", fontSize: "2.2rem" }}>
          Subscribers
        </span>{" "}
      </h1>
      <div className="subs-div">
        {subs?.map((sub) => (
          <div className="sub-div">
            <p>{sub}</p>
            <button onClick={() => handleCopy(sub)}>
              {/* <button onClick={() => navigator.clipboard.writeText({sub})}> */}
              <MdOutlineContentCopy size={30} style={{ cursor: "pointer" }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribers;
