import React from "react";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import { AiOutlineCamera } from "react-icons/ai";
import abi from "../constants/abi.json";

const Upload = ({ user }) => {
  const reader = new FileReader();
  const NFT_STORAGE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIwQTFFZmRkMGNlNTlkNDczNTI2NjdBYTkxNWRmNzU4MjZBMDM3NWQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTc5Mzk4ODkzMCwibmFtZSI6Ik15QXBwIn0.XOBE0Geu7wik7qYMH4m6OM4tXWRiwY96zuwznZPPBWA";
  const PK = process.env.REACT_APP_CHANNEL_PRIVATE_KEY;
  const contractAddress = "0x027fc52f721E932B1B480D3C728ca83e24975857";

  const [img, setImg] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrls, setImgUrls] = useState();
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState("Create");
  // const [user, setUser] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const handleConnect = async () => {
  //   if (window.ethereum) {
  //     const accounts = await provider.send("eth_requestAccounts", []);
  //     setUser(accounts[0]);
  //   }
  // };

  // const handleAccChange = async () => {
  //   const accounts = await provider.send("eth_requestAccounts", []);
  //   setUser(accounts[0]);
  // };

  const handleImage = (e) => {
    const data = e.target.files[0];

    setImg(e.target.files[0]);
    reader.onload = (e) => {
      const { result } = e.target;
      setImgUrls(result);
    };
    reader.readAsDataURL(data);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAddress = (e) => {
    setRecipient(e.target.value);
  };

  // const showImg = () => {
  //   if (img) console.log(img);
  // };

  async function storeExampleNFT() {
    try {
      const imageFile = new File([img], "nft.png", { type: "image/png" });
      console.log(imageFile);

      if (!imageFile) return;
      const nft = {
        image: imageFile,
        name: name,
        description: description,
      };

      setLoading("Loading...");
      const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
      const metadata = await client.store(nft);

      console.log("NFT data stored!");
      console.log("Metadata URI: ", metadata.url);
      mint(metadata.url);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNotification = async () => {
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);
    console.log(signer);
    // eslint-disable-next-line no-unused-vars
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: "New Record Minted",
        body: "New Medical Record has been minted to your address",
      },
      payload: {
        title: `${name}`,
        body: `${description}`,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${recipient}`, // recipient address
      channel: "eip155:5:0xf1393811682ecbAb1c2fcb0fBc30245f8744CdcA", // your channel address
      env: "staging",
    });
    console.log("Notification sent");
  };

  const mint = async (metadata) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.safeMint(recipient, metadata);
    await tx.wait();
    setLoading("Create");
    console.log("Transaction complete");
    handleNotification();
  };

  return (
    <div className="upload">
      <h1>Create New Record</h1>
      <div className="input-box">
        <input
          className="name"
          type="text"
          onChange={handleName}
          placeholder="Name"
          style={{ color: "white" }}
        />
        <input
          className="desc"
          type="text"
          onChange={handleDescription}
          placeholder="Description of file"
          style={{ color: "white" }}
        />
        <label htmlFor="image-upload">
          <span style={{ fontSize: "20px" }} type="camera">
            <AiOutlineCamera size={50} />
          </span>
        </label>
        <div className="preview">
          <img className="previewImage" src={imgUrls} alt="" />
        </div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImage}
          style={{ display: "none" }}
        />
        <input
          type="text"
          placeholder="Address of Reciever: 0x..."
          onChange={handleAddress}
          style={{ color: "white" }}
        />
        <button className="mintbtn" onClick={storeExampleNFT}>
          {loading}
        </button>
      </div>
    </div>
  );
};

export default Upload;
