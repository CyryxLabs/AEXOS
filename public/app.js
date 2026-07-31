/**
 * AEXOS — public site behaviour.
 *
 * Two small things only: copy-to-clipboard on the command panels, and the
 * footer year. The page is static by design; nothing here is required for it
 * to be readable or usable.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- copy the command a panel is showing ---------------------------------
  // Each button is "Copy" plus a visually hidden suffix naming the command, so
  // the accessible name distinguishes buttons that all read "Copy" on screen.
  // Only the leading word is swapped on success — replacing textContent would
  // discard that suffix and leave every button named the same thing.
  for (const btn of document.querySelectorAll('.copy')) {
    const face = btn.firstChild; // the "Copy" text node
    const original = face.nodeValue;

    btn.addEventListener('click', async () => {
      const text = (btn.dataset.copy || '').trim();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        face.nodeValue = 'Copied';
      } catch {
        // Clipboard access is refused in some contexts (insecure origin,
        // permission denied). Say so rather than silently doing nothing.
        face.nodeValue = 'Press ⌘C';
      }
      btn.dataset.done = 'true';

      setTimeout(() => {
        face.nodeValue = original;
        delete btn.dataset.done;
      }, 1800);
    });
  }

  // --- footer year, so the notice never goes stale --------------------------
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
});
