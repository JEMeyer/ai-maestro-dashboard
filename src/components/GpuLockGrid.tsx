import React, { useEffect } from "react";
import styled from "styled-components";
import useGpuLockStatus from "../hooks/useGpuLockStatus";
import { useSetIsBusy } from "../state/app";
import moment from "moment";

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
  const setIsBusy = useSetIsBusy();

  useEffect(() => {
    if (data == null) {
      setIsBusy(true);
    } else {
      setIsBusy(false);
    }
  }, [data, setIsBusy]);

  if (data == null) return <></>;

  return (
    <Container>
      <Title>GPU Lock Statuses</Title>
      <Grid>
        {Object.keys(data).map((key) => {
          const gpuData = data[key];
          return (
            <StatusCard $isLocked={gpuData.IsLocked} key={key}>
              <h2>GPU {key}</h2>
              <p>
                {gpuData.IsLocked
                  ? `Locked by ${gpuData.CurrentModel}`
                  : "Free"}
              </p>

              <p>
                {gpuData.LastActivity
                  ? moment(gpuData.LastActivity).fromNow()
                  : ""}
              </p>
            </StatusCard>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GpuLockGrid;
