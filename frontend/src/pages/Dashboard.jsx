import { Link } from "react-router-dom";
import {
  FaUpload,
  FaFolderOpen,
  FaShareAlt,
  FaUserShield,
  FaHistory
} from "react-icons/fa";
import photo from "../assets/photo.png";

function Dashboard() {

  return (

    <div className="container py-5">

      <div className="glass-card mb-5">

        <div className="row align-items-center">

          <div className="col-lg-7">

            <h1 className="hero-title">
              Secure Cloud File Sharing System
            </h1>

            <p className="hero-subtitle">
              Upload, manage, protect and share files securely through
              encrypted cloud storage with advanced access control and
              monitoring capabilities.
            </p>

          </div>

          <div className="col-lg-5 text-center">

            <img
              src={photo}
              alt="Secure Cloud Storage"
              className="img-fluid cyber-image"
            />

          </div>

        </div>

      </div>

      <div className="row g-4">

        <div className="col-lg-4">

          <Link
            to="/upload"
            className="text-decoration-none text-white"
          >

            <div className="glass-card text-center">

              <FaUpload className="feature-icon" />

              <h4 className="feature-title">
                Upload Files
              </h4>

              <p className="feature-desc">
                Securely upload files to encrypted cloud storage.
              </p>

            </div>

          </Link>

        </div>

        <div className="col-lg-4">

          <Link
            to="/myfiles"
            className="text-decoration-none text-white"
          >

            <div className="glass-card text-center">

              <FaFolderOpen className="feature-icon" />

              <h4 className="feature-title">
                My Files
              </h4>

              <p className="feature-desc">
                Access, manage and organize stored files.
              </p>

            </div>

          </Link>

        </div>

        <div className="col-lg-4">

          <Link
            to="/sharedfiles"
            className="text-decoration-none text-white"
          >

            <div className="glass-card text-center">

              <FaShareAlt className="feature-icon" />

              <h4 className="feature-title">
                Shared Files
              </h4>

              <p className="feature-desc">
                View files shared with other users.
              </p>

            </div>

          </Link>

        </div>

        <div className="col-lg-6">

          <Link
            to="/logs"
            className="text-decoration-none text-white"
          >

            <div className="glass-card text-center">

              <FaHistory className="feature-icon" />

              <h4 className="feature-title">
                Activity Logs
              </h4>

              <p className="feature-desc">
                Monitor recent uploads, downloads and sharing activity.
              </p>

            </div>

          </Link>

        </div>

        <div className="col-lg-6">

          <Link
            to="/profile"
            className="text-decoration-none text-white"
          >

            <div className="glass-card text-center">

              <FaUserShield className="feature-icon" />

              <h4 className="feature-title">
                Profile
              </h4>

              <p className="feature-desc">
                Manage account information and security settings.
              </p>

            </div>

          </Link>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;