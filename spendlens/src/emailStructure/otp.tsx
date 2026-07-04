import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface OtpEmailProps {
    otp: string;
}

export default function OtpEmail({ otp }: OtpEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Your verification code is {otp}</Preview>

            <Body
                style={{
                    backgroundColor: "#f4f4f5",
                    fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    margin: 0,
                    padding: "40px 0",
                }}
            >
                <Container
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid #e4e4e7",
                    }}
                >
                    {/* Header */}
                    <Section
                        style={{
                            background: "#111827",
                            padding: "32px",
                            textAlign: "center",
                        }}
                    >
                        <Heading
                            style={{
                                color: "#ffffff",
                                margin: 0,
                                fontSize: "28px",
                            }}
                        >
                            Subscription Tracker
                        </Heading>

                        <Text
                            style={{
                                color: "#d1d5db",
                                marginTop: "8px",
                                fontSize: "16px",
                            }}
                        >
                            Verify your email address
                        </Text>
                    </Section>

                    {/* Content */}
                    <Section style={{ padding: "40px" }}>
                        <Heading
                            as="h2"
                            style={{
                                color: "#18181b",
                                fontSize: "24px",
                                marginBottom: "16px",
                            }}
                        >
                            Hello 👋
                        </Heading>

                        <Text
                            style={{
                                color: "#52525b",
                                fontSize: "16px",
                                lineHeight: "26px",
                            }}
                        >
                            Thank you for signing up! Use the verification code
                            below to complete your account setup.
                        </Text>

                        <Section
                            style={{
                                backgroundColor: "#f4f4f5",
                                borderRadius: "12px",
                                textAlign: "center",
                                padding: "24px",
                                margin: "32px 0",
                            }}
                        >
                            <Text
                                style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#71717a",
                                    letterSpacing: "2px",
                                }}
                            >
                                YOUR OTP
                            </Text>

                            <Heading
                                style={{
                                    margin: "12px 0 0",
                                    fontSize: "42px",
                                    letterSpacing: "8px",
                                    color: "#2563eb",
                                }}
                            >
                                {otp}
                            </Heading>
                        </Section>

                        <Text
                            style={{
                                color: "#52525b",
                                fontSize: "15px",
                                lineHeight: "24px",
                            }}
                        >
                            This OTP is valid for <strong>5 minutes</strong>. Do
                            not share this code with anyone.
                        </Text>

                        <Hr
                            style={{
                                borderColor: "#e5e7eb",
                                margin: "32px 0",
                            }}
                        />

                        <Text
                            style={{
                                color: "#71717a",
                                fontSize: "14px",
                                lineHeight: "22px",
                            }}
                        >
                            If you didn't request this email, you can safely
                            ignore it.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section
                        style={{
                            backgroundColor: "#fafafa",
                            padding: "24px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#9ca3af",
                                fontSize: "13px",
                                margin: 0,
                            }}
                        >
                             {new Date().getFullYear()} SpensLens
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
