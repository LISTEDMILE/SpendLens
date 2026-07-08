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

interface Subscription {
    name: string;
    price: number;
    renewalDate: Date;
    reminderDays: number;
}

interface SubscriptionReminderProps {
    name: string;
    subscriptions: Subscription[];
}

export default function SubscriptionReminder({
    name,
    subscriptions,
}: SubscriptionReminderProps) {
    return (
        <Html>
            <Head />

            <Preview>
                {`You have ${subscriptions.length} upcoming subscription${subscriptions.length > 1 ? "s" : ""} to review.`}
            </Preview>

            <Body
                style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                   
                }}
            >
                <Container
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    {/* Header */}

                    <Section
                        style={{
                            backgroundColor: "#18181b",
                            padding: "32px",
                            textAlign: "center",
                        }}
                    >
                        <Heading
                            style={{
                                color: "#ffffff",
                                margin: 0,
                                fontSize: "30px",
                            }}
                        >
                            SpendLens
                        </Heading>

                        <Text
                            style={{
                                color: "#a1a1aa",
                                marginTop: "12px",
                            }}
                        >
                            Subscription Renewal Reminder
                        </Text>
                    </Section>

                    {/* Greeting */}

                    <Section
                        style={{
                            padding: "30px",
                        }}
                    >
                        <Heading
                            as="h2"
                            style={{
                                fontSize: "24px",
                            }}
                        >
                            Hello {name},
                        </Heading>

                        <Text
                            style={{
                                color: "#52525b",
                                lineHeight: 1.7,
                            }}
                        >
                            The following subscription
                            {subscriptions.length > 1 ? "s are" : " is"} due for
                            renewal soon.
                        </Text>

                        <Hr />

                        {subscriptions.map((subscription, index) => (
                            <Section
                                key={index}
                                style={{
                                    border: "1px solid #e4e4e7",
                                    borderRadius: "10px",
                                    padding: "18px",
                                    marginBottom: "16px",
                                }}
                            >
                                <Heading
                                    as="h3"
                                    style={{
                                        fontSize: "20px",
                                        marginBottom: "12px",
                                    }}
                                >
                                    {subscription.name}
                                </Heading>

                                <Text>
                                    <strong>Price:</strong> ₹
                                    {subscription.price}
                                </Text>

                                <Text>
                                    <strong>Renewal Date:</strong>{" "}
                                    {new Date(
                                        subscription.renewalDate,
                                    ).toLocaleDateString()}
                                </Text>

                                <Text>
                                    <strong>Reminder:</strong>{" "}
                                    {subscription.reminderDays} day(s) before
                                    renewal
                                </Text>
                            </Section>
                        ))}

                        <Hr />

                        <Text
                            style={{
                                color: "#71717a",
                                lineHeight: 1.7,
                            }}
                        >
                            Please review your subscriptions before the renewal
                            date if you wish to continue or cancel them.
                        </Text>

                        <Text
                            style={{
                                color: "#71717a",
                                marginTop: "30px",
                            }}
                        >
                            Thank you,
                            <br />
                            <strong>Team SpendLens</strong>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
