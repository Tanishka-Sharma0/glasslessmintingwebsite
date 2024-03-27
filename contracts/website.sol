// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GlasslessMintingContract is ERC721 , Ownable{
 uint256 public  constant max_nftSupply = 5;
 uint256 public nftCount;


 event Contractdeployed(address indexed owner , address indexed contractAddress);
 event NFtCreated(uint256 indexed tokenId , address indexed owner);
 event NFTMinted(uint256 indexed tokenId , address indexed owner ,string tokenName , string tokenDescription, string tokenImage);


 constructor() Ownable(msg.sender) ERC721("GlasslessMinitingNFT" ,"GMNFT") {}

 //Function to create Non minted NFT

 function createNFT() external{
 require(nftCount < max_nftSupply,"Maximum NFT Supply Reached" );
  for(uint256 i=0; i< max_nftSupply; i++){
   _safeMint(msg.sender, nftCount+1);
   emit NFtCreated(nftCount+1, msg.sender);
   nftCount++;
  }
 }

 //function Mint nFTs

 function mintNFT(string memory _tokenName,string memory _tokenDescription,string memory _tokenImage) external{
    require(nftCount< max_nftSupply ,"Maximum NFT Supply Reached");
   _safeMint(msg.sender, nftCount+1);
   emit NFTMinted(nftCount+1, msg.sender ,_tokenName ,_tokenDescription ,_tokenImage);
  nftCount++;
 }
 //function to deploy contract

 function deploycontract() external{
    emit Contractdeployed(msg.sender, address(this));
 }

}