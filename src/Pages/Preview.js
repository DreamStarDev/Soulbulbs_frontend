import { useState } from 'react'
import '../App.css';
import '../responsive.css';
import { Link } from "react-router-dom";
import $ from 'jquery';
import NavBar from '../Components/TopHeader';
import WalletConnectModal from "../Components/WalletConnectModal";
import { useAppContext } from '../Context/state';
import api from '../utils/api';
import soulbulbAbi from '../abis/soullabs.json';
import souls from '../abis/souls.json';
import Config from '../Config.json';
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';

function Preview() {
    const [changePath, setChangePath] = useState('/details');
    const appContext = useAppContext();
    const { library, account } = useWeb3React();

    const signer = library.getSigner();
    const SoulbulbsContract = new ethers.Contract(Config.contractAddress, soulbulbAbi.abi, signer);
    const SoulsContract = new ethers.Contract(Config.soulAddress, souls.abi, signer);

    const congrats = () => {
        // $("#closebtn").click();
        $(".congrates_heading").css("display", "block");
        $("#image_gif").addClass("congrates_preview");
        // $("#mint_btn").hide();
        $("#back_btn").hide();
        $("#nametoken").hide();
        setChangePath('/');
    }

    const onClickEthereum = async () => {
        let res = await checkDna();
        if (res.duplicated == true) {
            return alert("Current traits combination is already minted.");
        }
        if (res.completed == false) {
            return alert("You haven't selected enough traits.");
        }

        $("#closebtn").click();
        // console.log(library);
        let mintPrice = await SoulbulbsContract.mintRate();
        let mintPriceInEth = ethers.utils.formatEther(mintPrice);

        let nftTxn = await SoulbulbsContract.mintWithETH({ value: ethers.utils.parseEther(mintPriceInEth) });
        $("#mint_btn").hide();
        await nftTxn.wait();
        congrats();
        addDna();
    }

    const onClickSoul = async () => {
        let res = await checkDna();
        if (res.duplicated == true) {
            return alert("Current traits combination is already minted.");
        }
        if (res.completed == false) {
            return alert("You haven't selected enough traits.");
        }

        $("#closebtn").click();

        let mintPrice = await SoulbulbsContract.paymentTokens(Config.soulAddress);
        let mintPriceInEth = ethers.utils.formatEther(mintPrice);
        console.log(mintPriceInEth);
        $("#mint_btn").hide();
        let approveTxn = await SoulsContract.approve(Config.contractAddress, ethers.utils.parseEther(mintPriceInEth));
        await approveTxn.wait();
        let nftTxn = await SoulbulbsContract.mintWithERC20("1", Config.soulAddress, {
            gasLimit: 1000000
        }); 
        await nftTxn.wait();
        congrats();
        addDna();
    }

    const generateDNAString = () => {
        let traitPath = appContext.traitPath;
        let dnaStr = '';

        let dnaItem = '00';
        if (traitPath.background.length !== 0) {
            dnaItem = traitPath.background.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.hoodie.length !== 0) {
            dnaItem = traitPath.hoodie.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.bulb.length !== 0) {
            dnaItem = traitPath.bulb.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.overhead.length !== 0) {
            dnaItem = traitPath.overhead.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.hat.length !== 0) {
            dnaItem = traitPath.hat.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.glasses.length !== 0) {
            dnaItem = traitPath.glasses.split('_')[0];
        }
        dnaStr += dnaItem;

        dnaItem = '00';
        if (traitPath.body.length !== 0) {
            dnaItem = traitPath.body.split('_')[0];
        }
        dnaStr += dnaItem;

        return dnaStr;
    }

    const checkDna = async () => {
        let dnaStr = generateDNAString();
        let completed = false;
        if (String(dnaStr).substring(4) !== "0000000000") {
            completed = true;
        }
        let res = await api.post('/checkDna', {
            dna: dnaStr
        });
        return {
            duplicated: res.data.duplicated,
            completed
        }
    }

    const addDna = async () => {
        let dnaStr = generateDNAString();
        await api.post('/addDna', {
            dna: dnaStr
        });
    }

    return (
        <div>
            <div className="change-room-main">
                <NavBar />
                <div className="container-fluid p-0">
                    <div className="details-page bgimgin" id="image_gif" >

                        <div className="box-full2" >
                            <div className="details-box-p p-0" style={{ borderRadius: "0", width: "100%", position: "relative" }}>

                                <figure className='winnershow'>
                                    <div style={{ position: "relative" }}>
                                        <div className='congrates_heading' style={{position: "absolute", top: "32px", margin: "auto", width: "100%"}}>
                                            <h2 className='congo_msg' style={{ color: "white", fontSize: "4rem", fontWeight: "bold" }} >CONGRATULATIONS!</h2>
                                            <p className='congo_para' style={{ color: "white", fontSize: "2rem", fontSize: "27px", fontWeight: "bold", letterSpacing: "1px" }} >Your hoodie combination has been minted successfully</p>
                                        </div>
                                        <img className='' style={{ borderRadius: "0", width: " 100%" }} src={appContext.imageData} />
                                    </div>

                                </figure>

                                <figcaption className="text-left  btnsbtm2" style={{ position: "absolute", bottom: "30px", width: "90%", left: "0", margin: "auto", right: "0" }}>
                                    {/* <div className="img-left-p">
                                        <div className='headcolor'>
                                            <h2 id="nametoken">#001</h2>
                                        </div>
                                    </div> */}
                                    <div className="img-right-p d-flex  justify-content-between ml-auto">
                                        <Link id="back_btn" className="btn btn-bg baCk" to={changePath} style={{ color: "#000" }} >BACK</Link>
                                        {/* <Link  className="btn btn-bg saVe" to="/" >MINT</Link> */}
                                        <a className=" btn" id='mint_btn' href="#myModal2" data-toggle="modal" style={{ color: "#000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px" }}>Mint</a>
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
                <div className="modal-dialog1">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" id="closebtn" data-dismiss="modal" aria-hidden="true">x</button>
                            <div className='popupbox2'>
                                {/* <div className="vbfg">
                            <img src={require("./images/rightmark.png")}/>
                        </div> */}
                                <h2 style={{ color: "##000000", fontSize: "1rem", fontSize: "27px", color: "black", margin: "8%" }} >Would you like to mint      using ETH or $SOULS</h2>

                                <div className='text-center d-flex pop_up_preview'>
                                    <button className="soul_ethereum btn" style={{ textTransform: "capitalize", color: "#000000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px" }} onClick={onClickEthereum} >ETHEREUM</button>
                                    <button className="soul_token btn" style={{ textTransform: "capitalize", color: "#000000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px" }} onClick={onClickSoul}>$SOULS</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WalletConnectModal />
        </div>
    )
}

export default Preview;