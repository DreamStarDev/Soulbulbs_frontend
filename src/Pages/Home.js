/** @format */

import "../App.css";
import "../responsive.css";
import { Link } from "react-router-dom";
import NavBar from '../Components/TopHeader';
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import WalletConnectModal from "../Components/WalletConnectModal";
import { useEffect } from 'react';
import { useAppContext } from '../Context/state';
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';
import Config from '../Config.json';
import soulbulbAbi from '../abis/soullabs.json';

function Home() {
  const history = useHistory();
  const appContext = useAppContext();
  const { library, account, active } = useWeb3React();

  useEffect(() => {
    appContext.initTraitPath();
  }, []);

  useEffect(() => {
    if (active == true) {
      setWhitelist();
    }

    async function setWhitelist() {
      const signer = library.getSigner();
      const SoulbulbsContract = new ethers.Contract(Config.contractAddress, soulbulbAbi.abi, signer);
      // TODO: Check this function how to use
      // let isWhitelisted = await SoulbulbsContract.isAddressWhitelisted(account);
      // console.log(isWhitelisted);
      // appContext.setWhitelist(isWhitelisted);
    }
  }, [active]);

  const listPage = () => {
    $("#closebtn").click();
    history.push("/listpage");
  };

  const close_btn2 = () => {
    document.getElementById("mdbtmBox").style.display = "none";
  };

  return (
    <div className="change-room-main" style={{ position: "relative" }}>
      <NavBar />
      <div className="container-fluid p-0">
        <div className="home-text">
          <div className="marquee" style={{ overflow: "hidden" }} >
            <div className="marquee-text">
              <span>SOULBULBS</span>
            </div>
            <div className="marquee-text">
              <span>SOULBULBS</span>
            </div>
            <div className="marquee-text">
              <span>SOULBULBS</span>
            </div>
            {/* <marquee  scrollamount="20" behavior="scroll" direction="left" scrolldelay="50" className="scroll_soulbulbs">SOULBULBS SOULBULBS</marquee> */}
          </div>

          {/* <div className="home-text-in">
                        <h1>The Changing Room</h1>
                        <div className="btns-group">
                            <Link to="/listpage" className="btn btn-bg">PICK A BASE</Link>
                            <Link to="/details" className="btn btn-border">Customizer</Link>
                        </div>
                        <div className="back-home">
                            <Link to="/">Go Back Home</Link>
                        </div>
                    </div> */}
        </div>
      </div>
      <div className="home-img">
        <img src={require("../images/WhiteHoodie.png")} style={{ width: "40%" }} alt="" />
      </div>
      <div className="mdbtmBox" id="mdbtmBox">
        <button type="button" className="close" onClick={close_btn2}>
          x
        </button>
        <h2>Pick Your Favourite</h2>
        <p>Pick your base character and start the customizing process.</p>
        <div className="text-right">
          <a
            className=" btn"
            href="#myModal1"
            data-toggle="modal"
            style={{
              textTransform: "capitalize",
              color: "#fff",
              backgroundColor: "#FFC83A",
              border: "2px solid #FFC83A",
              lineHeight: "45px",
            }}
          >
            Base Characters
          </a>
        </div>
      </div>

      <WalletConnectModal />
      <div
        className="modal fade"
        id="myModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog1">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                id="closebtn"
                data-dismiss="modal"
                aria-hidden="true"
              >
                x
              </button>
              <div className="popupbox2">
                <div className="vbfg">
                  <img src={require("../images/rightmark.png")} />
                </div>
                <h2>Allowlist Approved!</h2>
                <p>Looks like you’re on the allow list! Let’s get started </p>
                <div className="text-center">
                  <button
                    className=" btn"
                    style={{
                      textTransform: "capitalize",
                      color: "#fff",
                      backgroundColor: "#FFC83A",
                      border: "2px solid #FFC83A",
                      lineHeight: "45px",
                    }}
                    onClick={listPage}
                  >
                    Base Characters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
