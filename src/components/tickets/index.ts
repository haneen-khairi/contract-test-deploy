type Ticket = {
    id: number,
    number: string,
    subject: string,
    description: string,
    type: string,
    status: string,
    status_color: string,
    created_at: string,
    attachments?: any[],
    replies?: any[]
}