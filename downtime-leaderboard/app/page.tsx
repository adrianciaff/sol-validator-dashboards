interface Validator {
  name: string
  website: string | null
  incidents: number
  minutes: number
}

interface ApiResponse {
  data: Validator[]
  metadata: {
    total_validators: number
    time_window: string
    as_of: string
  }
}

export const dynamic = 'force-static'
export const revalidate = false

async function getData(): Promise<ApiResponse> {
  const response = await fetch(
    'https://api-service-321368118490.australia-southeast1.run.app/api/downtime-leaderboard'
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return response.json()
}

function formatDowntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = Math.round(minutes % 60)
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export default async function Home() {
  let data: ApiResponse | null = null
  let error: string | null = null

  try {
    data = await getData()
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred'
  }

  if (error || !data) {
    return (
      <div className="container">
        <div className="error">Error loading data: {error || 'No data available'}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header>
        <h1>SOL Validator Downtime Leaderboard</h1>
        <div className="metadata">
          <div className="metadata-item">
            <span className="metadata-label">Total Validators</span>
            <span className="metadata-value">{data.metadata.total_validators}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Time Window</span>
            <span className="metadata-value">{data.metadata.time_window}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Last Updated</span>
            <span className="metadata-value">{data.metadata.as_of}</span>
          </div>
        </div>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Validator Name</th>
              <th>Website</th>
              <th>Downtime</th>
              <th>Incidents</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((validator, index) => (
              <tr key={index}>
                <td className="rank">{index + 1}</td>
                <td className="validator-name">{validator.name}</td>
                <td>
                  {validator.website ? (
                    <a
                      href={validator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      {validator.website}
                    </a>
                  ) : (
                    <span className="no-website">N/A</span>
                  )}
                </td>
                <td className="downtime">{formatDowntime(validator.minutes)}</td>
                <td className="incidents">{validator.incidents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="refresh-info">
        Data is updated at build time. Rebuilds happen automatically on each push to main branch.
      </div>
    </div>
  )
}

