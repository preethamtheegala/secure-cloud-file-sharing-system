import { Link } from "react-router-dom";
import { FaLock, FaCloudUploadAlt, FaUserShield } from "react-icons/fa";

function Home() {
  return (
    <>
      <div className="container hero">

        <div className="row align-items-center">

          <div className="col-lg-6">

            <h1 className="hero-title">
              Secure Cloud
              <br />
              Storage
            </h1>

            <p className="hero-subtitle">
              Store, encrypt and share your files with
              enterprise-grade cybersecurity protection,
              end-to-end encryption and secure cloud access.
            </p>

            <Link
              to="/dashboard"
              className="btn glow-btn"
            >
              Launch Dashboard
            </Link>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
              alt=""
              className="img-fluid cyber-image"
            />

          </div>

        </div>

      </div>

      <div className="container py-5">

        <h2 className="section-title">
          Security Features
        </h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="glass-card text-center">

              <FaLock className="feature-icon"/>

              <h3 className="feature-title">
                AES Encryption
              </h3>

              <p className="feature-desc">
                Military-grade AES encryption secures every file.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">

              <FaCloudUploadAlt className="feature-icon"/>

              <h3 className="feature-title">
                Secure Storage
              </h3>

              <p className="feature-desc">
                Protected cloud infrastructure with secure sharing.
              </p>

            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card text-center">

              <FaUserShield className="feature-icon"/>

              <h3 className="feature-title">
                Access Control
              </h3>

              <p className="feature-desc">
                Advanced authentication and role-based access.
              </p>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Home;