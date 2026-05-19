export default function Privacy() {
  return (
    <div className="container mt-5 mb-5">

      <div className="p-4 p-md-5 shadow-sm rounded-4 bg-white">

        {/* HEADER */}
        <h2 className="fw-bold mb-3">Privacy Policy</h2>
        <p className="text-muted mb-4">
          At Wanderlust, we respect your privacy and are committed to protecting your personal information.
        </p>

        {/* SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">1. Information We Collect</h5>
          <p className="text-muted">
            We collect information such as your name, email, and listing details when you use our platform.
          </p>
        </div>

        {/* SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">2. How We Use Your Information</h5>
          <p className="text-muted">
            Your data is used to provide and improve our services, personalize your experience, and ensure platform security.
          </p>
        </div>

        {/* SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">3. Data Protection</h5>
          <p className="text-muted">
            We implement security measures to protect your data. However, no system is completely secure.
          </p>
        </div>

        {/* SECTION */}
        <div className="mb-4">
          <h5 className="fw-semibold">4. Third-Party Services</h5>
          <p className="text-muted">
            We may use services like Mapbox and Cloudinary to enhance functionality.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h5 className="fw-semibold">5. Changes</h5>
          <p className="text-muted">
            We may update this policy at any time. Continued use means you accept the changes.
          </p>
        </div>

      </div>
    </div>
  );
}