import { useState, useEffect } from "react";
import "./App.css";
import * as ethers from "ethers";
import Upload from "./components/Upload";
import Subscribers from "./components/Subscribers";
import NFTs from "./components/NFTs";
import Notifications from "./components/Notifications";
import { AiOutlineFileDone, AiOutlineFileAdd } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import logo from "./assets/logo.png";

function App() {
  // const owner = "0x83f5Ebac3c2806EF448946c19A371076B6A6d0CA";
  const [user, setUser] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [viewNFTs, setviewNFTs] = useState(true);
  const [upload, setUpload] = useState(true);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const handleConnect = async () => {
    if (window.ethereum) {
      const accounts = await provider.send("eth_requestAccounts", []);
      setUser(accounts[0]);
      checkIsOwner();
    }
  };
  const handleAccChange = async () => {
    // console.log(user);
    const accounts = await provider.send("eth_requestAccounts", []);
    setUser(accounts[0]);
    checkIsOwner();
  };

  const checkIsOwner = () => {
    if (user === "0x83f5ebac3c2806ef448946c19a371076b6a6d0ca") setIsOwner(true);
    else setIsOwner(false);
  };

  const viewRecords = (e) => {
    setviewNFTs(true);
  };
  const viewNotifis = () => {
    setviewNFTs(false);
  };
  const viewUpload = () => {
    setUpload(true);
  };
  const viewSubs = () => {
    setUpload(false);
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccChange);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkIsOwner();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="App">
      <div className="navbar">
        <h1 className="app-name">
          <img style={{ margin: "auto" }} src={logo} alt="logo" width="60px" />
          <span style={{ color: "#03c988" }}>Med</span>Blocks
        </h1>
        {!user ? (
          <button className="addr" onClick={handleConnect}>
            Connect
          </button>
        ) : (
          <button className="addr">
            {user.substring(0, 4) + "..." + user.substring(38)}
          </button>
        )}
      </div>
      {isOwner ? (
        <div className="pages">
          <button onClick={viewUpload} style={{ textTransform: "uppercase" }}>
            <AiOutlineFileAdd style={{ paddingRight: "8px" }} /> New Record
          </button>
          <button onClick={viewSubs} style={{ textTransform: "uppercase" }}>
            <RiUserFollowLine style={{ paddingRight: "8px" }} />
            Subscribers
          </button>
        </div>
      ) : (
        <div className="pages">
          <button onClick={viewRecords} style={{ textTransform: "uppercase" }}>
            <AiOutlineFileDone style={{ paddingRight: "8px" }} />
            Records
          </button>

          <button onClick={viewNotifis} style={{ textTransform: "uppercase" }}>
            <MdOutlineNotificationsActive style={{ paddingRight: "8px" }} />
            Notifications
          </button>
        </div>
      )}
      {isOwner && upload && <Upload user={user} />}
      {isOwner && !upload && <Subscribers user={user} />}
      {!isOwner && viewNFTs && <NFTs user={user} />}
      {!isOwner && !viewNFTs && <Notifications user={user} />}
    </div>
  );
}

export default App;

//ipfs://bafyreie457xxbuxcnhr7owsr7eyfcq7kgxoahxp2is2mpyiz42goirbrlu/metadata.json
// https://ipfs.io/ipfs/bafyreie457xxbuxcnhr7owsr7eyfcq7kgxoahxp2is2mpyiz42goirbrlu/metadata.json

// Test contract: 0x7AC55D0a591410FBf73a1C73D99B499fb9A721EE
