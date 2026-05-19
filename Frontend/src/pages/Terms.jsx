import { useState } from "react";

const sections = [
  {
    number: "01",
    title: "Use of Platform",
    icon: "🧭",
    content:
      "You agree to use Wanderlust responsibly, in accordance with all applicable laws and regulations. The platform is intended solely for legitimate travel discovery, bookings, and community interaction. Any attempt to exploit, reverse-engineer, or misuse our services will result in immediate account termination.",
  },
  {
    number: "02",
    title: "User Content",
    icon: "✍️",
    content:
      "You retain ownership of the content you post — listings, reviews, photos, and messages. By submitting content, you grant Wanderlust a non-exclusive, royalty-free license to display it on our platform. You are solely responsible for ensuring your content is accurate, lawful, and does not infringe on the rights of others.",
  },
  {
    number: "03",
    title: "Account Responsibility",
    icon: "🔐",
    content:
      "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. Please notify us immediately at support@wanderlust.com if you suspect unauthorized access. Wanderlust cannot be held liable for losses arising from compromised credentials.",
  },
  {
    number: "04",
    title: "Prohibited Activities",
    icon: "🚫",
    content:
      "The following are strictly prohibited: illegal activity of any kind, spamming or unsolicited communications, impersonating others, scraping or data mining our platform, posting fraudulent listings, and any behavior intended to harm users or the integrity of our community.",
  },
  {
    number: "05",
    title: "Limitation of Liability",
    icon: "⚖️",
    content:
      "Wanderlust provides its platform on an 'as-is' basis. We are not liable for user-generated content, third-party service failures, travel disruptions, or any indirect, incidental, or consequential damages. Our aggregate liability shall not exceed the amount you paid us in the preceding 12 months.",
  },
  {
    number: "06",
    title: "Changes to Terms",
    icon: "📋",
    content:
      "We reserve the right to update these Terms at any time. Material changes will be communicated via email or an in-app notification at least 14 days before taking effect. Your continued use of the platform after the effective date constitutes acceptance of the revised Terms.",
  },
  {
    number: "07",
    title: "Governing Law",
    icon: "🌍",
    content:
      "These Terms are governed by the laws of the jurisdiction in which Wanderlust is incorporated, without regard to conflict of law provisions. Any disputes shall be resolved through binding arbitration, except where prohibited by local law.",
  },
  {
    number: "08",
    title: "Contact Us",
    icon: "💬",
    content:
      "For any questions about these Terms, reach our legal team at legal@wanderlust.com. We aim to respond within 5 business days. Our mailing address is available upon request.",
  },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#fafaf8" }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2a1e 60%, #3b3020 100%)",
        padding: "80px 24px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative compass rose */}
        <div style={{
          position: "absolute", right: "-60px", top: "-60px",
          width: "320px", height: "320px", borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: "-20px", top: "-20px",
          width: "220px", height: "220px", borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.07)",
          pointerEvents: "none",
        }} />

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
            display: "inline-block", background: "rgba(232,40,74,0.15)",
            border: "1px solid rgba(232,40,74,0.35)", borderRadius: "100px",
            padding: "6px 16px", marginBottom: "20px",
          }}>
            <span style={{ color: "#f07a8e", fontFamily: "Arial, sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Legal · Terms of Service
            </span>
          </div>

          <h1 style={{
            color: "#fff", fontSize: "clamp(36px, 5vw, 58px)",
            fontWeight: "400", margin: "0 0 20px",
            lineHeight: "1.1", letterSpacing: "-1px",
          }}>
            Terms of<br />
            <em style={{ color: "#e8c98a", fontStyle: "italic" }}>Service</em>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.55)", fontSize: "16px",
            fontFamily: "Arial, sans-serif", margin: "0",
            lineHeight: "1.7", maxWidth: "480px",
          }}>
            Last updated <strong style={{ color: "rgba(255,255,255,0.8)" }}>January 15, 2025</strong> · Effective immediately for new users.
            Please read these terms carefully before using Wanderlust.
          </p>
        </div>
      </div>

      {/* ── Quick Nav Strip ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #ebebeb",
        padding: "0 24px", overflowX: "auto",
      }}>
        <div style={{
          maxWidth: "860px", margin: "0 auto",
          display: "flex", gap: "0",
        }}>
          {sections.map((s) => (
            <a
              key={s.number}
              href={`#section-${s.number}`}
              style={{
                display: "block", padding: "14px 16px",
                color: "#888", fontSize: "12px",
                fontFamily: "Arial, sans-serif", letterSpacing: "0.5px",
                textDecoration: "none", whiteSpace: "nowrap",
                borderBottom: "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => { e.target.style.color = "#e8284a"; e.target.style.borderBottomColor = "#e8284a"; }}
              onMouseLeave={e => { e.target.style.color = "#888"; e.target.style.borderBottomColor = "transparent"; }}
            >
              {s.number}. {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 24px 100px" }}>

        {/* Intro callout */}
        <div style={{
          background: "#fff8f0", border: "1px solid #fddcb5",
          borderLeft: "4px solid #e8a44a", borderRadius: "0 12px 12px 0",
          padding: "20px 24px", marginBottom: "56px",
        }}>
          <p style={{
            margin: 0, fontFamily: "Arial, sans-serif",
            color: "#6b4f20", fontSize: "14px", lineHeight: "1.7",
          }}>
            <strong>By accessing or using Wanderlust</strong>, you confirm you are at least 18 years old
            and agree to be bound by these Terms of Service and our{" "}
            <a href="/privacy" style={{ color: "#e8284a", textDecoration: "underline" }}>Privacy Policy</a>.
            If you disagree with any part, please discontinue use immediately.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div
            key={section.number}
            id={`section-${section.number}`}
            onClick={() => setActiveSection(activeSection === i ? null : i)}
            style={{
              display: "flex", gap: "32px", alignItems: "flex-start",
              padding: "36px 0",
              borderBottom: i < sections.length - 1 ? "1px solid #ebebeb" : "none",
              cursor: "pointer",
            }}
          >
            {/* Number column */}
            <div style={{ flexShrink: 0, width: "56px", textAlign: "right", paddingTop: "4px" }}>
              <span style={{
                fontFamily: "Georgia, serif", fontSize: "13px",
                color: "#ccc", letterSpacing: "1px",
              }}>
                {section.number}
              </span>
            </div>

            {/* Divider line */}
            <div style={{
              flexShrink: 0, width: "1px",
              background: activeSection === i ? "#e8284a" : "#e0e0e0",
              alignSelf: "stretch", minHeight: "60px",
              transition: "background 0.3s",
            }} />

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span style={{ fontSize: "22px" }}>{section.icon}</span>
                <h2 style={{
                  margin: 0, fontSize: "20px", fontWeight: "400",
                  color: "#1a1a1a", fontFamily: "Georgia, serif",
                  letterSpacing: "-0.3px",
                }}>
                  {section.title}
                </h2>
                <span style={{
                  marginLeft: "auto", fontSize: "16px",
                  color: "#bbb", transform: activeSection === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.3s", flexShrink: 0,
                }}>✦</span>
              </div>
              <p style={{
                margin: 0, fontFamily: "Arial, sans-serif",
                color: "#555", fontSize: "15px", lineHeight: "1.8",
                maxHeight: activeSection === i ? "200px" : "60px",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
                maskImage: activeSection === i
                  ? "none"
                  : "linear-gradient(to bottom, black 40%, transparent 100%)",
                WebkitMaskImage: activeSection === i
                  ? "none"
                  : "linear-gradient(to bottom, black 40%, transparent 100%)",
              }}>
                {section.content}
              </p>
              {activeSection !== i && (
                <button
                  style={{
                    marginTop: "8px", background: "none", border: "none",
                    color: "#e8284a", fontSize: "13px", fontFamily: "Arial, sans-serif",
                    cursor: "pointer", padding: 0, textDecoration: "underline",
                  }}
                >
                  Read more
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Footer CTA */}
        <div style={{
          marginTop: "64px", padding: "48px",
          background: "#1a1a1a", borderRadius: "20px",
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center", gap: "16px",
        }}>
          <span style={{ fontSize: "32px" }}>🗺️</span>
          <h3 style={{
            color: "#fff", fontFamily: "Georgia, serif",
            fontSize: "24px", fontWeight: "400", margin: 0,
          }}>
            Questions about these terms?
          </h3>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontFamily: "Arial, sans-serif",
            fontSize: "14px", margin: 0, lineHeight: "1.7",
          }}>
            Our legal team is happy to clarify anything you need.
          </p>
          <a
            href="mailto:legal@wanderlust.com"
            style={{
              display: "inline-block", marginTop: "8px",
              background: "#e8284a", color: "#fff",
              padding: "12px 32px", borderRadius: "100px",
              textDecoration: "none", fontFamily: "Arial, sans-serif",
              fontSize: "14px", fontWeight: "600", letterSpacing: "0.5px",
            }}
          >
            Contact legal@wanderlust.com
          </a>
        </div>
      </div>
    </div>
  );
}