import {
FaUserCircle,
FaShieldAlt,
FaLock
} from "react-icons/fa";

function Profile() {
  return (
    <div className="container py-5">

      <div className="glass-card text-center">

        <FaUserCircle
          size={140}
          color="#00e5ff"
        />

        <h2 className="mt-4">
          Secure User
        </h2>

        <p className="text-secondary">
          secureuser@gmail.com
        </p>

        <div className="row mt-5">

          <div className="col-md-6">

            <div className="glass-card">

              <FaShieldAlt
                size={40}
                color="#00ff9d"
              />

              <h4 className="mt-3">
                Security Score
              </h4>

              <h2>
                99%
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

        <button className="btn glow-btn mt-5">
          Update Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;