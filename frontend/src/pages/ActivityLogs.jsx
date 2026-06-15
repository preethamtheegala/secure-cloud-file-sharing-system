import {
FaUpload,
FaDownload,
FaShareAlt,
FaShieldAlt
} from "react-icons/fa";

function ActivityLogs() {
  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Security Activity Timeline
      </h1>

      <div className="glass-card">

        <div className="mb-4">

          <FaUpload
            className="text-info me-3"
          />

          Uploaded report.pdf

          <small className="ms-3 text-secondary">
            10:30 AM
          </small>

        </div>

        <div className="mb-4">

          <FaShareAlt
            className="text-warning me-3"
          />

          Shared report.pdf

          <small className="ms-3 text-secondary">
            11:00 AM
          </small>

        </div>

        <div className="mb-4">

          <FaDownload
            className="text-success me-3"
          />

          Downloaded invoice.pdf

          <small className="ms-3 text-secondary">
            11:45 AM
          </small>

        </div>

        <div>

          <FaShieldAlt
            className="text-primary me-3"
          />

          Security scan completed

          <small className="ms-3 text-secondary">
            12:10 PM
          </small>

        </div>

      </div>

    </div>
  );
}

export default ActivityLogs;