import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface SubscriptionAlertProps {
    name: string;
    subscriptionName: string;
    price: number;
    renewalDate: Date;
    reminderDays: number;
}

export default function SubscriptionAlert({
    name,
    subscriptionName,
    price,
    renewalDate,
    reminderDays,
}: SubscriptionAlertProps) {
    return (
        <Html>
            <Head />
            <Preview>
                {`${subscriptionName} renews in ${reminderDays} day${
                    reminderDays > 1 ? "s" : ""
                }`}
            </Preview>

            <Body
                style={{
                    backgroundColor: "#f4f4f5",
                    fontFamily:
                        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
                        border: "1px solid #e5e7eb",
                    }}
                >
                    {/* Header */}
                    <Section
                        style={{
                            backgroundColor: "#111827",
                            padding: "30px",
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
                            Subscription Renewal Reminder
                        </Text>
                    </Section>

                    {/* Content */}
                    <Section style={{ padding: "40px" }}>
                        <Heading
                            as="h2"
                            style={{
                                color: "#18181b",
                                marginBottom: "18px",
                            }}
                        >
                            Hi {name} 👋
                        </Heading>

                        <Text
                            style={{
                                fontSize: "16px",
                                lineHeight: "28px",
                                color: "#52525b",
                            }}
                        >
                            This is a friendly reminder that your subscription
                            is about to renew.
                        </Text>

                        <Section
                            style={{
                                backgroundColor: "#f9fafb",
                                border: "1px solid #e5e7eb",
                                borderRadius: "12px",
                                padding: "24px",
                                margin: "30px 0",
                            }}
                        >
                            <Text style={{ margin: 0 }}>
                                <strong>Subscription:</strong>{" "}
                                {subscriptionName}
                            </Text>

                            <Text>
                                <strong>Price:</strong> ₹{price}
                            </Text>

                            <Text>
                                <strong>Renewal Date:</strong>{" "}
                                {renewalDate.toLocaleDateString()}
                            </Text>

                            <Text>
                                <strong>Reminder:</strong> {reminderDays} day
                                {reminderDays > 1 ? "s" : ""} before renewal
                            </Text>
                        </Section>

                        <Text
                            style={{
                                color: "#52525b",
                                lineHeight: "28px",
                            }}
                        >
                            If you no longer use this subscription, consider
                            cancelling it before the renewal date to avoid
                            unnecessary charges.
                        </Text>

                        <Hr
                            style={{
                                borderColor: "#e5e7eb",
                                margin: "30px 0",
                            }}
                        />

                        <Text
                            style={{
                                color: "#71717a",
                                fontSize: "14px",
                                lineHeight: "24px",
                            }}
                        >
                            Thank you for using Subscription Tracker to manage
                            your recurring expenses.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section
                        style={{
                            backgroundColor: "#fafafa",
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "13px",
                                color: "#9ca3af",
                                margin: 0,
                            }}
                        >
                            © {new Date().getFullYear()} Subscription Tracker.
                            All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
