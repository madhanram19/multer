import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useRegisterSingledataQuery } from '../../redux/services/adminAPI';

const Singleview = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isLoading } = useRegisterSingledataQuery(params.id);

  const handleKycAccess = async () => {
    try {
         await (params.id, 'approved');
    //   navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKycDenied = async () => {
    try {
           await (params.id, 'rejected');
    //   navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="singleviewcon">
      <div className="container">
        <div className="row row-cols-sm-12 row-cols-md-3">
          <div className="col">
            <div className="card" style={{ height: "300px", padding: "10px", margin: "10px", width: "400px" }}>
              <div className="card-body" style={{ backgroundColor: "lavender", width: "auto", height: "200px", overflow: "auto" }}>
                <h6>Id: {data.data._id}</h6>
                <h6>Email Id: {data.data.email}</h6>
                <h6>User Name: {data.data.username}</h6>
                <h6>createdAt: {data.data.createdAt}</h6>

                <div className="kyc-actions">
                  <button className="btn btn-success" onClick={handleKycAccess}>Kyc Access</button>
                  <button className="btn btn-danger" onClick={handleKycDenied}>Kyc Denied</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-ghost-primary" type="button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Singleview;