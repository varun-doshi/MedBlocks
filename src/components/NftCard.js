import React from "react";

const NftCard = ({ nft }) => {
  return (
    <div className="nft">
      <div className="image-div">
        <img className="nft-image" src={nft.media[0].gateway} alt="" />
      </div>
      <div className="nft-details">
        <div className="title">
          <h2
            style={{
              color: "#7B8FA1",
              fontWeight: "600",
              margin: "0",
              fontSize: "1rem",
            }}
          >
            Name:
          </h2>
          <h2 className="nft-title">{nft.title}</h2>
        </div>
        <div className="nft-info">
          <div>
            <p
              style={{
                color: "#7B8FA1",
                fontWeight: "600",
                margin: "0",
                fontSize: "1rem",
              }}
            >
              Address:
            </p>
            <p
              style={{
                fontFamily: "Noto sans",
                fontWeight: "600",
                margin: "0",
              }}
            >
              {`${nft.contract.address.substr(
                0,
                6
              )}...${nft.contract.address.substr(
                nft.contract.address.length - 4
              )}`}
            </p>
          </div>
          <div className="nft-time">
            <p
              style={{
                color: "#7B8FA1",
                fontWeight: "600",
                margin: "0",
                fontSize: "1rem",
              }}
            >
              Uploaded:
            </p>
            <p
              style={{
                fontFamily: "Noto sans",
                fontWeight: "600",
                margin: "0",
              }}
            >
              {nft.timeLastUpdated.substring(0, 10)}
            </p>
          </div>
        </div>

        <div className="nft-link">
          <a
            className="nft-btn"
            target={"blank"}
            href={`https://etherscan.io/address/${nft.contract.address}`}
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
