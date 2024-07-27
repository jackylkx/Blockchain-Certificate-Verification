async function main() {
    const MyContract = await ethers.getContractFactory("Certificate");
    const myContract = await MyContract.deploy();
    console.log("MyContract deployed to:", myContract.address);

    const tokenURI = "QmNVjvPgAyUPADE7KtdbXZQo35Fn6FyDLkDznTJvrA8QQt";
    const identityNumber = "1234";
    const name ="Lee Keng Xian";
    const prog = "Degree in Software Engineering";
    const date = "22 May 2012";
    [owner] = await ethers.getSigners();

    await myContract.connect(owner).mint(tokenURI, name, identityNumber, date, prog);
    console.log("Minted Certificate to IC:", identityNumber);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });