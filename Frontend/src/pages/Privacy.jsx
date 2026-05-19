import { useState } from "react";

const privacySections = [
  {
    number: "01",
    title: "Information We Collect",
    icon: "📦",
    color: "#e8f4fd",
    borderColor: "#5aabee",
    content:
      "We collect information you provide directly — including your name, email address, profile photo, payment details, and any content you create. We also automatically collect usage data such as pages visited, search queries, device type, IP address, and browser information to help us improve your experience.",
    bullets: ["Name & contact details", "Payment information (encrypted)", "Browsing & search activity", "Device & location data"],
  },
  {
    number: "02",
    title: "How We Use Your Data",
    icon: "⚙️",
    color: "#f0fdf4",
    borderColor: "#4ade80",
    content:
      "Your data powers the Wanderlust experience. We use it to process bookings, personalise destination recommendations, send important service notifications, detect fraud, and improve our platform. We do not sell your personal information to third parties.",
    bullets: ["Process & manage bookings", "Personalise your feed", "Send transactional emails", "Fraud detection & security"],
  },
  {
    number: "03",
    title: "Sharing & Disclosure",
    icon: "🔗",
    color: "#fff7ed",
    borderColor: "#fb923c",
    content:
      "We share your information only with trusted service providers (payment processors, cloud hosts) under strict data processing agreements. We may also disclose information when legally required, such as in response to a court order or regulatory investigation.",
    bullets: ["Payment processors (Stripe, Razorpay)", "Cloud infrastructure (AWS)", "Legal compliance requests", "Aggregated, anonymised analytics"],
  },
  {
    number: "04",
    title: "Cookies & Tracking",
    icon: "🍪",
    color: "#fdf4ff",
    borderColor: "#c084fc",
    content:
      "We use essential cookies for session management and optional analytics cookies to understand how you navigate Wanderlust. You can manage your cookie preferences at any time through our Cookie Settings centre, accessible from the footer.",
    bullets: ["Essential session cookies", "Analytics (opt-out available)", "Preference & language cookies", "No third-party ad trackers"],
  },
  {
    number: "05",
    title: "Data Security",
    icon: "🔒",
    color: "#f0fdf4",
    borderColor: "#22c55e",
    content:
      "We employ industry-standard safeguards: AES-256 encryption at rest, TLS 1.3 in transit, regular penetration testing, and strict internal access controls. While no system is completely immune, we are committed to responding swiftly to any security incidents.",
    bullets: ["AES-256 data encryption", "TLS 1.3 transmission security", "Biannual penetration testing", "Minimal access privilege model"],
  },
  {
    number: "06",
    title: "Your Rights",
    icon: "✋",
    color: "#eff6ff",
    borderColor: "#3b82f6",
    content:
      "You have the right to access, correct, or delete your personal data at any time. You may also request data portability, withdraw consent for optional processing, or lodge a complaint with your local data protection authority. Submit requests via your account settings or email us at privacy@wanderlust.com.",
    bullets: ["Access & download your data", "Correct inaccurate information", "Request account deletion", "Withdraw marketing consent"],
  },
  {
    number: "07",
    title: "Data Retention",
    icon: "🗓️",
    color: "#fff7ed",
    borderColor: "#f59e0b",
    content:
      "We retain your account data for as long as your account is active, plus a short period thereafter as required by law. Booking records are kept for 7 years to meet financial reporting obligations. Anonymised analytics data may be retained indefinitely.",
    bullets: ["Active account data: retained while active", "Booking records: 7 years", "Marketing data: until opt-out", "Anonymised analytics: indefinite"],
  },
  {
    number: "08",
    title: "Policy Updates",
    icon: "📣",
    color: "#fdf2f8",
    borderColor: "#ec4899",
    content:
      "We will notify you of significant changes to this Privacy Policy via email and an in-app banner at least 14 days before the changes take effect. The 'Last Updated' date at the top of this page always reflects the most recent revision.",
    bullets: ["14-day advance email notice", "In-app notification banner", "Version history available on request", "Continued use = acceptance"],
  },
];

export default function Privacy() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#fafaf8" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1a2d45 60%, #1e3554 100%)",
        padding: "80px 24px 64px",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative rings */}
        {[300, 220, 140].map((size, i) => (
          <div key={i} style={{
            position: "absolute", right: `-${60 - i * 30}px`, top: `-${60 - i * 30}px`,
            width: `${size}px`, height: `${size}px`, borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative" }}>
          {/* logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "48px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#e8284a", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "16px",
            }}>✦</div>
            <span style={{ color: "#fff", fontFamily: "'Arial', sans-serif", fontWeight: "700", fontSize: "20px", letterSpacing: "-0.5px" }}>
              wanderlust
            </span>
          </div>

          <div style={{
            display: "inline-block", background: "rgba(90,171,238,0.12)",
            border: "1px solid rgba(90,171,238,0.3)", borderRadius: "100px",
            padding: "6px 16px", marginBottom: "20px",
          }}>
            <span style={{ color: "#7ec8f5", fontFamily: "Arial, sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Legal · Privacy Policy
            </span>
          </div>

          <h1 style={{
            color: "#fff", fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: "400", margin: "0 0 20px",
            lineHeight: "1.1", letterSpacing: "-1px",
          }}>
            Your Privacy<br />
            <em style={{ color: "#7ec8f5", fontStyle: "italic" }}>Matters</em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "16px",
            fontFamily: "Arial, sans-serif", margin: "0",
            lineHeight: "1.7", maxWidth: "480px",
          }}>
            Last updated <strong style={{ color: "rgba(255,255,255,0.8)" }}>January 15, 2025</strong> · We believe in transparency.
            Here's exactly how Wanderlust handles your personal data.
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "40px" }}>
            {["🔒 Encrypted", "🚫 Never Sold", "✋ Your Control", "🌍 GDPR Compliant"].map(badge => (
              <div key={badge} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "100px", padding: "6px 14px",
                color: "rgba(255,255,255,0.75)", fontFamily: "Arial, sans-serif",
                fontSize: "12px",
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Nav ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #ebebeb",
        padding: "0 24px", overflowX: "auto",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex" }}>
          {privacySections.map((s) => (
            <a
              key={s.number}
              href={`#privacy-${s.number}`}
              style={{
                display: "block", padding: "14px 16px",
                color: "#888", fontSize: "12px", fontFamily: "Arial, sans-serif",
                letterSpacing: "0.5px", textDecoration: "none",
                whiteSpace: "nowrap", borderBottom: "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.target.style.color = "#3b82f6"; e.target.style.borderBottomColor = "#3b82f6"; }}
              onMouseLeave={e => { e.target.style.color = "#888"; e.target.style.borderBottomColor = "transparent"; }}
            >
              {s.number}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 24px 100px" }}>

        {/* Intro callout */}
        <div style={{
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderLeft: "4px solid #3b82f6", borderRadius: "0 12px 12px 0",
          padding: "20px 24px", marginBottom: "56px",
        }}>
          <p style={{
            margin: 0, fontFamily: "Arial, sans-serif",
            color: "#1e40af", fontSize: "14px", lineHeight: "1.7",
          }}>
            <strong>Wanderlust does not sell your personal data.</strong> We only collect what we need
            to provide a great travel experience, and you remain in control of your information at all times.
            Questions? Email <a href="mailto:privacy@wanderlust.com" style={{ color: "#1d4ed8" }}>privacy@wanderlust.com</a>.
          </p>
        </div>

        {/* Sections as accordion cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {privacySections.map((section, i) => (
            <div
              key={section.number}
              id={`privacy-${section.number}`}
              onClick={() => setOpenSection(openSection === i ? null : i)}
              style={{
                background: "#fff",
                border: `1px solid ${openSection === i ? section.borderColor : "#ebebeb"}`,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "border-color 0.3s, box-shadow 0.3s",
                boxShadow: openSection === i ? `0 4px 20px ${section.borderColor}22` : "none",
              }}
            >
              {/* Card header */}
              <div style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "20px 24px",
                background: openSection === i ? section.color : "#fff",
                transition: "background 0.3s",
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "12px",
                  background: openSection === i ? "rgba(0,0,0,0.06)" : "#f5f5f5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", flexShrink: 0, transition: "background 0.3s",
                }}>
                  {section.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{
                      fontFamily: "Arial, sans-serif", fontSize: "11px",
                      color: "#bbb", letterSpacing: "1.5px",
                    }}>
                      {section.number}
                    </span>
                    <h2 style={{
                      margin: 0, fontSize: "17px", fontWeight: "400",
                      color: "#1a1a1a", fontFamily: "Georgia, serif",
                    }}>
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: openSection === i ? section.borderColor : "#f0f0f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: openSection === i ? "#fff" : "#999",
                  fontSize: "14px", flexShrink: 0,
                  transition: "all 0.3s",
                  transform: openSection === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                  +
                </div>
              </div>

              {/* Expanded content */}
              {openSection === i && (
                <div style={{ padding: "0 24px 24px" }}>
                  <p style={{
                    fontFamily: "Arial, sans-serif", color: "#555",
                    fontSize: "15px", lineHeight: "1.8",
                    margin: "0 0 20px", paddingTop: "4px",
                  }}>
                    {section.content}
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "8px",
                  }}>
                    {section.bullets.map(bullet => (
                      <div key={bullet} style={{
                        display: "flex", alignItems: "center", gap: "8px",
                        background: section.color,
                        border: `1px solid ${section.borderColor}44`,
                        borderRadius: "8px", padding: "8px 12px",
                      }}>
                        <span style={{ color: section.borderColor, fontSize: "12px", flexShrink: 0 }}>✓</span>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", color: "#444" }}>
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: "64px", padding: "48px",
          background: "linear-gradient(135deg, #0d1b2a, #1a2d45)",
          borderRadius: "20px", textAlign: "center",
        }}>
          <span style={{ fontSize: "36px" }}>🛡️</span>
          <h3 style={{
            color: "#fff", fontFamily: "Georgia, serif",
            fontSize: "24px", fontWeight: "400", margin: "16px 0 12px",
          }}>
            We take privacy seriously.
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontFamily: "Arial, sans-serif",
            fontSize: "14px", margin: "0 0 24px", lineHeight: "1.7",
          }}>
            Submit a data request, opt out, or just ask us anything.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="mailto:privacy@wanderlust.com" style={{
              display: "inline-block",
              background: "#3b82f6", color: "#fff",
              padding: "12px 28px", borderRadius: "100px",
              textDecoration: "none", fontFamily: "Arial, sans-serif",
              fontSize: "14px", fontWeight: "600",
            }}>
              Contact privacy@wanderlust.com
            </a>
            <a href="/terms" style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.75)",
              padding: "12px 28px", borderRadius: "100px",
              textDecoration: "none", fontFamily: "Arial, sans-serif",
              fontSize: "14px",
            }}>
              Read Terms of Service →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}