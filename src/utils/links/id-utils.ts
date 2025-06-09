export function getGuessID(): string {
  let guessID = localStorage.getItem("guessID")
  if (!guessID) {
    guessID = crypto.randomUUID()
    localStorage.setItem("guessID", guessID)
  }
  return guessID
}

export function createBase64Code(): string {
  const array = new Uint8Array(Math.ceil(7 * 0.75))
  crypto.getRandomValues(array)
  const base64 = btoa(String.fromCharCode(...array)).replace(/[^a-zA-Z0-9]/g, '')
  return base64.slice(0, 7)
}