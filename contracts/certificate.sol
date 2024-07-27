    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.19;


    import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
    import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


    contract Certificate is ERC721URIStorage{
        uint256 private _tokenIds = 0;
        address public owner;
        // Mapping from identity number to certificate
        mapping(string => Cert) private _certificate;
        
        struct Cert {
            string name;
            string id;
            string awardDate;
            string programme;
            string tokenURI;
        }

        constructor(        
        ) ERC721("Certificate", "CERT") {
            owner = msg.sender;
        }
        function _baseURI() internal pure override returns (string memory) {
            return "https://gateway.pinata.cloud/ipfs/";
        }
        
        modifier onlyOwner() {
            require(msg.sender == owner, "Only owner can call this function");
            _;
        }

        function mint(string memory tokenURI, 
        string memory _name, 
        string memory _identityNumber, 
        string memory _awardDate, 
        string memory _programme) public onlyOwner returns (uint256) {

            _tokenIds++;

            uint256 newItemId = _tokenIds;
            _mint(msg.sender, newItemId);
            _setTokenURI(newItemId, tokenURI);
            Cert memory newCert = Cert({
                name: _name,
                id: _identityNumber,
                awardDate: _awardDate,
                programme: _programme,
                tokenURI: tokenURI
            });
            _certificate[_identityNumber] = newCert;
            return newItemId;
        }

        function totalSupply() public view returns (uint256) {
            return _tokenIds;
        }

        function getCertificateURI(string memory identityNumber) public view returns (Cert memory)
        {
            require(bytes(_certificate[identityNumber].id).length > 0, "Certificate not found");
            return _certificate[identityNumber];
        }
    }