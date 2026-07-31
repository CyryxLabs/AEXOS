// File: common/utils/status-mapper.js

/**
 * Status Mapper - Bidirectional status mapping between AEXOS and ClickUp
 *
 * This module provides utilities for:
 * - Mapping AEXOS story statuses to ClickUp custom field values
 * - Mapping ClickUp story-status values back to AEXOS statuses
 * - Handling ClickUp-specific statuses (e.g., "Ready for Dev")
 *
 * CRITICAL: Stories use ClickUp custom field "story-status", NOT native status.
 * Epics use the native ClickUp status field (Planning, In Progress, Done).
 */

const STATUS_MAPPING = {
  AEXOS_TO_CLICKUP: {
    'Draft': 'Draft',
    'Ready for Review': 'Ready for Review',
    'Review': 'Review',
    'In Progress': 'In Progress',
    'Done': 'Done',
    'Blocked': 'Blocked',
  },
  CLICKUP_TO_CYRYX: {
    'Draft': 'Draft',
    'Ready for Dev': 'Ready for Review',  // ClickUp-specific status
    'Ready for Review': 'Ready for Review',
    'Review': 'Review',
    'In Progress': 'In Progress',
    'Done': 'Done',
    'Blocked': 'Blocked',
  },
};

/**
 * Maps an AEXOS story status to ClickUp story-status custom field value
 *
 * @param {string} cyryxStatus - Local .md file status
 * @returns {string} ClickUp story-status value
 */
function mapStatusToClickUp(cyryxStatus) {
  const mapped = STATUS_MAPPING.AEXOS_TO_CLICKUP[cyryxStatus];

  if (!mapped) {
    console.warn(`Unknown AEXOS status: ${cyryxStatus}, using as-is`);
    return cyryxStatus;
  }

  return mapped;
}

/**
 * Maps a ClickUp story-status custom field value to AEXOS story status
 *
 * @param {string} clickupStatus - ClickUp story-status value
 * @returns {string} Local .md file status
 */
function mapStatusFromClickUp(clickupStatus) {
  const mapped = STATUS_MAPPING.CLICKUP_TO_CYRYX[clickupStatus];

  if (!mapped) {
    console.warn(`Unknown ClickUp status: ${clickupStatus}, using as-is`);
    return clickupStatus;
  }

  return mapped;
}

/**
 * Validates if a status is a valid AEXOS story status
 *
 * @param {string} status - Status to validate
 * @returns {boolean} True if valid
 */
function isValidCYRYXStatus(status) {
  return Object.keys(STATUS_MAPPING.AEXOS_TO_CLICKUP).includes(status);
}

/**
 * Validates if a status is a valid ClickUp story-status value
 *
 * @param {string} status - Status to validate
 * @returns {boolean} True if valid
 */
function isValidClickUpStatus(status) {
  return Object.keys(STATUS_MAPPING.CLICKUP_TO_CYRYX).includes(status);
}

/**
 * Gets all valid AEXOS story statuses
 *
 * @returns {string[]} Array of valid statuses
 */
function getValidCYRYXStatuses() {
  return Object.keys(STATUS_MAPPING.AEXOS_TO_CLICKUP);
}

/**
 * Gets all valid ClickUp story-status values
 *
 * @returns {string[]} Array of valid statuses
 */
function getValidClickUpStatuses() {
  return Object.keys(STATUS_MAPPING.CLICKUP_TO_CYRYX);
}

module.exports = {
  mapStatusToClickUp,
  mapStatusFromClickUp,
  isValidCYRYXStatus,
  isValidClickUpStatus,
  getValidCYRYXStatuses,
  getValidClickUpStatuses,
  STATUS_MAPPING, // Export for testing
};
