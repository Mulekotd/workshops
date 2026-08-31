import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const DockerWorkshop = lazy(() => import("../pages/Docker"));

function Loading() {
  return <main className="loading-page">Carregando workshop…</main>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/docker/*"
        element={
          <Suspense fallback={<Loading />}>
            <DockerWorkshop />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
