
import {  Route, Routes, Navigate } from "react-router";
import { authRoutes, publicRoutes} from "./router.link";
import Feature from "../layouts/feature";
import AuthFeature from "../layouts/authFeature";




const ALLRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Feature />}>
          <Route path="/" element={<Navigate to="/index" replace />} />
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
