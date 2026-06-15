import {
FaFilePdf,
FaDownload,
FaTrash,
FaShareAlt
} from "react-icons/fa";

function MyFiles() {
  return (
    <div className="container py-5">

      <h1 className="mb-4">
        My Secure Files
      </h1>

      <div className="glass-card">

        <table className="table table-dark align-middle">

          <thead>
            <tr>
              <th>File</th>
              <th>Encryption</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>
                <FaFilePdf
                  className="me-2 text-danger"
                />
                project-report.pdf
              </td>

              <td>
                AES-256
              </td>

              <td>

                <FaDownload
                  className="me-4 text-info"
                  style={{cursor:"pointer"}}
                />

                <FaShareAlt
                  className="me-4 text-warning"
                  style={{cursor:"pointer"}}
                />

                <FaTrash
                  className="text-danger"
                  style={{cursor:"pointer"}}
                />

              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default MyFiles;