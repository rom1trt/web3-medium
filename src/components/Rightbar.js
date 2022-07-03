import "./Rightbar.css";
import { Input } from "web3uikit";

const Rightbar = () => {
  const trends = [
    {
      text: "How to Read Smart Contracts",
    },
    {
      text: "IPFS — Distributed, Content Addressed, Versioned, Peer-to-Peer File Protocol",
    },
    {
      text: "Layer 2: One Step Closer to the Mass Adoption of Blockchain",
    },
    {
      text: "Zero-Knowledge Proof : Proving It Without Revealing It",
    },
  ];

  return (
    <>
      <div className="rightbarContent">
          <Input label="Search" name="Search" prefixIcon="search"></Input>
        <div className="trends">
          <h4> </h4>
          <h5>What We're Reading Today</h5>
          {trends.map((e, i) => {
            return (
              <div key={i} className="trend">
                <div className="trendText">{e.text}</div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
};

export default Rightbar;
