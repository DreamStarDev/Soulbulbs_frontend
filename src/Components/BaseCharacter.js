import '../App.css';
import '../responsive.css';
import { Link } from "react-router-dom";
import { useAppContext } from '../Context/state';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../utils/api';

const BaseCharacter = (props) => {
    const [like, setLike] = useState(props.likes);
    const [enalbleLike, setEnableLike] = useState(true);
    const appContext = useAppContext();
    let history = useHistory();

    useEffect(() => {
        setLike(props.likes);
    }, [props.likes]);

    const onClickBuy = () => {
        let pathObj = appContext.traitPath;
        pathObj.hoodie = props.path;
        appContext.setTraitPath({ ...appContext.traitPath });
        history.push("/details");
    }

    const onClickLike = async () => {
        await api.post('/likes', {
            id: props.number,
            like: like+1
        });
        setLike(like+1);
        setEnableLike(false);
    }

    return (
        <div className="col-md-3 col-6">
            <div className="list-products-in">
                <figure >
                    <img src={require("../images/hoodie/" + props.path)} alt="" />
                </figure>
                <div className='foo-ctn'>
                    <figcaption>
                        <a href="#">#{props.number}</a>
                        <p>Price: 0, 20ETH</p>
                    </figcaption>
                    <div className='foot2ctn'>
                        <div className="likes">
                            <img src={require("../images/heart.png")} alt="" /> {like}
                            <button className="btn-like" onClick={onClickLike} disabled={!enalbleLike}>
                                <img src={require("../images/like.png")} alt=""/>
                            </button>
                        </div>
                        {/* <Link to="/details" className="btn btn-box">Buy Now</Link> */}
                        <Link className="btn btn-box" onClick={onClickBuy}>Buy Now</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BaseCharacter;