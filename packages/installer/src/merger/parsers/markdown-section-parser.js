/**
 * @fileoverview Parser for Markdown files with AEXOS-MANAGED sections
 * @module merger/parsers/markdown-section-parser
 */

// Regex patterns for AEXOS markers
const AEXOS_START_MARKER = /^<!--\s*AEXOS-MANAGED-START:\s*([a-zA-Z0-9_-]+)\s*-->$/;
const AEXOS_END_MARKER = /^<!--\s*AEXOS-MANAGED-END:\s*([a-zA-Z0-9_-]+)\s*-->$/;
const HEADER_PATTERN = /^(#{1,6})\s+(.+)$/;

/**
 * Parsed section from markdown
 * @typedef {Object} ParsedSection
 * @property {string} id - Section identifier (slug or marker id)
 * @property {string} [title] - Section title (from header)
 * @property {number} [level] - Header level (1-6)
 * @property {number} startLine - Start line number (0-indexed)
 * @property {number} [endLine] - End line number (0-indexed)
 * @property {boolean} managed - True if AEXOS-MANAGED section
 * @property {string[]} lines - Lines in this section (excluding markers)
 */

/**
 * Result of parsing a markdown file
 * @typedef {Object} ParsedMarkdownFile
 * @property {ParsedSection[]} sections - All sections found
 * @property {boolean} hasCyryxMarkers - True if file has AEXOS-MANAGED markers
 * @property {string[]} preamble - Lines before first section
 * @property {string[]} rawLines - Original lines
 */

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Parse a markdown file, identifying sections and AEXOS-MANAGED areas
 * @param {string} content - Markdown content
 * @returns {ParsedMarkdownFile} Parsed result
 */
function parseMarkdownSections(content) {
  if (!content || content.trim() === '') {
    return {
      sections: [],
      hasCyryxMarkers: false,
      preamble: [],
      rawLines: [],
    };
  }

  const lines = content.split('\n');
  const result = {
    sections: [],
    hasCyryxMarkers: false,
    preamble: [],
    rawLines: lines,
  };

  let currentSection = null;
  let cyryxSection = null;
  let inPreamble = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for AEXOS start marker
    const startMatch = trimmed.match(AEXOS_START_MARKER);
    if (startMatch) {
      // Close any current non-managed section
      if (currentSection && !currentSection.managed) {
        currentSection.endLine = i - 1;
        result.sections.push(currentSection);
        currentSection = null;
      }

      // Start new AEXOS-managed section
      cyryxSection = {
        id: startMatch[1],
        startLine: i,
        managed: true,
        lines: [],
      };
      result.hasCyryxMarkers = true;
      inPreamble = false;
      continue;
    }

    // Check for AEXOS end marker
    const endMatch = trimmed.match(AEXOS_END_MARKER);
    if (endMatch && cyryxSection) {
      if (endMatch[1] === cyryxSection.id) {
        cyryxSection.endLine = i;
        result.sections.push(cyryxSection);
        cyryxSection = null;
      }
      continue;
    }

    // If we're in an CYRYX section, collect lines
    if (cyryxSection) {
      cyryxSection.lines.push(line);
      continue;
    }

    // Check for regular header
    const headerMatch = line.match(HEADER_PATTERN);
    if (headerMatch) {
      // Close any current section
      if (currentSection) {
        currentSection.endLine = i - 1;
        result.sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        id: slugify(headerMatch[2]),
        title: headerMatch[2],
        level: headerMatch[1].length,
        startLine: i,
        managed: false,
        lines: [line],
      };
      inPreamble = false;
      continue;
    }

    // Regular content line
    if (inPreamble) {
      result.preamble.push(line);
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else if (!cyryxSection) {
      // Content after an CYRYX section but before next section
      // This shouldn't happen in well-formed files, but handle it
      result.preamble.push(line);
    }
  }

  // Close final section if open
  if (currentSection) {
    currentSection.endLine = lines.length - 1;
    result.sections.push(currentSection);
  }

  // Handle unclosed CYRYX section (malformed)
  if (cyryxSection) {
    cyryxSection.endLine = lines.length - 1;
    cyryxSection.lines.push('<!-- WARNING: Unclosed AEXOS-MANAGED section -->');
    result.sections.push(cyryxSection);
  }

  return result;
}

/**
 * Check if content has AEXOS-MANAGED markers
 * @param {string} content - Markdown content
 * @returns {boolean} True if markers found
 */
function hasCyryxMarkers(content) {
  if (!content) return false;
  // Check for both START and END markers
  const hasStart = /<!--\s*AEXOS-MANAGED-START:\s*[a-zA-Z0-9_-]+\s*-->/.test(content);
  const hasEnd = /<!--\s*AEXOS-MANAGED-END:\s*[a-zA-Z0-9_-]+\s*-->/.test(content);
  return hasStart && hasEnd;
}

/**
 * Get all CYRYX section IDs from content
 * @param {string} content - Markdown content
 * @returns {string[]} Array of section IDs
 */
function getCyryxSectionIds(content) {
  const ids = [];
  const matches = content.matchAll(/<!--\s*AEXOS-MANAGED-START:\s*([a-zA-Z0-9_-]+)\s*-->/g);
  for (const match of matches) {
    ids.push(match[1]);
  }
  return ids;
}

module.exports = {
  slugify,
  parseMarkdownSections,
  hasCyryxMarkers,
  getCyryxSectionIds,
};
