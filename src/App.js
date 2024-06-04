import React, { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function Home() {
  const [dataForQrCode, setDataForQrCode] = useState("");
  const [qrCodeImageSize, setQrCodeImageSize] = useState(150);
  const [qrCode, setQrCode] = useState("");

  // Function to generate QR code
  async function generateQrCode() {
    try {
      if (!dataForQrCode || !qrCodeImageSize) {
        throw new Error("Please fill all the fields");
      }

      if (qrCodeImageSize < 150 || qrCodeImageSize > 250) {
        throw new Error("Enter QR code image size between 150-250");
      }

      const generateQrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeImageSize}x${qrCodeImageSize}&data=${dataForQrCode}`;
      setQrCode(generateQrCodeURL);
    } catch (error) {
      Swal.fire({
        text: error.message,
      });
    }
  }

  // Function to download QR code
  function downloadQrCode() {
    fetch(qrCode)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download QR code");
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
        });
      });
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4 fw-bold">
                QR CODE GENERATOR
              </h2>

              {qrCode && (
                <img
                  id="qrCodeImage"
                  src={qrCode}
                  className="mx-auto d-block mb-3"
                  alt="QR Code"
                />
              )}

              <label htmlFor="dataInput" className="form-label">
                Enter URL or text
              </label>
              <input
                value={dataForQrCode}
                onChange={(e) => setDataForQrCode(e.target.value)}
                id="dataInput"
                className="form-control mb-3"
                placeholder="E.g.www.google.com"
              />

              <label htmlFor="imageInput" className="form-label">
                QR Image size
              </label>
              <input
                value={qrCodeImageSize}
                type='number'
                onChange={(e) => setQrCodeImageSize(e.target.value)}
                id="imageInput"
                className="form-control mb-3"
                placeholder="Enter Image size"
              />

              <div className="d-grid gap-2  justify-content-center">
                <button
                  onClick={generateQrCode}
                  className="btn btn-primary mb-3 w-100"
                >
                  Generate QR code
                </button>

                {qrCode && (
                  <button
                    onClick={downloadQrCode}
                    className="btn btn-secondary w-100"
                  >
                    Download QR code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
