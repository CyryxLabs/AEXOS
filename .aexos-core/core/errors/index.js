const {
  ErrorCategory,
  ErrorSeverity,
  DEFAULT_ERROR_CODE,
  CORE_ERROR_DEFINITIONS,
} = require('./constants');
const { ErrorRegistry, defaultErrorRegistry } = require('./error-registry');
const { CYRYXError, isCYRYXError, normalizeError } = require('./aexos-error');
const { shouldExposeErrorStack, sanitizeValue, serializeError } = require('./serializer');
const { deepMerge, isPlainObject, normalizeErrorCode } = require('./utils');

module.exports = {
  CYRYXError,
  ErrorRegistry,
  ErrorCategory,
  ErrorSeverity,
  DEFAULT_ERROR_CODE,
  CORE_ERROR_DEFINITIONS,
  defaultErrorRegistry,
  isCYRYXError,
  normalizeError,
  serializeError,
  sanitizeValue,
  shouldExposeErrorStack,
  deepMerge,
  isPlainObject,
  normalizeErrorCode,
};
