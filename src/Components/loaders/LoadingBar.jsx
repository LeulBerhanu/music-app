import LoaderBars from "./LoaderBars";
import styled from "@emotion/styled";

const Loading = styled.div`
  padding: 20px;
`;

function LoadingBar() {
  return (
    <Loading>
      <LoaderBars />
    </Loading>
  );
}

export default LoadingBar;
