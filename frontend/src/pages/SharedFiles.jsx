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

  const [showManageModal, setShowManageModal] =
  useState(false);
  
  const [selectedFile, setSelectedFile] =
  useState(null);

  const [selectedEmail, setSelectedEmail] =
  useState("");

  const [permission, setPermission] =
  useState("view");

  const [days, setDays] =
  useState(7);

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
        return <FaFilePdf className="me-2 text-danger" />;

      case "doc":
      case "docx":
        return <FaFileWord className="me-2 text-primary" />;

      case "xls":
      case "xlsx":
        return <FaFileExcel className="me-2 text-success" />;

      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="me-2 text-warning" />;

      case "zip":
      case "rar":
        return <FaFileArchive className="me-2 text-secondary" />;

      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <FaFileImage className="me-2 text-info" />;

      default:
        return <FaFile className="me-2" />;

    }

  };

  const viewFile = (
    url
  ) => {

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

  const openManageModal = (
  file,
  shareUser
) => {

  setSelectedFile(file);

  setSelectedEmail(
    shareUser.email
  );

  setPermission(
    shareUser.permission
  );

  setShowManageModal(true);

};

const updateAccess =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.put(
        `/files/update-share/${selectedFile._id}`,
        {
          email:
            selectedEmail,
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
        "Access Updated"
      );

      await fetchData();

      setShowManageModal(false);

    } catch (error) {

      console.log(error);

    }

};

const revokeAccess =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.put(
        `/files/remove-share/${selectedFile._id}`,
        {
          email:
            selectedEmail
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Access Revoked"
      );

      await fetchData();

      setShowManageModal(false);

    } catch (error) {

      console.log(error);

    }

};



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
            setActiveTab("withMe")
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
            setActiveTab("byMe")
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
                Permission
              </th>

              <th>
                Expiry
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
                  colSpan="5"
                  className="text-center"
                >
                  No Files Found
                </td>

              </tr>

            ) : (

              filteredFiles.map(
                (file) => {

                  const share =
                    file.sharedWith?.find(
                      (user) =>
                        user.email ===
                        localStorage.getItem(
                          "email"
                        )
                    );

                  return (

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

  {activeTab === "byMe"
    ? file.sharedWith?.[0]
        ?.permission || "-"
    : share?.permission ||
      "-"}

</td>

 <td>

  {activeTab === "byMe"
    ? (
        file.sharedWith &&
        file.sharedWith.length > 0 &&
        file.sharedWith[0].expiresAt
      )
      ? new Date(
          file.sharedWith[0].expiresAt
        ).toLocaleDateString()
      : "-"
    : share?.expiresAt
      ? new Date(
          share.expiresAt
        ).toLocaleDateString()
      : "-"}

</td>

                      <td>

  <FaEye
    className="me-4 text-success"
    style={{
      cursor: "pointer",
      fontSize: "18px"
    }}
    onClick={() =>
      viewFile(
        file.fileUrl
      )
    }
  />

  {(share?.permission ===
    "download" ||
    activeTab ===
      "byMe") && (

    <FaDownload
      className="text-info"
      style={{
        cursor: "pointer",
        fontSize: "18px"
      }}
      onClick={() =>
        downloadFile(
          file.fileUrl,
          file.fileName
        )
      }
    />

  )}

  {activeTab === "byMe" &&
    file.sharedWith?.length > 0 && (

    <button
      className="btn btn-warning btn-sm ms-3"
      onClick={() =>
        openManageModal(
          file,
          file.sharedWith[0]
        )
      }
    >
      Manage
    </button>

  )}

</td>

                    </tr>

                  );

                }
              )

            )}

          </tbody>

        </table>

      </div>

      {showManageModal && (

<div
  className="modal d-block"
  tabIndex="-1"
>

  <div className="modal-dialog">

    <div className="modal-content">

      <div className="modal-header">

        <h5>
          Manage Access
        </h5>

        <button
          className="btn-close"
          onClick={() =>
            setShowManageModal(false)
          }
        />

      </div>

      <div className="modal-body">

        <input
          className="form-control mb-3"
          value={selectedEmail}
          disabled
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
          onClick={updateAccess}
        >
          Update
        </button>

        <button
          className="btn btn-danger"
          onClick={revokeAccess}
        >
          Revoke
        </button>

      </div>

    </div>

  </div>

</div>

)}

    </div>

  );

}

export default SharedFiles;