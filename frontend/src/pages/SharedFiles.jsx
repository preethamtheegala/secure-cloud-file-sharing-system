import {
FaShareAlt,
FaFileAlt
} from "react-icons/fa";

function SharedFiles() {
  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Shared Resources
      </h1>

      <div className="glass-card">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <FaFileAlt
              className="me-3 text-info"
            />

            document.pdf

          </div>

          <div>

            <FaShareAlt
              className="me-2 text-warning"
            />

            Shared by Admin

          </div>

        </div>

      </div>

    </div>
  );
}

export default SharedFiles;