import { useEffect, useState } from "react";
import "./MyBlogs.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Button } from "web3uikit";
import { useNavigate } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import MediumAddress from '../backend/contractsData/Medium-address.json'

const MyBlogs = () => {
 
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, isAuthenticated, account } = useMoralis();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState();
  const [blogsContent, setBlogsContent] = useState();

  useEffect(() => {
    const fetchBlogsContent = async () => {
    
      const limit5 = blogs?.slice(0, 5);
      let contentBlog = [];
  
      if (limit5) {
        limit5.map(async (blog) => {
          if (blog) {
            const { externalUrl, owner_of } = blog;
            const res = await axios.get(externalUrl);
            const text = res.data.text.toString();
            const title = res.data.title;
            contentBlog.push({ title, text, owner_of, externalUrl });
          }
        });
      }
  
      setBlogsContent(contentBlog);
  
    };
    if (blogs && !blogsContent) {
      fetchBlogsContent();
    }
  }, [blogs, blogsContent]);

  useEffect(() => {
    const fetchAllNfts = async () => {

      const options = {
        chain: "mumbai",
        address: account,
        token_address: `${MediumAddress.address}`,
      };
  
      const polygonNFTs = await Web3Api.account.getNFTsForContract(options);
      const tokenUri = polygonNFTs?.result?.map((data) => {
        const { metadata, owner_of } = data;
  
        if (metadata) {
          const metadataObj = JSON.parse(metadata);
          const { externalUrl } = metadataObj;
          return { externalUrl, owner_of };
        } else {
          return undefined;
        }
      });
      setBlogs(tokenUri);
      
    };
    if (isInitialized && isAuthenticated) {
      fetchAllNfts();
    } 
  }, [isAuthenticated, isInitialized, account, Web3Api.account]);

  const clickHandler = () => {
    navigate("/newStory");
  };

  return (
    <>
      <div>
      <div className="myBlogsHeader">Your Stories</div>
        {blogsContent && blogsContent?.length > 0 ? (
            blogsContent.map((blog, i) => {
              const { title, text, owner_of, externalUrl } = blog;
              return (
                <BlogCard
                  key={i}
                  title={title}
                  text={text}
                  ownerOf={owner_of}
                  externalUrl={externalUrl}
                />
              );
            })
        ) : (
          <div
          style={{
            fontSize: "30px",
            width: "100%",
            marginLeft: "40%",
          }}
        >
          <p>No Blogs Yet</p>
          <button className="buttonCreate" onClick={clickHandler}>
            Create
          </button>
        </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
