import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

export const ProtectedRoute = ({ element }) => {
  const location = useLocation();

  return ApiService.isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const MerchantRoute = ({ element }) => {
  const location = useLocation();

  return ApiService.isMerchant() ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
