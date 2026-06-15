import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Profile() {

  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (error) {

        console.log(error);

      }
    };
    fetchProfile();
  }, [token]);

  return (

    <div >
        <div className="page-container">
   
   <br></br>
    <center>
          <h1 className="page-title">
    👤 Profile
  </h1>
    </center>
</div>
      {
        user && (

          <div className="profile-card">
            <div className="profile-avatar">👤 </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button className="edit-profile-btn">
  Edit Profile
</button>
         <hr />
       <div className="member-since">
  Member Since June 2026
</div>
        </div>

        )
}
    </div>
  );
}

export default Profile;