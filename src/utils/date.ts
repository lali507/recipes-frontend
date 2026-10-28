const dateFormat = new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
const dateTimeFormat = new Intl.DateTimeFormat("he-IL", { dateStyle: "full", timeStyle: "short" })

export const formatDate = (iso: string) => dateFormat.format(new Date(iso))

export const formatDateTime = (iso: string) => dateTimeFormat.format(new Date(iso))
