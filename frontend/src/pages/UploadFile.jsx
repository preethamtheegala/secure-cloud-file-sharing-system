import { FaCloudUploadAlt, FaLock } from "react-icons/fa";

function UploadFile() {
  return (
    <div className="container py-5">

      <div className="glass-card text-center">

        <FaCloudUploadAlt
          size={120}
          color="#00e5ff"
        />

        <h2 className="mt-4">
          Secure File Upload
        </h2>

        <p className="feature-desc">
          All files are encrypted using AES-256 encryption
        </p>

        <div
          className="mt-4 p-5"
          style={{
            border:"2px dashed rgba(0,229,255,.4)",
            borderRadius:"20px"
          }}
        >
          <h5>Drag & Drop Files Here</h5>
          <p className="text-secondary">
            or choose from your computer
          </p>

          <input
            type="file"
            className="form-control mt-3"
          />
        </div>

        <button className="btn glow-btn mt-4">
          Upload Securely
        </button>

      </div>

    </div>
  );
}

export default UploadFile;