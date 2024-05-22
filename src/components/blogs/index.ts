type IBlogCardProps = {
    blog?: IBlog,
    reverse?: boolean
}
type IBlog = {
    id?: number,
    image?: string,
    title?: string,
    content?: string,
    created_at?: string
}