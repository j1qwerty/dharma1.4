import React from "react";
import { Navigate, useParams } from "react-router-dom";

export default function BookingDelivery() {
  const { id } = useParams();
  return <Navigate to={`/booking/${id}/payment`} replace />;
}
