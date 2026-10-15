let cachedResult: boolean | null = null;

/**
 * Determines whether the entrance animations (Preloader & Enquiry Popup)
 * should execute.
 * 
 * Rules:
 * - On first visit to the site in the tab: YES (true)
 * - On page refresh / browser reload (F5 / Cmd+R): YES (true)
 * - On internal page switching / navigation: NO (false)
 */
export function shouldShowEntranceFlow(): boolean {
  if (cachedResult !== null) return cachedResult;

  try {
    const navEntries = performance.getEntriesByType("navigation");
    const nav = navEntries[0] as PerformanceNavigationTiming | undefined;

    // Direct browser reload / refresh detection
    if (nav && nav.type === "reload") {
      cachedResult = true;
      return true;
    }

    // Legacy PerformanceNavigation check (e.g. older browsers / Safari fallback)
    if (typeof performance !== "undefined" && (performance as any)?.navigation?.type === 1) {
      cachedResult = true;
      return true;
    }

    // First entrance in the current browser tab session
    const hasEntered = sessionStorage.getItem("ri_session_active");
    if (!hasEntered) {
      sessionStorage.setItem("ri_session_active", "1");
      cachedResult = true;
      return true;
    }
  } catch {
    cachedResult = false;
    return false;
  }

  cachedResult = false;
  return false;
}
