import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingShow from "./pages/ListingShow";
import ListingNew from "./pages/ListingNew";
import ListingEdit from "./pages/ListingEdit";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/listings/new" element={<ListingNew />} />
          <Route path="/listings/:id" element={<ListingShow />} />
          <Route path="/listings/:id/edit" element={<ListingEdit />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ NEW PAGES */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;