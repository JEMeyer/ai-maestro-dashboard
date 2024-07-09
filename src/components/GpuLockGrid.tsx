import React from "react";
import styled from "styled-components";
import useGpuLockStatus from "../hooks/useGpuLockStatus";
import Loading from "./Loading";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StatusCard = styled.div<{ $isLocked: boolean }>`
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  background-color: ${(props) =>
    props.$isLocked ? "lightcoral" : "lightgreen"};
`;

const GpuLockGrid: React.FC = () => {
  const { data } = useGpuLockStatus();

  if (data == null) return <Loading />;

  return (
    <Container>
      <Title>GPU Lock Statuses</Title>
      <Grid>
        {Object.keys(data).map((key) => {
          const gpuData = data[key];
          return (
            <StatusCard $isLocked={gpuData.ModelInUse !== ""} key={key}>
              <h2>{key}</h2>
              <p>
                {gpuData.ModelInUse !== ""
                  ? `Locked by ${gpuData.ModelInUse}`
                  : "Free"}
              </p>
            </StatusCard>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GpuLockGrid;
