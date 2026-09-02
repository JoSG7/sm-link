export interface MetricMetadata {
  visitorHash: string | null
  country: string | null
  deviceType: string
  browser: string
  operatingSystem: string
  referer: string | null
  isBot: boolean
}

function getDeviceType(userAgent: string) {
  if (/mobile|android|iphone|ipod/i.test(userAgent)) return "mobile"
  if (/ipad|tablet/i.test(userAgent)) return "tablet"
  return "desktop"
}

function getBrowser(userAgent: string) {
  if (/edg/i.test(userAgent)) return "edge"
  if (/chrome|crios/i.test(userAgent)) return "chrome"
  if (/firefox|fxios/i.test(userAgent)) return "firefox"
  if (/safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent)) return "safari"
  return "other"
}

function getOperatingSystem(userAgent: string) {
  if (/windows/i.test(userAgent)) return "windows"
  if (/android/i.test(userAgent)) return "android"
  if (/iphone|ipad|ios/i.test(userAgent)) return "ios"
  if (/mac os/i.test(userAgent)) return "macos"
  if (/linux/i.test(userAgent)) return "linux"
  return "other"
}

export function getMetricMetadata(
  userAgent: string,
  visitorHash: string | null,
  country: string | null,
  referer: string | null,
): MetricMetadata {
  return {
    visitorHash,
    country,
    deviceType: getDeviceType(userAgent),
    browser: getBrowser(userAgent),
    operatingSystem: getOperatingSystem(userAgent),
    referer,
    isBot: /bot|crawler|spider|slurp/i.test(userAgent),
  }
}