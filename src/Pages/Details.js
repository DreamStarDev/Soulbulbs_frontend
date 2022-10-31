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
    const [category, setCategory] = useState(0);

    useEffect(() => {
        appContext.generateImage();
    });

    const selectCategory = (id) => {
        setCategory(id);
    }

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
                                <div className="row" style={{ paddingBottom: 30 }}>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(0)}>
                                        <img 
                                            src={category != 0 ? 'images/Icons/background.svg' : 'images/Icons/background_highlighted.svg'} 
                                            alt="Background" 
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(1)}>
                                        <img 
                                            src={category != 1 ? 'images/Icons/torso.svg' : 'images/Icons/torso_highlighted.svg'} 
                                            alt="Torso" 
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(2)}>
                                        <img 
                                            src={category != 2 ? 'images/Icons/bulb.svg' : 'images/Icons/bulb_highlighted.svg'} 
                                            alt="Bulb" 
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(3)}>
                                        <img 
                                            src={category != 3 ? 'images/Icons/el_glasses.svg' : 'images/Icons/glasses_highlighted.svg'} 
                                            alt="Glasses" 
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(4)}>
                                        <img 
                                            src={category != 4 ? 'images/Icons/hat.svg' : 'images/Icons/hat_highlighted.svg' } 
                                            alt="Hat" 
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4" onClick={() => selectCategory(5)}>
                                        <img 
                                            src={category != 5 ? 'images/Icons/overhead.svg' : 'images/Icons/overhead_highlighted.svg'} 
                                            alt="Overhead" 
                                        />
                                    </div>
                                </div>
                                <div className="row cardsAllmaim">
                                    {
                                        category == 0 ? <TraitCollection trait='background' /> : ''
                                    }
                                    {
                                        category == 1 ? <TraitCollection trait='body' /> : ''
                                    }
                                    {
                                        category == 2 ? <TraitCollection trait='bulb' /> : ''
                                    }
                                    {
                                        category == 3 ? <TraitCollection trait='glasses' /> : ''
                                    }
                                    {
                                        category == 4 ? <TraitCollection trait='hat' /> : ''
                                    }
                                    {
                                        category == 5 ? <TraitCollection trait='overhead' /> : ''
                                    }
                                </div>
                            </div>
                            <div className="details-box">
                                <figure>
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