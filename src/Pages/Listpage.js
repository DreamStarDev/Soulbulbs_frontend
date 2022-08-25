import '../App.css';
import '../responsive.css';
import { Link } from "react-router-dom";
import NavBar from '../Components/TopHeader';
import { useState, useEffect } from 'react';
import BaseCharacter from '../Components/BaseCharacter';
import WalletConnectModal from "../Components/WalletConnectModal";
import { useAppContext } from '../Context/state';
import api from '../utils/api';

function Listpage() {
  const [baselist, setBaseList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const appContext = useAppContext();

  useEffect(() => {
    appContext.initTraitPath();
    api.get('/likes')
    .then(res => {
      let likeCount = [];
      likeCount = res.data.likeCount;
      setLikeList(likeCount);
    })
    .catch(e => {
      console.log(e);
    })
  }, []);

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  useEffect(() => {
    let hoodies = importAll(require.context('../images/hoodie', false, /\.(png|jpe?g|svg)$/));
    setBaseList(Object.keys(hoodies));
  }, []);

  return (
    <div className="change-room-main">
      <NavBar />
      <div className="container">
        <div className="list-page">
          <div className="title-head">
            <h4>Pick Base Character</h4>
          </div>
          <div className="list-products listcardcc" >
            <div className="action-btn-out">
              <div className="action-btn container p-0 d-flex">
                {/* <div className="btmfoot" >
                  <div className="" >
                    <Link style={{  color: "#000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px"}} className="btn btn-bg bkbtn" to="/">Back</Link>
                  </div>
                  <Link to="/details" style={{  textTransform: "capitalize",color: "#000", backgroundColor: "#FFC83A", border: "2px solid #FFC83A", lineHeight: "45px", bottom:"27%"}} className="btn btn-bg">CUSTOMIZER</Link>
                </div> */}
              </div>
            </div>
            <div className="row">
              {
                baselist.map((item, index) => (
                  <BaseCharacter path={item} key={index} number={index+1} likes={likeList[index] === undefined ? 0 : likeList[index].count}/>
                ))
              }
              {/* <div className="col-md-3 col-6">
                <div className="list-products-in">
                  <figure >
                    <img src={require("../images/p1.png")} alt="" />
                  </figure>
                  <div className='foo-ctn'>
                    <figcaption>
                      <a href="#">#0001</a>
                      <p>Price: 0, 20ETH</p>
                    </figcaption>
                    <div className='foot2ctn'>
                      <div className="likes">
                        <img src={require("../images/heart.png")} alt="" /> 230
                      </div>
                      <Link to="/details" className="btn btn-box">Buy Now</Link>
                    </div>

                  </div>

                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="list-products-in">
                  <figure>
                    <img src={require("../images/p2.png")} alt="" />
                  </figure>
                  <div className='foo-ctn'>
                    <figcaption>
                      <a href="#">#0001</a>
                      <p>Price: 0, 20ETH</p>
                    </figcaption>
                    <div className='foot2ctn'>
                      <div className="likes">
                        <img src={require("../images/heart.png")} alt="" /> 230
                      </div>
                      <Link to="/details" className="btn btn-box">Buy Now</Link>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <WalletConnectModal />
    </div>
  )
}

export default Listpage;