import { useEffect, useState } from "react";
import {
  FaSearch,
  FaDownload,
  FaEye,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileImage
} from "react-icons/fa";
import api from "../services/api";

function SharedFiles() {

  const [activeTab, setActiveTab] =
    useState("withMe");

  const [sharedWithMe, setSharedWithMe] =
    useState([]);

  const [sharedByMe, setSharedByMe] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const withMe =
        await api.get(
          "/files/shared",
          config
        );

      const byMe =
        await api.get(
          "/files/shared-by-me",
          config
        );

      setSharedWithMe(
        withMe.data
      );

      setSharedByMe(
        byMe.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const getFileIcon = (
    fileName
  ) => {

    const ext =
      fileName
        .split(".")
        .pop()
        .toLowerCase();

    switch (ext) {

      case "pdf":
        return (
          <FaFilePdf className="me-2 text-danger" />
        );

      case "doc":
      case "docx":
        return (
          <FaFileWord className="me-2 text-primary" />
        );

      case "xls":
      case "xlsx":
        return (
          <FaFileExcel className="me-2 text-success" />
        );

      case "ppt":
      case "pptx":
        return (
          <FaFilePowerpoint className="me-2 text-warning" />
        );

      case "zip":
      case "rar":
        return (
          <FaFileArchive className="me-2 text-secondary" />
        );

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return (
          <FaFileImage className="me-2 text-info" />
        );

      default:
        return (
          <FaFile className="me-2" />
        );

    }

  };

  const viewFile = (url) => {
    window.open(
      url,
      "_blank"
    );
  };

  const downloadFile = async (
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

    }

  };

  const currentFiles =
    activeTab === "withMe"
      ? sharedWithMe
      : sharedByMe;

  const filteredFiles =
    currentFiles.filter(
      (file) =>
        file.fileName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  if (loading) {

    return (
      <div className="container py-5">
        <h3>
          Loading Shared Files...
        </h3>
      </div>
    );

  }

  return (

    <div className="container py-5">

      <h1 className="mb-4">
        Shared Files
      </h1>

      <div className="mb-4">

        <button
          className={`btn me-2 ${
            activeTab === "withMe"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() =>
            setActiveTab(
              "withMe"
            )
          }
        >
          Shared With Me (
          {sharedWithMe.length}
          )
        </button>

        <button
          className={`btn ${
            activeTab === "byMe"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() =>
            setActiveTab(
              "byMe"
            )
          }
        >
          Shared By Me (
          {sharedByMe.length}
          )
        </button>

      </div>

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
                {
                  activeTab ===
                  "withMe"
                    ? "Shared On"
                    : "Shared To"
                }
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

                      {
                        activeTab ===
                        "withMe"
                          ? new Date(
                              file.createdAt
                            ).toLocaleDateString()
                          : file.sharedWith?.join(
                              ", "
                            )
                      }

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
                        onClick={() =>
                          viewFile(
                            file.fileUrl
                          )
                        }
                      />

                      <FaDownload
                        className="text-info"
                        style={{
                          cursor:
                            "pointer",
                          fontSize:
                            "18px"
                        }}
                        onClick={() =>
                          downloadFile(
                            file.fileUrl,
                            file.fileName
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

    </div>

  );

}

export default SharedFiles;