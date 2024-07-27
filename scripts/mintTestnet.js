async function main() {
    const [owner] = await ethers.getSigners();
    
    console.log("Minting tokens with the account:", owner.address);
    
    const contractAddress = "0x462d1A6409993A24F3C6b1B23f4677438f56d6FA";
    const MyContract = await ethers.getContractFactory("Certificate");
    const myContract = MyContract.attach(contractAddress);
  
    const tokenURI = "QmNVjvPgAyUPADE7KtdbXZQo35Fn6FyDLkDznTJvrA8QQt";
    const identityNumber = "W00120120522";
    const name = "Lee Keng Xian";
    const prog = "Degree in Software Engineering";
    const date = "22 May 2012"; 
  
  //const tx = await myContract.connect(owner).mint(tokenURI, name, identityNumber, date, prog);


    const totalSupply = await myContract.totalSupply();
    const cert = await myContract.getCertificateURI("W00120120522");
  console.log("Total Supply:", totalSupply.toString());
  console.log("Total Supply:", cert.toString());

    //console.log("Minted Reference Number:", identityNumber);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  