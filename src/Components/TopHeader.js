import '../App.css';
import '../responsive.css';
import { Link } from "react-router-dom";
import React ,{useState,useEffect} from 'react';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from "react-router-dom";
import { useAppContext } from '../Context/state';

import whiteListedJson from '../abis/whiteListedAddressesForSoulBulbs.json';
import KECCAK256 from 'keccak256';
import MerkleTree from 'merkletreejs';

import { ethers } from 'ethers';
import Config from '../Config.json';
import soulbulbAbi from '../abis/soulbulbs.json';

function TopHeader() {
    const history = useHistory();
    const [isActive, setIsActive] = useState(false);
    const { account, active, library } = useWeb3React();
    let openModal = React.createRef();
    const appContext = useAppContext();

    const buf2hex = x => '0x' + x.toString('hex')

    useEffect(() => {
        if (active == false || active === undefined) {
            history.push('/');
        }
    }, [active])

    useEffect(() => {
        if (active == true) {
          setWhitelist();
        }
    
        async function setWhitelist() {
          const signer = library.getSigner();
          const SoulbulbsContract = new ethers.Contract(Config.contractAddress, soulbulbAbi.abi, signer);
          const whitelistMerkleRoot = await SoulbulbsContract.whitelistMerkleRoot();
    
          let whiteListAddresses = whiteListedJson.whitelistAddresses;
          const leaves = whiteListAddresses.map(x => KECCAK256(x));
          const tree = new MerkleTree(leaves, KECCAK256, { sortPairs: true })
    
          const myLeaf = buf2hex(KECCAK256(account));
          const proof = tree.getProof(myLeaf).map(x => buf2hex(x.data));
    
          // TODO: Check this function how to use
          let isWhitelisted = await SoulbulbsContract.isAddressWhitelisted(proof, account);
          appContext.setAddrWhitelisted(isWhitelisted);
          appContext.setProof(proof);
        }
      }, [active]);

    const handleClick = event => {
        setIsActive(current => !current);
    };

    const onClickBaseCharacter = () => {
        if (active == false || active === undefined) {
            alert("Please connect your wallet.");
        }
    }

    const onClickChangingRoom = () => {
        if (active === false || active === undefined) {
            alert("Please connect your wallet.");
        }
    }

    return (
            <nav className="navbar navbar-expand-md navbar-light fixed-top py-4 px-4 mb-0">
                <div className="container-fluid" style={{position:"relative"}}>
                    <div className='d-flex ' style={{ justifyContent: "space-between",width: "100%",alignItems: "center",position: "relative"}}>
                        <Link to="/"><img src="images/logoas.png" alt="logo"/></Link>
                        <button className="navbar-toggler sidebar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        {/* <span className="navbar-toggler-icon"></span> */}
                        <div id="toggle" className={isActive ? 'on' : ''} onClick={handleClick}>
                            <div className="one"></div>
                            <div className="two"></div>
                            <div className="three"></div>
                        </div>
                        </button>
                    </div>
                    
                    <div className="collapse navbar-collapse mob-full" id="navbarNav">
                    <ul className="navbar-nav justify-content-end">
                        <li className="nav-item">
                            <a className=" btn " href="https://www.soulbulbs.io/">Home</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className=" btn " href="https://soulbulbs-a7291.web.app/" >Customizer</a>
                        </li> */}
                        <li className="nav-item">
                            <Link className=" btn " to="/listpage" onClick={onClickBaseCharacter}>Base Character</Link>
                        </li>
                        <li className="nav-item">
                            <Link className=" btn " to="/details" onClick={onClickChangingRoom}>Changing Room</Link>
                        </li> 
                        <li className="nav-item">
                            <a className=" btnconnect btn btn-bg" href="#walletConnectModal" data-toggle="modal">
                                {active 
                                    ? String(account).substring(0, 6) + "..." + String(account).substring(38)
                                    : "Connect Wallet"}
                                &nbsp;&nbsp; <i className='fas fa-wallet'></i>
                            </a>
                        </li>
                                   
                       
                        <div className="mobile-icon">
                            <li className="nav-item" >
                                <a className="  btn icon-btn" href="#" > <img src="images/descord.png"/></a>
                            </li>
                            <li className="nav-item">
                                <a className="  btn icon-btn" href="#" ><img src="images/twitter.png"/></a>
                            </li>
                        </div>
                    </ul>
                    </div>
                </div>
            </nav> 
    )
}

export default TopHeader;