import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLock,
  FaCloudUploadAlt,
  FaUserShield
} from "react-icons/fa";
import api from "../services/api";

function Home() {

  const token =
    localStorage.getItem("token");

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    if (token) {
      fetchStats();
    }

  }, []);

  const fetchStats =
    async () => {

      try {

        const res =
          await api.get(
            "/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

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
              Store, protect and share your files securely using cloud storage with advanced security and access control.
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

      {token && stats && (

        <div className="container mb-5">

          <h2 className="section-title mb-4">
            Welcome Back
          </h2>

          <div className="row g-4">

            <div className="col-md-3">

              <div className="glass-card text-center">

                <h5>
                  Total Files
                </h5>

                <h1>
                  {stats.totalFiles}
                </h1>

              </div>

            </div>

            <div className="col-md-3">

              <div className="glass-card text-center">

                <h5>
                  Shared By Me
                </h5>

                <h1>
                  {stats.sharedByMe}
                </h1>

              </div>

            </div>

            <div className="col-md-3">

              <div className="glass-card text-center">

                <h5>
                  Shared With Me
                </h5>

                <h1>
                  {stats.sharedWithMe}
                </h1>

              </div>

            </div>

            <div className="col-md-3">

              <div className="glass-card text-center">

                <h5>
                  Storage Used
                </h5>

                <h4>

                  {(
                    stats.storageUsed /
                    (
                      1024 *
                      1024
                    )
                  ).toFixed(2)}

                  MB

                </h4>

              </div>

            </div>

          </div>

        </div>

      )}

      {token && stats && (

        <div className="container mb-5">

          <div className="glass-card">

            <h3 className="mb-4">
              Recent Activities
            </h3>

            {
              stats.recentActivities
                ?.length === 0
                ? (
                  <p>
                    No recent activity
                  </p>
                )
                : (
                  stats.recentActivities.map(
                    (
                      activity
                    ) => (

                      <div
                        key={
                          activity._id
                        }
                        className="border-bottom pb-3 mb-3"
                      >

                        <h6>
                          {
                            activity.action
                          }
                        </h6>

                        <small>
                          {
                            activity.fileName
                          }
                        </small>

                        <br />

                        <small className="text-secondary">

                          {
                            new Date(
                              activity.createdAt
                            ).toLocaleString()
                          }

                        </small>

                      </div>

                    )
                  )
                )
            }

          </div>

        </div>

      )}

      <div className="container py-5">

        <h2 className="section-title">
          Security Features
        </h2>

        <div className="row g-4">

          <div className="col-md-4">

            <div className="glass-card text-center">

              <FaLock className="feature-icon" />

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

              <FaCloudUploadAlt className="feature-icon" />

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

              <FaUserShield className="feature-icon" />

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