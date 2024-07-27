import React, { useState, useEffect } from 'react';
import UniLogo from '../assets/UniLogo.png';
import greencheck from '../assets/greencheck.jpg';
import redcross from '../assets/redcross.jpg';

function Certificate(contract, account) {
  // State for the identity number
  const [identityNumber, setIdentityNumber] = useState('');
  const [cert, setCert] = useState(null);
  const [isCertValid, setIsCertValid] = useState(false);

  useEffect(() => {

    if (contract.contract) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const nric = urlParams.get('nric');

      if (nric != undefined && nric.length != 0)
        checkCert(nric);
    }

  }, [contract,cert]);

  // Handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    checkCert("");

  };

  async function checkCert(nric) {
    try {
      var cert = "";
      setIsCertValid(false);

      if (nric.length > 0) {
        cert = await contract.contract.methods.getCertificateURI(nric).call();
      } else {
        cert = await contract.contract.methods.getCertificateURI(identityNumber).call();
      }



      if (cert) {
        // Fetch the image from IPFS
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cert.tokenURI}`);
        const blob = await response.blob();

        // Convert the Blob data to a URL
        const imageUrl = URL.createObjectURL(blob);

        // Create an img element
        const imgElement = document.createElement('img');

        // Set the src attribute of the img element to the fetched image URL
        const modalImage = document.getElementById('modalImage');
        modalImage.style.display = '';
        modalImage.src = imageUrl;

        setIsCertValid(true);
        setCert(cert);
      }
      else {

        const modalImage = document.getElementById('modalImage');
        modalImage.style.display = 'none';

      }
      showDialog();


    } catch (err) {
      console.error("Error fetching pinned JSON:", err);

      const modalImage = document.getElementById('modalImage');
      modalImage.style.display = 'none';

      showDialog();
    }
  }
  function showDialog() {
    // Append the img element to a container in the DOM
    const modal = document.getElementById('imageModal');
    modal.style.display = 'block';

    // Close the modal when the close button is clicked
    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = function () {
      modal.style.display = 'none';
    };
  }

  return (
    <div className="certificate">
      <img src={UniLogo} className="Applogo" alt="logo" />
      <h1>Verify Web3 University Certificate</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="identityNumber">
          <i className="fas fa-id-card"></i> Identity Number:</label>
        <input
          type="text"
          id="identityNumber"
          name="identityNumber"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          required
        />
        <button type="submit">Verify Certificate</button>
        <div id="imageModal" class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <img src={isCertValid ? greencheck : redcross} className={isCertValid ? "greencheck" : "redcross"} alt="logo" />
            <h3>Web3 Certificate is {isCertValid ? "valid" : "invalid"}</h3>
            {cert && (
            <div class="project-info-box">
              <h1>Certificate Details</h1>
              <p><b>Name:</b> {cert.name}</p>
              <p><b>ID:</b> {cert.id}</p>
                <p><b>Award Date:</b> {cert.awardDate}</p>
                <p><b>Programme:</b> {cert.programme}</p>
            </div>
            )}
            <img id="modalImage" src="" alt="Image" />
          </div>
        </div>
      </form>
      <footer className="footer">
        <span>All rights reserved by Web3 University</span>
      </footer>
    </div>
  );
}

export default Certificate;