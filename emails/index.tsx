import { sharedMetadata } from "@/constants/shared-meta";

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

interface InquiryEmailProps {
  username: string;
  email: string;
  organization?: string;
  service: string;
  message: string;
}

const InquiryEmail = ({
  username,
  email,
  organization,
  service,
  message,
}: InquiryEmailProps) => (
  <Html>
    <Head />
    <Preview>
      New inquiry from {username} • {service}
    </Preview>
    <Body
      style={{
        fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#1a1a1a",
        padding: "40px 20px",
        margin: 0,
      }}
    >
      <Container
        style={{
          backgroundColor: "#1a1a1a",
          border: "1px solid #333333",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "600px",
        }}
      >
        <Heading 
          style={{ 
            color: "#f2f2f2", 
            fontSize: "24px", 
            fontWeight: "600",
            marginBottom: "8px",
            marginTop: 0
          }}
        >
          New Contact Inquiry
        </Heading>
        
        <Text style={{ fontSize: "16px", color: "#eaeaea", marginBottom: "24px" }}>
          Someone reached out through your portfolio contact form.
        </Text>

        <div style={{ 
          backgroundColor: "#262626", 
          borderRadius: "8px", 
          padding: "24px",
          marginBottom: "24px"
        }}>
          <div style={{ marginBottom: "16px" }}>
            <Text style={{ 
              fontSize: "14px", 
              color: "#a1a1aa", 
              margin: "0 0 4px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Name
            </Text>
            <Text style={{ 
              fontSize: "16px", 
              color: "#f2f2f2", 
              margin: 0,
              fontWeight: "500"
            }}>
              {username}
            </Text>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Text style={{ 
              fontSize: "14px", 
              color: "#a1a1aa", 
              margin: "0 0 4px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Email
            </Text>
            <Link 
              href={`mailto:${email}`}
              style={{ 
                fontSize: "16px", 
                color: "#60a5fa", 
                textDecoration: "none",
                fontWeight: "500"
              }}
            >
              {email}
            </Link>
          </div>

          {organization && (
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ 
                fontSize: "14px", 
                color: "#a1a1aa", 
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Organization
              </Text>
              <Text style={{ 
                fontSize: "16px", 
                color: "#f2f2f2", 
                margin: 0,
                fontWeight: "500"
              }}>
                {organization}
              </Text>
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <Text style={{ 
              fontSize: "14px", 
              color: "#a1a1aa", 
              margin: "0 0 4px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Service Needed
            </Text>
            <Text style={{ 
              fontSize: "16px", 
              color: "#f2f2f2", 
              margin: 0,
              fontWeight: "500"
            }}>
              {service}
            </Text>
          </div>

          <div>
            <Text style={{ 
              fontSize: "14px", 
              color: "#a1a1aa", 
              margin: "0 0 8px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Message
            </Text>
            <Text style={{ 
              fontSize: "16px", 
              color: "#eaeaea", 
              margin: 0,
              lineHeight: "1.6",
              whiteSpace: "pre-wrap"
            }}>
              {message}
            </Text>
          </div>
        </div>

        <Hr style={{ 
          border: "none", 
          borderTop: "1px solid #333333", 
          margin: "24px 0" 
        }} />

        <Text style={{ 
          fontSize: "14px", 
          color: "#a1a1aa", 
          margin: 0,
          textAlign: "center" as const
        }}>
          Sent from{" "}
          <Link 
            href={sharedMetadata.url}
            style={{ 
              color: "#60a5fa", 
              textDecoration: "none" 
            }}
          >
            {sharedMetadata.name}'s Portfolio
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default InquiryEmail;
