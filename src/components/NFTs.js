import React, { useEffect, useState } from "react";

import NftCard from "./NftCard";

const NFTs = ({ user }) => {
  const [nfts, setNfts] = useState([]);
  // const [apiKey, setApiKey] = useState("");
  const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY;
  const fetchNFTs = async () => {
    let nft;
    try {
      var requestOptions = {
        method: "GET",
      };

      const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`;

      const fetchURL = `${baseURL}/getNFTs/?owner=${user}&contractAddresses%5B%5D=0x027fc52f721E932B1B480D3C728ca83e24975857`;

      nft = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } catch (error) {
      console.log(error);
    }
    if (nft) {
      setNfts(nft.ownedNfts);
      // console.log(nfts);
    }
  };
  useEffect(() => {
    if (user.length > 0) fetchNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <h1 className="your-files">
        Your <span style={{ color: "#03c988" }}>Files</span>
      </h1>
      <div className="nfts">
        {nfts?.map((NFT) => {
          return <NftCard nft={NFT} key={nfts.indexOf(NFT)} />;
        })}
        {nfts.length == 0 && (
          <h2
            style={{
              margin: "auto",
              fontWeight: "500",
              fontFamily: "Noto Sans",
              color: "#86efac",
              fontSize: "2rem",
            }}
          >
            No MedBlocks NFTs
          </h2>
        )}
      </div>
    </div>
  );
};

export default NFTs;
