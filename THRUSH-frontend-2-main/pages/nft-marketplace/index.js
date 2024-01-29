import { BaseLayout } from "../../components/common/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from './Navbar';
import Home from '../../components/NFTMarketplace/components/Home.js';
import Create from '../../components/NFTMarketplace/components/Create.js';
import MyPurchases from "../../components/NFTMarketplace/components/MyPurchases.js";
import MyListedItems from "../../components/NFTMarketplace/components/MyListedItem.js";
import Reviews from "../../components/NFTMarketplace/components/Reviews.js";
import { ethers } from "ethers"; //interact with ethereum nodes
import { useState } from "react";
import MarketplaceAbi from '../../components/NFTMarketplace/scripts/contractsData/Marketplace.json';
import MarketplaceAddress from '../../components/NFTMarketplace/scripts/contractsData/Marketplace-address.json'
import NFTAbi from '../../components/NFTMarketplace/scripts/contractsData/NFT.json'
import NFTAddress from '../../components/NFTMarketplace/scripts/contractsData/NFT-address.json'
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function NFTMarketplace(){
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState(null)
    const [nft, setNFT] = useState({})
    const [marketplace, setMarketplace] = useState({})
    //Metamask loginc/connect
    const web3Handler = async () => {
        //fetch accs on metamask with 1st listed acc is the one connected to app
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts[0])
        //get provider from metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        //set signer
        const signer = provider.getSigner()

        window.ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        })
    
        window.ethereum.on('accountsChanged', async function (accounts) {
          setAccount(accounts[0])
          await web3Handler()
        })
        await loadContracts(signer)
    }
    const loadContracts = async(signer) =>{
        //get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketplace(marketplace)
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
        setNFT(nft)
        setLoading(false) //when all contracts loaded
    }   
    
    return (
        <BrowserRouter>
          <div className="App">
            <>
              <Navigation web3Handler={web3Handler} account={account} />
            </>
            <div>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                  <Spinner animation="border" style={{ display: 'flex' }} />
                  <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
                </div>
              ) : (
                <Routes>
                  <Route path="/" element={
                    <Home marketplace={marketplace} nft= {nft} />
                  } />
                  <Route path="/nft-marketplace/create" element={
                    <Create marketplace={marketplace} nft= {nft} />
                  }/>
                  
                  <Route path="/nft-marketplace/my-listed-items" element={
                    <MyListedItems marketplace={marketplace} nft= {nft} account= {account}/>
                  }/>
                
                  <Route path="/nft-marketplace/my-purchases" element={
                    <MyPurchases marketplace= {marketplace} nft= {nft} account= {account} />
                  }/>

                  <Route path="/nft-marketplace/reviews" element={
                    <Reviews />
                  }/>
                </Routes>
              )}
            </div>
          </div>
        </BrowserRouter>
      );
}

NFTMarketplace.Layout = BaseLayout;