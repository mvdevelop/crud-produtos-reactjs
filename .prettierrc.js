module.exports = {
  // Use single quotes
  singleQuote: true,
  // Trailing commas
  trailingComma: 'es5',
  // Semi-colons
  semi: true,
  // Sort imports
  importOrder: [
    '^(react/|@fortawesome)',
    '^@?(src)',
    '^[./]',
  ],
  // Sort keys in objects
  sortKeys: true,
  // JSX formatting
  jsxSingleQuote: true,
  // Bracket spacing
  bracketSpacing: true,
  // Bracket line break
  bracketLineBreak: 'before',
  // Indent options
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  // Arrow function parentheses
  arrowParens: 'avoid',
  // HTML formatting
  htmlWhitespaceSensitivity: 'css',
  // Vue files
  vueIndentScriptAndStyle: false,
  // End of line
  endOfLine: 'auto',
  // Function expression wrapping parentheses
  functionCallExpressionArrow?: 'ignore',
};