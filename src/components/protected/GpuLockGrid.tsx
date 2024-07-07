import React from "react";
import "./GpuLockGrid.css";
import useGpuLockStatus from "../../hooks/useGpuLockStatus";
import LoginLogoutButton from "../LoginLogoutButton";
import Loading from "../Loading";

const GpuLockGrid: React.FC = () => {
  const { data, loading } = useGpuLockStatus();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="title">
        <LoginLogoutButton />
      </div>
      <h1 className="title">Protected GPU Lock Dashboard</h1>
      <div className="grid">
        {Object.keys(data).map((key) => {
          const gpuData = data[key];
          return (
            <div
              className={`status-card ${
                gpuData.ModelInUse !== "" ? "locked" : "free"
              }`}
              key={key}
            >
              <h2>{key}</h2>
              <p>
                {gpuData.ModelInUse !== ""
                  ? `Locked by ${gpuData.ModelInUse}`
                  : "Free"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GpuLockGrid;