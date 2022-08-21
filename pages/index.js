import styles from "../styles/Home.module.css";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client";
import GET_ACTIVE_ITEMS from "../constants/subGraphQueries";

export default function Home() {
  
  const { chainId, isWeb3Enabled } = useMoralis(); // this gives us that in our hex form
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];
  
  const {loading, error, data: listedNfts} = useQuery(GET_ACTIVE_ITEMS);

  console.log(listedNfts);
  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recentely Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div> Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              console.log(nft);
              const { price, nftAddress, tokenId, seller } = nft;
              return (
                <div>
                  <NFTBox
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                  />
                </div>
              );
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
    </div>
  );
}
