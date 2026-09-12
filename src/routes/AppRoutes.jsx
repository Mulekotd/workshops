import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

const DockerWorkshop = lazy(() => import("../pages/Docker"));
const GitWorkshop = lazy(() => import("../pages/Git"));
const ReactWorkshop = lazy(() => import("../pages/React"));

function Loading() {
  return (
    <main className="loading-page">Carregando workshop&hellip;</main>
  );
}

function WorkshopRoute({ Workshop }) {
  return (
    <Suspense fallback={<Loading />}>
      <Workshop />
    </Suspense>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docker/*" element={<WorkshopRoute Workshop={DockerWorkshop} />} />
      <Route path="/git/*" element={<WorkshopRoute Workshop={GitWorkshop} />} />
      <Route path="/react/*" element={<WorkshopRoute Workshop={ReactWorkshop} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
