import { useEffect, useState } from "react";
import {
  FaDownload,
  FaTrash,
  FaShareAlt,
  FaSearch,
  FaEye,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileImage,
  FaFile
} from "react-icons/fa";
import api from "../services/api";

function MyFiles() {

  const [showShareModal, setShowShareModal] = useState(false);
const [selectedFileId, setSelectedFileId] = useState("");
const [shareEmail, setShareEmail] = useState("");
const [permission, setPermission] = useState("view");
const [days, setDays] = useState(1);

const [showLinkModal, setShowLinkModal] = useState(false);
const [secureLink, setSecureLink] = useState("");

  const [files, setFiles] =
    useState([]);

  const [filteredFiles,
    setFilteredFiles] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {

    const filtered =
      files.filter((file) =>
        file.fileName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    setFilteredFiles(
      filtered
    );

  }, [search, files]);

  const getFileIcon =
    (fileName) => {

      const ext =
        fileName
          .split(".")
          .pop()
          .toLowerCase();

      switch (ext) {

        case "pdf":
          return (
            <FaFilePdf
              className="me-2 text-danger"
            />
          );

        case "doc":
        case "docx":
          return (
            <FaFileWord
              className="me-2 text-primary"
            />
          );

        case "xls":
        case "xlsx":
          return (
            <FaFileExcel
              className="me-2 text-success"
            />
          );

        case "ppt":
        case "pptx":
          return (
            <FaFilePowerpoint
              className="me-2 text-warning"
            />
          );

        case "zip":
        case "rar":
          return (
            <FaFileArchive
              className="me-2 text-secondary"
            />
          );

        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "webp":
          return (
            <FaFileImage
              className="me-2 text-info"
            />
          );

        default:
          return (
            <FaFile
              className="me-2"
            />
          );

      }

    };

  const fetchFiles =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/files/myfiles",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setFiles(
          res.data
        );

        setFilteredFiles(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  const deleteFile =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this file?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(
          `/files/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );ß

        fetchFiles();

      } catch (error) {

        console.log(error);

      }

    };

  const shareFile = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await api.put(
      `/files/share/${selectedFileId}`,
      {
        email: shareEmail,
        permission,
        days
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      "File Shared Successfully"
    );

    setShowShareModal(false);

    setShareEmail("");
    setPermission("view");
    setDays(1);
    setSelectedFileId("");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Share Failed"
    );

  }

};

const generateSecureLink =
  async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await api.get(
          `/files/secure-link/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const link =
       `https://secure-cloud-file-sharing-system-lbe3.onrender.com/api/files/access/${res.data.token}`;

      setSecureLink(link);

      setShowLinkModal(true);

    } catch (error) {

      console.log(error);

    }

  };

  const copySecureLink = () => {

  navigator.clipboard.writeText(
    secureLink
  );

  alert(
    "Link Copied"
  );

};



  const viewFile = (
  url,
  fileName
) => {

  const ext =
    fileName
      .split(".")
      .pop()
      .toLowerCase();

  const viewableTypes = [
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp"
  ];

  if (
    viewableTypes.includes(
      ext
    )
  ) {

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  } else {

    downloadFile(
      url,
      fileName
    );

  }

};

  const downloadFile =
    async (
      url,
      fileName
    ) => {

      try {

        const response =
          await fetch(url);

        const blob =
          await response.blob();

        const blobUrl =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href =
          blobUrl;

        link.download =
          fileName;

        document.body.appendChild(
          link
        );

        link.click();

        document.body.removeChild(
          link
        );

        window.URL.revokeObjectURL(
          blobUrl
        );

      } catch (error) {

        console.log(error);

        alert(
          "Download Failed"
        );

      }

    };

  if (loading) {

    return (
      <div className="container py-5">
        <h3>
          Loading Files...
        </h3>
      </div>
    );

  }

  return (

    <div className="container py-5">

      <h1 className="mb-4">
        My Secure Files
      </h1>

      <div className="glass-card mb-4">

        <div className="input-group">

          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search files..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="glass-card">

        <table className="table table-dark align-middle">

          <thead>

            <tr>

              <th>
                File Name
              </th>

              <th>
                Size
              </th>

              <th>
                Uploaded
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredFiles.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center"
                >
                  No Files Found
                </td>

              </tr>

            ) : (

              filteredFiles.map(
                (file) => (

                  <tr
                    key={file._id}
                  >

                    <td>

                      {
                        getFileIcon(
                          file.fileName
                        )
                      }

                      {
                        file.fileName
                      }

                    </td>

                    <td>

                      {(
                        file.fileSize /
                        1024
                      ).toFixed(2)}
                      {" "}
                      KB

                    </td>

                    <td>

                      {new Date(
                        file.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td>

                      <FaEye
                        className="me-4 text-success"
                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "18px"
                        }}
                        title="View"
                        onClick={() =>
                          viewFile(
                            file.fileUrl,
                            file.fileName
                          )
                        }
                      />

                      <FaDownload
                        className="me-4 text-info"
                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "18px"
                        }}
                        title="Download"
                        onClick={() =>
                          downloadFile(
                            file.fileUrl,
                            file.fileName
                          )
                        }
                      />

                      <FaShareAlt
                        className="me-4 text-warning"
                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "18px"
                        }}
                        title="Share"
                        onClick={() => {
                          setSelectedFileId(
                            file._id
                          );
                          setShowShareModal(true);
                        }}
                      />

                      <button
  className="btn btn-sm btn-info me-2"
  onClick={() =>
    generateSecureLink(
      file._id
    )
  }
