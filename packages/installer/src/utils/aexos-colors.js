/**
 * Cyryx Labs Design System v1.0 — CLI Brand Color Palette
 *
 * Official brand color system for CLI tools and terminal output.
 * Base Tokens:
 * - Onyx: #050607 (Primary background)
 * - Obsidian: #0A0D0F (Secondary background)
 * - Graphite: #11161A (Cards / Panels)
 * - Gunmetal: #1B2227 (Borders / Deep UI)
 * - Steel: #8C949E (Secondary text / interface metal)
 * - Silver: #C7C9CC (Primary text and logo finish)
 * - Core Teal: #0F6B68 (Accent / active states / command paths)
 * - Teal Glow: #19C7C0 (Focus / status / primary CTA emphasis)
 *
 * @module aexos-colors
 */

const chalk = require('chalk');

/**
 * Cyryx Labs Brand Color Palette
 */
const colors = {
  // ============================================
  // CORE BRAND TOKENS (Cyryx Labs Design System v1.0)
  // ============================================

  /**
   * Primary brand activation color - Teal Glow (#19C7C0)
   * Usage: Main headers, BANNER, active selections, focus, primary CTA
   */
  primary: chalk.hex('#19C7C0'),

  /**
   * Secondary brand color - Silver (#C7C9CC)
   * Usage: Primary text finish, subtitles, key information
   */
  secondary: chalk.hex('#C7C9CC'),

  /**
   * Tertiary brand color - Core Teal (#0F6B68)
   * Usage: Secondary actions, links, command paths, company info
   */
  tertiary: chalk.hex('#0F6B68'),

  // ============================================
  // FUNCTIONAL COLORS
  // ============================================

  /**
   * Success state color
   * Usage: Checkmarks, completed steps, success messages
   */
  success: chalk.hex('#10B981'),

  /**
   * Warning state color
   * Usage: Warnings, confirmations, caution states
   */
  warning: chalk.hex('#F59E0B'),

  /**
   * Error state color
   * Usage: Errors, critical alerts, validation failures
   */
  error: chalk.hex('#EF4444'),

  /**
   * Info state color - Teal Glow (#19C7C0)
   * Usage: Info messages, tips, helper text, additional context
   */
  info: chalk.hex('#19C7C0'),

  // ============================================
  // NEUTRAL TOKENS
  // ============================================

  /**
   * Muted text color - Steel (#8C949E)
   * Usage: Secondary text, disabled states, interface metal
   */
  muted: chalk.hex('#8C949E'),

  /**
   * Dim text color - Steel (#8C949E)
   * Usage: Dividers, secondary text, muted borders
   */
  dim: chalk.hex('#8C949E'),

  // ============================================
  // GRADIENT SYSTEM
  // ============================================

  /**
   * Brand gradient: Teal Glow -> Core Teal -> Silver
   */
  gradient: {
    start: chalk.hex('#19C7C0'),
    middle: chalk.hex('#0F6B68'),
    end: chalk.hex('#C7C9CC'),
  },

  // ============================================
  // SEMANTIC SHORTCUTS
  // ============================================

  /**
   * Highlighted text - Bold Teal Glow
   */
  highlight: chalk.hex('#19C7C0').bold,

  /**
   * Primary branding - Bold Teal Glow
   */
  brandPrimary: chalk.hex('#19C7C0').bold,

  /**
   * Secondary branding - Silver
   */
  brandSecondary: chalk.hex('#C7C9CC'),
};

/**
 * Pre-formatted status indicators with color and symbols
 */
const status = {
  /** Success indicator: ✓ (green) */
  success: (text) => `${colors.success('✓')} ${text}`,
  
  /** Error indicator: ✗ (red) */
  error: (text) => `${colors.error('✗')} ${text}`,
  
  /** Warning indicator: ⚠️ (orange) */
  warning: (text) => `${colors.warning('⚠️')} ${text}`,
  
  /** Info indicator: ℹ (teal glow) */
  info: (text) => `${colors.info('ℹ')} ${text}`,
  
  /** Loading indicator: ⏳ (teal glow) */
  loading: (text) => `${colors.info('⏳')} ${text}`,
  
  /** Skipped indicator: ⊘ (steel muted) */
  skipped: (text) => `${colors.muted('⊘')} ${text}`,
  
  /** Tip indicator: 💡 (teal glow) */
  tip: (text) => `${colors.info('💡')} ${text}`,
  
  /** Party indicator: 🎉 (teal glow bold) */
  celebrate: (text) => `${colors.brandPrimary('🎉')} ${text}`,
};

/**
 * Formatted heading helpers
 */
const headings = {
  /** H1 - Brand primary, bold */
  h1: (text) => `\n${colors.brandPrimary(text)}\n`,
  
  /** H2 - Primary Teal Glow, bold */
  h2: (text) => `\n${colors.primary.bold(text)}\n`,
  
  /** H3 - Primary Teal Glow */
  h3: (text) => colors.primary(text),
  
  /** Section divider */
  divider: () => colors.dim('─'.repeat(50)),
};

/**
 * Formatted list helpers
 */
const lists = {
  /** Bullet point (primary) */
  bullet: (text) => `${colors.primary('•')} ${text}`,
  
  /** Numbered item (primary) */
  numbered: (num, text) => `${colors.primary(`${num}.`)} ${text}`,
  
  /** Checkbox unchecked */
  checkbox: (text, checked = false) => {
    const icon = checked ? colors.success('☑') : colors.muted('☐');
    return `${icon} ${text}`;
  },
};

/**
 * Example usage for documentation
 */
const examples = {
  welcome: () => {
    console.log(headings.h1('🎉 Welcome to AEXOS (Cyryx Labs)!'));
    console.log(colors.info('Let\'s configure your project in just a few steps...\n'));
  },
  
  question: () => {
    console.log(colors.primary('? Select your project type:'));
    console.log(lists.bullet('Greenfield (new project)'));
    console.log(lists.bullet('Brownfield (existing project)'));
  },
  
  progress: () => {
    console.log(status.loading('Installing dependencies...'));
    console.log(status.success('Dependencies installed'));
    console.log(status.loading('Configuring environment...'));
  },
  
  feedback: () => {
    console.log(status.success('Configuration complete!'));
    console.log(status.warning('Existing .env found. Overwrite?'));
    console.log(status.error('Invalid path provided'));
    console.log(status.tip('You can change this later in settings'));
  },
  
  complete: () => {
    console.log('\n' + headings.divider());
    console.log(status.celebrate('Installation Complete!'));
    console.log(colors.info('Your AEXOS project is ready to use.'));
    console.log(headings.divider() + '\n');
  },
};

// Export all utilities
module.exports = {
  colors,
  status,
  headings,
  lists,
  examples,
};

// Also export as default for ESM compatibility
module.exports.default = module.exports;
