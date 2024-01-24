import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser.js";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { styled } from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [navigate, isAuthenticated, isLoading]
  );
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