>
  Link
</button>

                      <FaTrash
                        className="text-danger"
                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "18px"
                        }}
                        title="Delete"
                        onClick={() =>
                          deleteFile(
                            file._id
                          )
                        }
                      />

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {showShareModal && (

<div
  className="modal d-block"
  tabIndex="-1"
>

  <div className="modal-dialog">

    <div className="modal-content bg-dark text-white">

      <div className="modal-header">

        <h5>
          Share File
        </h5>

        <button
          className="btn-close btn-close-white"
          onClick={() =>
            setShowShareModal(false)
          }
        />

      </div>

      <div className="modal-body">

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={shareEmail}
          onChange={(e) =>
            setShareEmail(
              e.target.value
            )
          }
        />

        <select
          className="form-select mb-3"
          value={permission}
          onChange={(e) =>
            setPermission(
              e.target.value
            )
          }
        >

          <option value="view">
            View
          </option>

          <option value="download">
            Download
          </option>

        </select>

        <select
          className="form-select"
          value={days}
          onChange={(e) =>
            setDays(
              Number(
                e.target.value
              )
            )
          }
        >

          <option value="1">
            1 Day
          </option>

          <option value="7">
            7 Days
          </option>

          <option value="30">
            30 Days
          </option>

        </select>

      </div>

      <div className="modal-footer">

        <button
          className="btn btn-primary"
          onClick={shareFile}
        >
          Share
        </button>

      </div>

    </div>

  </div>

</div>

)}
{showLinkModal && (

<div
  className="modal d-block"
  tabIndex="-1"
>

  <div className="modal-dialog">

    <div className="modal-content bg-dark text-white">

      <div className="modal-header">

        <h5>
          Secure Link
        </h5>

        <button
          className="btn-close btn-close-white"
          onClick={() =>
            setShowLinkModal(false)
          }
        />

      </div>

      <div className="modal-body">

        <input
          type="text"
          className="form-control"
          value={secureLink}
          readOnly
        />

      </div>

      <div className="modal-footer">

        <button
          className="btn btn-success"
          onClick={copySecureLink}
        >
          Copy Link
        </button>

      </div>

    </div>

  </div>

</div>

)}

    </div>

  );
}

export default MyFiles;