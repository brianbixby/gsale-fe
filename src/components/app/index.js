import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Navbar = lazy(() => import("../navbar"));
const Home = lazy(() => import("../home"));
const Profile = lazy(() => import("../profile"));
const GarageSaleEvent = lazy(() => import("../garageSaleEvent"));
const GarageSaleEventFormContainer = lazy(() =>
  import("../garageSaleEventFormContainer")
);
const VendorFormContainer = lazy(() => import("../vendorFormContainer"));
const NotFound = lazy(() => import("../notFound"));
const Footer = lazy(() => import("../footer"));

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/garagesale/:garageSaleEventId"
            element={<GarageSaleEvent />}
          />
          <Route path="/create" element={<GarageSaleEventFormContainer />} />

          <Route
            path="/gsale/:garageSaleEventId/updatevendor/:vendorId"
            element={<VendorFormContainer />}
          />
          <Route
            path="/gsale/:garageSaleEventId/addvendor"
            element={<VendorFormContainer />}
          />
          <Route
            path="/gsale/:garageSaleEventId"
            element={<GarageSaleEventFormContainer />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
