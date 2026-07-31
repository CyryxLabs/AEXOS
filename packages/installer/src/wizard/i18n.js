/**
 * Internationalization (i18n) for AEXOS Wizard
 *
 * Supports: English, Portuguese, Spanish
 *
 * @module wizard/i18n
 */

const TRANSLATIONS = {
  en: {
    // Language selection
    selectLanguage: 'Select language:',

    // User Profile (Story 10.2 - Epic 10: User Profile System)
    userProfileQuestion: 'When AI generates code for you, which option best describes you?',
    modoAssistido: 'Assisted Mode',
    modoAssistidoDesc: "I can't tell if the code is right or wrong",
    modoAssistidoHint: 'You talk to Bob, who handles all validation',
    modoAvancado: 'Advanced Mode',
    modoAvancadoDesc: 'I can identify when something is wrong and fix it',
    modoAvancadoHint: 'You have direct access to all agents',
    userProfileSkipped: 'Using existing user profile',
    languageSkipped: 'Using existing language',

    // Project type
    projectTypeQuestion: 'What type of project are you setting up?',
    greenfield: 'Greenfield',
    greenfieldDesc: 'new project from scratch',
    brownfield: 'Brownfield',
    brownfieldDesc: 'existing project',

    // IDE selection
    ideQuestion: 'Select IDE(s):',
    ideHint: 'Space to select, Enter to confirm',
    recommended: 'Recommended',

    // Progress messages
    installingCore: 'Installing AEXOS core...',
    installingIDE: 'Configuring IDEs...',
    installingDeps: 'Installing dependencies...',
    configuringEnv: 'Configuring environment...',
    validating: 'Validating installation...',

    // Status
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    skipped: 'Skipped',

    // Completion
    installComplete: 'Installation Complete!',
    readyToUse: 'Your AEXOS project is ready.',
    nextSteps: 'Next steps:',
    quickStart: 'Quick Start:',
    quickStartAgents: 'Talk to your AI agents: @dev, @qa, @architect',
    quickStartStory: 'Create a story: @pm *create-story',
    quickStartHelp: 'Get help: @aexos-master *help',

    // Cancellation
    cancelConfirm: 'Cancel installation?',
    cancelled: 'Installation cancelled.',
    tryAgain: 'Run `npx github:CyryxLabs/AEXOS init` to try again.',
    continuing: 'Continuing installation...',

    // Pro Installation Wizard (pro-setup.js)
    proWizardTitle: 'AEXOS Pro Installation Wizard',
    proWizardSubtitle: 'Premium Content & Features',
    proLicenseActivation: 'License Activation',
    proContentInstallation: 'Pro Content Installation',
    proVerification: 'Verification',
    proHowActivate: 'How would you like to activate Pro?',
    proLoginOrCreate: 'Login or create account (Recommended)',
    proEnterKey: 'Enter license key (legacy)',
    proEmailLabel: 'Email:',
    proEmailRequired: 'Email is required',
    proEmailInvalid: 'Please enter a valid email address',
    proVerifyingAccess: 'Verifying your access...',
    proNoAccess: 'No AEXOS Pro access found for this email.',
    proContactSupport: 'If you believe this is an error, please contact support:',
    proPurchase: 'Purchase Pro: https://pro.cyryx.ai',
    proEmailNotBuyer: 'Email not found in Pro buyers list.',
    proAccessConfirmedAccount: 'Pro access confirmed! Account found.',
    proAccessConfirmedCreate: "Pro access confirmed! Let's create your account.",
    proPasswordLabel: 'Password:',
    proPasswordMin: 'Password must be at least {min} characters',
    proAuthenticating: 'Authenticating...',
    proAuthSuccess: 'Authenticated successfully.',
    proEmailNotVerified: 'Email not verified yet. Please check your inbox and click the verification link.',
    proCheckingEvery: '(Checking every 5 seconds... timeout in 10 minutes)',
    proEmailVerified: 'Email verified!',
    proVerificationTimeout: 'Email verification timed out after 10 minutes.',
    proRunAgain: 'Run the installer again to retry.',
    proIncorrectPassword: 'Incorrect password. {remaining} attempt(s) remaining.',
    proMaxAttempts: 'Maximum login attempts reached.',
    proForgotPassword: 'Forgot your password? Visit https://aexos-license-server.vercel.app/reset-password',
    proContactSupportEmail: 'Or open an issue: https://github.com/CyryxLabs/AEXOS/issues',
    proAuthFailed: 'Authentication failed: {message}',
    proCreateAccount: 'Create your AEXOS Pro account to get started.',
    proChoosePassword: 'Choose a password:',
    proConfirmPassword: 'Confirm password:',
    proPasswordsNoMatch: 'Passwords do not match',
    proCreatingAccount: 'Creating account...',
    proAccountCreated: 'Account created! Verification email sent.',
    proAccountExists: 'Account already exists. Switching to login...',
    proAccountFailed: 'Account creation failed: {message}',
    proCheckEmail: 'Please check your email and click the verification link.',
    proWaitingVerification: 'Waiting for email verification...',
    proAfterVerifying: 'After verifying, the installation will continue automatically.',
    proPressResend: '[Press R to resend verification email]',
    proVerificationResent: 'Verification email resent.',
    proCouldNotResend: 'Could not resend: {message}',
    proRunAgainRetry: 'Run the installer again to retry verification.',
    proValidatingSubscription: 'Validating Pro subscription...',
    proSubscriptionConfirmed: 'Pro subscription confirmed! License: {key}',
    proNoSubscription: 'No active Pro subscription found for this email.',
    proPurchaseAt: 'Purchase Pro at https://pro.cyryx.ai',
    proSeatLimit: 'Deactivate another device or upgrade your license.',
    proAlreadyActivated: 'Pro license already activated for this account.',
    proActivationFailed: 'Activation failed: {message}',
    proLicenseCacheFailed: 'Local Pro license cache could not be saved: {message}',
    proEnterKeyPrompt: 'Enter your Pro license key:',
    proKeyRequired: 'License key is required',
    proKeyInvalid: 'Invalid format. Expected: PRO-XXXX-XXXX-XXXX-XXXX',
    proKeyValidated: 'License validated: {key}',
    proModuleNotAvailable:
      'Pro license module not available. Run: npx github:CyryxLabs/AEXOS pro setup',
    proModuleBootstrap: 'Pro license module not found locally. Installing AEXOS Pro to bootstrap...',
    proServerUnreachable: 'License server is unreachable. Check your internet connection and try again.',
    proVerifyingAccessShort: 'Verifying access...',
    proAccessConfirmed: 'Pro access confirmed.',
    proBuyerCheckUnavailable: 'Buyer check unavailable, proceeding with login...',
    proLoginFailedSignup: 'Login failed, attempting signup...',
    proAccountCreatedVerify: 'Account created. Verification email sent!',
    proAccountExistsWrongPw: 'Account exists but the password is incorrect.',
    proAuthFailedShort: 'Authentication failed.',
    proValidatingKey: 'Validating license {key}...',
    proInvalidKey: 'Invalid license key.',
    proExpiredKey: 'License key has expired.',
    proMaxActivations: 'Maximum activations reached for this key.',
    proRateLimited: 'Too many requests. Please wait and try again.',
    proValidationFailed: 'License validation failed: {message}',
    proInvalidKeyFormat: 'Invalid key format: {key}. Expected: PRO-XXXX-XXXX-XXXX-XXXX',
    proScaffolding: 'Scaffolding pro content...',
    proScaffoldingProgress: 'Scaffolding: {message}',
    proContentInstalled: 'Pro content installed ({count} files)',
    proScaffoldFailed: 'Scaffolding failed',
    proScaffoldError: 'Scaffolding error: {message}',
    proInitPackageJson: 'Initializing package.json...',
    proPackageJsonCreated: 'package.json created',
    proPackageJsonFailed: 'Failed to create package.json',
    proInstallingPackage: 'Installing AEXOS Pro package...',
    proPackageInstalled: 'Pro package installed',
    proPackageInstallFailed: 'Failed to install Pro package',
    proScaffolderNotAvailable:
      'Pro scaffolder not available. Run: npx github:CyryxLabs/AEXOS pro setup',
    proFilesInstalled: 'Files installed: {count}',
    proSquads: 'Squads: {names}',
    proConfigs: 'Configs: {count} files',
    proFeaturesUnlocked: 'Features unlocked: {count}',
    proInstallComplete: 'AEXOS Pro installation complete!',
    proNeedHelp: 'Need help? Run: npx -y @aexos-squads/aexos-pro-cli@latest recover',
    proCISetEnv: 'CI mode: Set AEXOS_PRO_EMAIL + AEXOS_PRO_PASSWORD or AEXOS_PRO_KEY environment variables.',
    proVerificationFailed: 'Verification failed: {message}',
    proPackageNotFound: 'Pro content source not found. Re-run Pro setup with email login or contact support.',
    proScaffolderNotFound: 'Pro scaffolder module not found.',
    proNpmInitFailed: 'npm init failed: {message}',
    proNpmInstallFailed:
      'AEXOS Pro package install failed: {message}. Try manually: npx github:CyryxLabs/AEXOS pro setup',
  },

};

// Current language (default: English)
let currentLanguage = 'en';

/**
 * Set current language
 * @param {string} lang - Language code (en, pt, es)
 */
function setLanguage(lang) {
  if (TRANSLATIONS[lang]) {
    currentLanguage = lang;
  }
}

/**
 * Get current language
 * @returns {string} Current language code
 */
function getLanguage() {
  return currentLanguage;
}

/**
 * Get translated string
 * @param {string} key - Translation key
 * @returns {string} Translated string
 */
function t(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['en'][key] || key;
}

/**
 * Get translated string with placeholder substitution.
 * Placeholders use {name} syntax.
 *
 * @param {string} key - Translation key
 * @param {Object} [params={}] - Placeholder values
 * @returns {string} Translated string with substitutions
 * @example tf('proIncorrectPassword', { remaining: 2 })
 */
function tf(key, params = {}) {
  let str = t(key);
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }
  return str;
}

module.exports = {
  setLanguage,
  getLanguage,
  t,
  tf,
  TRANSLATIONS,
};
