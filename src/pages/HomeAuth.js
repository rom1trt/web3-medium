import { useState, useEffect } from "react";
import "./HomeAuth.css";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useMoralisWeb3Api } from "react-moralis";
import MediumAddress from '../backend/contractsData/Medium-address.json'

const HomeAuth = () => {

  const [blogs, setBlogs] = useState();
  const [blogsContent, setBlogsContent] = useState();
  const Web3Api = useMoralisWeb3Api();

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
        address: `${MediumAddress.address}`,
      };
  
      const polygonNFTs = await Web3Api.token.getNFTOwners(options);
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
    if (!blogs) {
      fetchAllNfts();
    }
  }, [blogs, Web3Api.token]);


  return (
    <div className="homeAuth_container">
      <div className="homeAuth_header">Recommended Stories</div>
      <div className="homeAuth_blogs">
        {blogsContent &&
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
          })}
      </div>
    </div>
  );
};

export default HomeAuth;
