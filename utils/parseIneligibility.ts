export function parseIneligibility(reasons: string[], quantity: number): string {
  if (!reasons || reasons.length === 0) {
    return "Claim available"
  }

  // Handle common ineligibility reasons
  for (const reason of reasons) {
    if (reason.includes("insufficient funds")) {
      return "Insufficient funds"
    }
    if (reason.includes("not in allowlist")) {
      return "Not in allowlist"
    }
    if (reason.includes("already claimed")) {
      return "Already claimed maximum"
    }
    if (reason.includes("claim not active")) {
      return "Claim not active"
    }
    if (reason.includes("exceeds max supply")) {
      return "Exceeds max supply"
    }
    if (reason.includes("exceeds max per wallet")) {
      return `Max ${quantity} per wallet`
    }
  }

  // Default fallback
  return reasons[0] || "Cannot claim"
}
