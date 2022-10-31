/** @format */

import "../App.css";
import "../responsive.css";
import { Link } from "react-router-dom";
import NavBar from '../Components/TopHeader';
import $ from "jquery";
import { useHistory } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import WalletConnectModal from "../Components/WalletConnectModal";
import AllowListConfirm from "../Components/AllowListConfirm";
import { useEffect, useState } from 'react';
import { useAppContext } from '../Context/state';
import { useWeb3React } from '@web3-react/core';

function Home() {
  const history = useHistory();
  const appContext = useAppContext();
  const { library, account, active } = useWeb3React();
  const [showAllowList, setShowAllowList] = useState(false);

  useEffect(() => {
    appContext.initTraitPath();
  }, []);

  const listPage = () => {
    $("#closebtn").click();
    history.push("/listpage");
  };

  const close_btn2 = () => {
    document.getElementById("mdbtmBox").style.display = "none";
  };

  const onBaseCharacter = () => {
    if (appContext.isAddrWhitelisted) {
      setShowAllowList(true);
    } else {
      listPage();
    }
  }

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
        <img src="images/WhiteHoodie.png" style={{ width: "40%" }} alt="" />
      </div>
      <div className="mdbtmBox" id="mdbtmBox">
        <button type="button" className="close" onClick={close_btn2}>
          x
        </button>
        <h2>Pick Your Favourite</h2>
        <p>Pick your base character and start the customizing process.</p>
        <div className="text-right">
          <button
            className=" btn"
            style={{
              textTransform: "capitalize",
              color: "#fff",
              backgroundColor: "#FFC83A",
              border: "2px solid #FFC83A",
              lineHeight: "45px",
            }}
            onClick={onBaseCharacter}
          >
            Base Characters
          </button>
        </div>
      </div>

      <WalletConnectModal />
      {
        showAllowList && <AllowListConfirm listPage={listPage} setShowAllowList={setShowAllowList}/>
      }
    </div>
  );
}

export default Home;
