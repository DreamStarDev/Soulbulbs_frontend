import '../App.css';
import '../responsive.css';
import { Link } from "react-router-dom";
import NavBar from '../Components/TopHeader';
import TraitCollection from '../Components/TraitCollection';
import { useState, useEffect } from 'react';
import { useAppContext } from '../Context/state';
import WalletConnectModal from "../Components/WalletConnectModal";

function Details() {
    const appContext = useAppContext();

    useEffect(() => {
        appContext.generateImage();
    });

    return (
        <div style={{ overflowY: "scroll" }} >
            <div className="change-room-main">
                <NavBar />
                <div className="container-fluid details-container">
                    <div className="details-page">

                        <div className="box-full">
                            <div className="color-boxs">
                                <div className="back-home">
                                    <Link to="/">BACK</Link>
                                    <Link className="btn btn-bg" style={{ textTransform: "capitalize", color: "#000000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px" }} to="/preview">PREVIEW</Link>
                                    {/* <span className='text-dark font-weight-bold'>#0017</span> */}
                                </div>

                                <div className="color-boxs-head ">
                                    <h4 className='text-dark'>Simply click to add your favourite trait</h4>
                                </div>
                                <div className="row cardsAllmaim">
                                    <TraitCollection trait='background' />
                                    <TraitCollection trait='body' />
                                    <TraitCollection trait='bulb' />
                                    <TraitCollection trait='glasses' />
                                    <TraitCollection trait='hat' />
                                    <TraitCollection trait='overhead' />
                                </div>
                            </div>
                            <div className="details-box">
                                <figure>
                                    {/* <img src={require("../images/banner.png")} /> */}
                                    <img src={appContext.imageData} />
                                </figure>
                                <figcaption className="text-left d-flex mdbtns">
                                    {/* <div className="img-left-p">
                            <p className='ptext'>#17</p>
                            <span className="hidetxt" style={{color: "orange"}}>Orange Hoodie</span>
                        </div> */}
                                    <div className="img-right-p ml-auto btnmbgt">

                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WalletConnectModal />
        </div>
    )
}

export default Details;