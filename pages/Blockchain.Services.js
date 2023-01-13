import Web3 from "web3";
import { setGlobalState, getGlobalState, setAlert } from "../store/index";
import register from "./contracts/Registry.json";
import { ethers } from "ethers";
import rawdata from "./contracts/RawData.json";
const { ethereum } = window;
if (ethereum) {
  window.web3 = new Web3(ethereum);
  window.web3 = new Web3(window.web3.currentProvider);
}

const Available = async ({ name }) => {
  const CONTRACT_ADDRESS = "0x8afd0715eD6666CBEf8d23cbaE5b3108Fe0c393e";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // console.log(provider);
  const Domain = new ethers.Contract(CONTRACT_ADDRESS, register, signer);
  const tokenId = await Domain.available(name);
  localStorage.setItem("name", name);
  console.log(tokenId);
  if (tokenId == true) {
    console.log("Domain is Available");
    stringtobyte({ name });
    Makecommitment();
    commit();
  } else {
    console.log("Domain is Already registered");
  }
  return tokenId;
};

const stringtobyte = async ({ name }) => {
  const CONTRACT_ADDRESS = "0xe66983CcB6F6D1480fFf4C20b7ffbE7dfE1Ae1E8";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const Domain = new ethers.Contract(CONTRACT_ADDRESS, rawdata, signer);
  const tokenId = await Domain.stringToBytes32(name);
  localStorage.setItem("secret", tokenId);
  console.log(tokenId);
  return tokenId;
};

const Makecommitment = async () => {
  const CONTRACT_ADDRESS = "0xe66983CcB6F6D1480fFf4C20b7ffbE7dfE1Ae1E8";
  const resolver = "0x56eD183f1c4F787bf4143CeCb8E2f24F3eA886c5";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const name = localStorage.getItem("name");
  const secret = localStorage.getItem("secret");
  const Domain = new ethers.Contract(CONTRACT_ADDRESS, rawdata, signer);
  const tokenId = await Domain.makeCommitmentWithConfig(name, secret, resolver);
  localStorage.setItem("Makecommitment", tokenId);
  console.log(tokenId);
  return tokenId;
};

const commit = async () => {
  const CONTRACT_ADDRESS = "0x8afd0715eD6666CBEf8d23cbaE5b3108Fe0c393e";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const commitment = localStorage.getItem("Makecommitment");
  const Domain = new ethers.Contract(CONTRACT_ADDRESS, register, signer);
  const tokenId = await Domain.commit(commitment);
  localStorage.setItem("commitment", commitment);
  console.log(tokenId);
  return tokenId;
};

const registerdom = async ({ name }) => {
  const CONTRACT_ADDRESS = "0x8afd0715eD6666CBEf8d23cbaE5b3108Fe0c393e";
  const secret = localStorage.getItem("secret");
  const resolver = "0x56eD183f1c4F787bf4143CeCb8E2f24F3eA886c5";
  const price =
    name.length === 3 ? "0.03" : name.length === 4 ? "0.02" : "0.01";
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Domain = new ethers.Contract(CONTRACT_ADDRESS, register, signer);

    console.log("Going to pop wallet now to pay gas...");
    let tx = await Domain.registerDomain(name, secret, resolver, {
      value: ethers.utils.parseEther(price),
    });
    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check if the transaction was successfully completed
    if (receipt.status === 1) {
      console.log("Domain minted! https://polygonscan.com/tx/" + tx.hash);
    }
    console.log("Successfully registered");
  }
};

const reportError = (error) => {
  setAlert(JSON.stringify(error), "red");
  throw new Error("No ethereum object.");
};

export { Available, registerdom };
