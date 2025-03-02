export type LokiTransportOptions = {
  host: string
  json: boolean
  labels: Record<string, string>
  interval: number
  replaceTimestamp: boolean
}
  