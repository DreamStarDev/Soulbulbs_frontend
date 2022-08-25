import { useWeb3React } from '@web3-react/core'
import { useAppContext } from '../Context/state';
import { useEffect } from 'react';

const main_network_chain_id = 4;

const WalletConnectModal = () => {
    const appContext = useAppContext();
    const { activate, deactivate, active, chainId, library } = useWeb3React();

    useEffect(() => {
        if (active == true && chainId != main_network_chain_id) {
            switchNetwork();
            deactivate();
        }
    }, [active]);

    const onClickWalletConnect = () => {
        activate(appContext.WalletConnect);
    }

    const onClickMetamask = () => {
        activate(appContext.Injected);
    }

    // const onClickFortmatic = () => {
    // activate(appContext.CoinbaseWallet);
    // }

    const onClickCoinbase = () => {
        activate(appContext.CoinbaseWallet);
    }

    const onClickDisconnect = () => {
        console.log(library);
        deactivate();
    }

    const switchNetwork = async () => {
        try {
            await library.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x" + main_network_chain_id.toString(16) }],
            });
        } catch (switchError) {
            console.log(switchError);
        }
    };

    return (
        <div
            className="modal fade"
            id="walletConnectModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                        >
                            x
                        </button>
                        <div className="popupbox">
                            <p>{active ? 'Disconnect Wallet' : 'Connect Wallet'}</p>
                            <hr />
                            {
                                active ? (
                                    <div className="walleticons">
                                        <button
                                            className="btn"
                                            data-dismiss="modal"
                                            disabled={!active}
                                            style={{
                                                textTransform: "capitalize",
                                                color: "#fff",
                                                backgroundColor: "#FFC83A",
                                                border: "2px solid #FFC83A",
                                                lineHeight: "45px",
                                            }}
                                            onClick={onClickDisconnect}
                                        >
                                            Disconnect
                                </button>
                                    </div>
                                ) :
                                    (
                                        <div className="walleticons">
                                            <img data-dismiss="modal" src={require("../images/WalletConnect.png")} onClick={onClickWalletConnect} />
                                            <img data-dismiss="modal" src={require("../images/MetaMask.png")} onClick={onClickMetamask} />
                                            <img data-dismiss="modal" src={require("../images/Coinbase.png")} onClick={onClickCoinbase} />
                                        </div>
                                    )
                            }
                            {/* <div className="walleticons">
                                <img src={require("../images/Fortmatic.png")} onClick={onClickFortmatic} />
                                
                            </div> */}
                        </div>
                        <div className="errorbox">
                            <img className="errocs" src={require("../images/error.png")} />
                            <p>
                                Please don't forget to select the base character before you access the changing room
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WalletConnectModal;
