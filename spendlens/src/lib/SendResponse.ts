interface ResponseProps<T = unknown> {
    message: string;
    success: boolean;
    status: number;
    data?: T;
}

export function SendResponse<T>({
    message,
    success,
    status,
    data,
}: ResponseProps<T>) {
    return Response.json(
        {
            message,
            success,
            data,
        },
        {
            status,
        },
    );
}
