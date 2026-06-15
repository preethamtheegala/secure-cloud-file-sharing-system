import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaShieldAlt,
  FaLock,
  FaEdit,
  FaCamera
} from "react-icons/fa";
import api from "../services/api";

function Profile() {

  const [user, setUser] =
    useState(null);

  const [name, setName] =
    useState("");

  const [currentPassword,
    setCurrentPassword] =
    useState("");

  const [newPassword,
    setNewPassword] =
    useState("");

  const [image,
    setImage] =
    useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setUser(res.data);
        setName(
          res.data.name
        );

      } catch (error) {

        console.log(error);

      }

    };

  const updateName =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(
          "/profile/update",
          { name },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Profile Updated"
        );

        fetchProfile();

      } catch (error) {

        console.log(error);

      }

    };

  const changePassword =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(
          "/profile/change-password",
          {
            currentPassword,
            newPassword
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Password Changed Successfully"
        );

        setCurrentPassword(
          ""
        );

        setNewPassword(
          ""
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message
        );

      }

    };

  const uploadPhoto =
    async () => {

      try {

        if (!image) return;

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        await api.put(
          "/profile/upload-photo",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Photo Uploaded Successfully"
        );

        fetchProfile();

      } catch (error) {

        console.log(error);

      }

    };

  if (!user) {

    return (
      <div className="container py-5">
        <h3>
          Loading Profile...
        </h3>
      </div>
    );

  }

  return (

    <div className="container py-5">

      <div className="glass-card text-center">

        {
          user.profileImage
          ? (
            <img
              src={
                user.profileImage
              }
              alt="Profile"
              style={{
                width: "150px",
                height:
                  "150px",
                borderRadius:
                  "50%",
                objectFit:
                  "cover"
              }}
            />
          )
          : (
            <FaUserCircle
              size={150}
              color="#00e5ff"
            />
          )
        }

        <div className="mt-3">

          <input
            type="file"
            className="form-control"
            onChange={
              (e) =>
                setImage(
                  e.target
                    .files[0]
                )
            }
          />

          <button
            className="btn btn-primary mt-2"
            onClick={
              uploadPhoto
            }
          >
            <FaCamera />
            {" "}
            Upload Photo
          </button>

        </div>

        <h2 className="mt-4">
          {user.name}
        </h2>

        <p className="text-secondary">
          {user.email}
        </p>

        <div className="row mt-4">

          <div className="col-md-6">

            <div className="glass-card">

              <h4>
                Edit Name
              </h4>

              <input
                type="text"
                className="form-control my-3"
                value={name}
                onChange={
                  (e) =>
                    setName(
                      e.target
                        .value
                    )
                }
              />

              <button
                className="btn btn-success"
                onClick={
                  updateName
                }
              >
                <FaEdit />
                {" "}
                Save
              </button>

            </div>

          </div>

          <div className="col-md-6">

            <div className="glass-card">

              <h4>
                Change Password
              </h4>

              <input
                type="password"
                placeholder="Current Password"
                className="form-control mb-2"
                value={
                  currentPassword
                }
                onChange={
                  (e) =>
                    setCurrentPassword(
                      e.target
                        .value
                    )
                }
              />

              <input
                type="password"
                placeholder="New Password"
                className="form-control mb-2"
                value={
                  newPassword
                }
                onChange={
                  (e) =>
                    setNewPassword(
                      e.target
                        .value
                    )
                }
              />

              <button
                className="btn btn-warning"
                onClick={
                  changePassword
                }
              >
                Change Password
              </button>

            </div>

          </div>

        </div>

        <div className="row mt-5">

          <div className="col-md-3">
            <div className="glass-card">
              <h4>Total Files</h4>
              <h2>
                {
                  user.totalFiles
                }
              </h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="glass-card">
              <h4>Shared Files</h4>
              <h2>
                {
                  user.sharedFiles
                }
              </h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="glass-card">
              <h4>
                Storage Used
              </h4>
              <h2>
                {(
                  user.storageUsed /
                  (
                    1024 *
                    1024
                  )
                ).toFixed(2)}
                MB
              </h2>
            </div>
          </div>

          <div className="col-md-3">
            <div className="glass-card">
              <h4>
                Member Since
              </h4>
              <h6>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </h6>
            </div>
          </div>

        </div>

        <div className="row mt-5">

          <div className="col-md-6">

            <div className="glass-card">

              <FaShieldAlt
                size={40}
                color="#00ff9d"
              />

              <h4 className="mt-3">
                Account Status
              </h4>

              <h2>
                Active
              </h2>

            </div>

          </div>

          <div className="col-md-6">

            <div className="glass-card">

              <FaLock
                size={40}
                color="#8b5cf6"
              />

              <h4 className="mt-3">
                Encryption
              </h4>

              <h2>
                AES-256
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;