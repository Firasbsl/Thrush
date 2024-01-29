import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import useTextToxicity from "react-text-toxicity"
import {toast} from "react-toastify"
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


function NameToxicity({ predictions_name }) {
  const style = { margin: 10 }
  if (!predictions_name) return <div style={style}>Loading predictions...</div>

  return (
    <div style={style}>
      {predictions_name.map(({ label, match, probability }) => (
        <div style={{ margin: 5 }} key={label}>
          {`${label} - ${probability} - ${match ? ' Clean it up NOW!🤢' : ' Spread kindness🥰'}`}
        </div>
      ))}
    </div>
  );
}
function DescriptionToxicity({ predictions_desc }) {
  const style = { margin: 10 }
  if (!predictions_desc) return <div style={style}>Loading predictions...</div>

  return (
    <div style={style}>
      {predictions_desc.map(({ label, match, probability }) => (
        <div style={{ margin: 5 }} key={label}>
          {`${label} - ${probability} - ${match ? ' Clean it up NOW!🤢' : ' Spread kindness🥰'}`}
        </div>
      ))}
    </div>
  );
}

const Create = ({ marketplace, nft }) => {
  const [audio, setAudio] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const predictions_name = useTextToxicity(name)
  const predictions_desc = useTextToxicity(description)


  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setAudio(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error) {
        console.log("ipfs audio upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!audio || !price || !name || !description) return
    try {
      const result = await client.add(JSON.stringify({ audio, price, name, description }))
      mintThenList(result)
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    await (await nft.mint(uri)).wait()
    const id = await nft.tokenCount()
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
    console.log("Added successfully to the marketplace!");
    toast.success('NFT successfully added to the marketplace 👏', {
      position: "top-center"
    })
   
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                accept="audio/*"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              {name && <NameToxicity predictions_name={predictions_name} />}
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              {description && <DescriptionToxicity predictions_desc={predictions_desc} />}
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} style={{ backgroundColor: "#ec5c0c", borderColor: "#ec5c0c", marginBottom: 10 }} size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create