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
            like: like + 1
        });
        setLike(like + 1);
        setEnableLike(false);
    }

    return (
        <div className="col-md-3 col-6">
            <div className="list-products-in">
                <figure >
                    <img src={"images/hoodie/" + props.path} alt="" />
                </figure>
                <div className='foo-ctn'>
                    <figcaption>
                        <a href="#">{String(props.path).substring(3, props.path.length - 10)}</a>
                        <div>
                            <p>Allowlist: 0, 03ETH</p>
                            <p>Public: 0, 05ETH</p>
                            <p>SOULS: 600</p>
                        </div>
                    </figcaption>
                    <div className='foot2ctn'>
                        <div className="likes">
                            {like}
                            <button className="btn-like" onClick={onClickLike} disabled={!enalbleLike}>
                                <img src="images/like.png" alt="" />
                            </button>
                        </div>
                        {/* <Link to="/details" className="btn btn-box">Buy Now</Link> */}
                        <button className="btn btn-buynow" onClick={onClickBuy}>Buy Now</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default BaseCharacter;