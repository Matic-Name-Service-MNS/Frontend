import { BsSearch } from "react-icons/bs";
import logoLg from "../Assets/pns_large_logo-white.png";
import Link from "next/link";
import Header from "./components/Header";
import Image from "next/image";
import {useState} from "react"
import { Available, registerdom } from "./Blockchain.Services";

function BuyDomain() {
  const [name, setName] = useState("");

  const handleSubmission = async (e) => {
    e.preventDefault();

    const tokenID = await Available({name});
    console.log(tokenID)
  }
  const handle = async(e)=> {
    registerdom({name})
  }
  return (
    <div>
      <Header />{" "}
      <div className="absolute w-full h-full bg-[#7b3fe4] p-4 flex flex-col items-center  ">
        {/* MNS Main Page Header */}
        <div className="flex w-full justify-between items-center text-white mb-[5px]">        
        </div>
        {/* ENS Logo */}
        <div className="w-[223px] mb-[65px]">
          <Image src={logoLg} alt="" />
        </div>
        {/* ENS Search-Bar */}
        <div className="w-[250px] lg:w-[700px] h-[50px] lg:h-[90px] flex justify-between drop-shadow-lg bg-white rounded-lg">
          <div className="w-[80%] lg:w-[70%] flex items-center lg:px-4">
            <BsSearch className="text-lg lg:text-3xl mr-2 ml-2 lg:mr-3" />
            <input
              className="bg-transparent lowercase text-md lg:text-3xl font-light h-full lg:w-full outline-none"
              type="text"
              onChange={(e) => setName(e.target.value)} value={name} required
              placeholder="Search names or address"
            />
          </div>
          <button onClick={handleSubmission}  className="bg-[#a87ef0] hover:bg-[#7b3fe4] hover:text-white w-[30%] text-md lg:text-3xl rounded-r-lg font-light">
            Search
          </button>
          <button onClick={handle}  className="bg-[#a87ef0] hover:bg-[#7b3fe4] hover:text-white w-[30%] text-md lg:text-3xl rounded-r-lg font-light">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyDomain;
