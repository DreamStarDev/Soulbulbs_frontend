import { createContext, useContext, useState } from 'react';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import mergeImages from 'merge-images';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [isAddrWhitelisted, setAddrWhitelisted] = useState(false);
    const [proof, setProof] = useState([]);

    const [traitPath, setTraitPath] = useState({
        background: '',
        body: '',
        bulb: '',
        glasses: '',
        hat: '',
        hoodie: '01_BlackHoodie.png',
        overhead: ''
    });

    const [imageData, setImageData] = useState('');

    const initTraitPath = () => {
        setTraitPath({
            background: '',
            body: '',
            bulb: '',
            glasses: '',
            hat: '',
            hoodie: '01_BlackHoodie.png',
            overhead: ''
        });
    }

    const generateImage = () => {
        let pathArray = [];
        if (traitPath.background.length !== 0) {
            pathArray.push('images/background/' + traitPath.background);
        }
        if (traitPath.hoodie.length !== 0) {
            pathArray.push('images/hoodie/' + traitPath.hoodie);
        }
        if (traitPath.bulb.length !== 0) {
            pathArray.push('images/bulb/' + traitPath.bulb);
        }
        if (traitPath.overhead.length !== 0) {
            pathArray.push('images/overhead/' + traitPath.overhead);
        }
        if (traitPath.hat.length !== 0) {
            pathArray.push('images/hat/' + traitPath.hat);
        }
        if (traitPath.glasses.length !== 0) {
            pathArray.push('images/glasses/' + traitPath.glasses);
        }
        if (traitPath.body.length !== 0) {
            pathArray.push('images/body/' + traitPath.body);
        }

        mergeImages(pathArray)
            .then(b64 => {
                setImageData(b64);
            })
    }

    // For CoinbaseWallet
    const CoinbaseWallet = new WalletLinkConnector({
        // url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
        url: `https://mainnet.infura.io/v3`,
        appName: "SoulBulbs",
        supportedChainIds: [1, 3, 4, 5, 56, 137, 43114],
    });

    // For Walletconnect
    const WalletConnect = new WalletConnectConnector({
        rpcUrl: `https://mainnet.infura.io/v3`,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
    });

    // For Metamask
    const Injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 56, 137, 43114]
    });

    return (
        <AppContext.Provider 
            value={{ 
                traitPath, 
                setTraitPath, 
                initTraitPath, 
                imageData, 
                generateImage, 
                CoinbaseWallet, 
                WalletConnect, 
                Injected,
                isAddrWhitelisted,
                setAddrWhitelisted,
                proof,
                setProof
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}