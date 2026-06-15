import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import api from "../services/api";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadHandler = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      alert("File uploaded successfully");

      setFile(null);

      document.getElementById("fileInput").value = "";

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }
  };

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
          Upload files securely to cloud storage
        </p>

        <div
          className="mt-4 p-5"
          style={{
            border: "2px dashed rgba(0,229,255,.4)",
            borderRadius: "20px"
          }}
        >

          <h5>Select File</h5>

          <input
            id="fileInput"
            type="file"
            className="form-control mt-3"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

        </div>

        <button
          className="btn glow-btn mt-4"
          onClick={uploadHandler}
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload Securely"}
        </button>

      </div>

    </div>
  );
}

export default UploadFile;