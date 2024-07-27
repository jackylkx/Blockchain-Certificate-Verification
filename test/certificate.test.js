const { ethers } = require("hardhat");

describe("Certificate", function () {
  let Certificate;
  let certificate;
  let owner;
  const tokenURI = "ipfs://QmHash"; // Sample IPFS hash


  beforeEach(async function () {
    Certificate = await ethers.getContractFactory("Certificate");
    certificate = await Certificate.deploy();
    [owner] = await ethers.getSigners();
  });

  it("Should mint a certificate and retrieve its URI", async function () {
    const identityNumber = "adasasd"; // Sample identity number
    await certificate.connect(owner).mint(tokenURI, identityNumber);
    const retrievedURI = await certificate.getCertificateURI(identityNumber);
    console.log(retrievedURI);
    //ethers.expect(retrievedURI).to.equal(tokenURI);
  });

  it("Get total supply", async function () {

    const total = await certificate.totalSupply();
    console.log(total);
    //ethers.expect(retrievedURI).to.equal(tokenURI);
  });
});