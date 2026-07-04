interface ResponseProps {
    message: string;
    success: boolean;
    status: number;
}

export function SendResponse({ message, success, status }: ResponseProps) {
    return Response.json(
        {
            message,
            success,
        },
        {
            status,
        },
    );
}
