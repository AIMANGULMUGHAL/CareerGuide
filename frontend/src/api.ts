
const API_URL = 'http://127.0.0.1:5000'

export async function submitCareerAssessment(
  interests: string[],
  skills: string[]
) {
  const response = await fetch(`${API_URL}/api/career-guidance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      interests,
      skills,
    }),
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}
