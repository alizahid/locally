const withNextIntl = require('next-intl/plugin')('./src/intl/index.ts')

/** @type {import('next').NextConfig} */
const config = {}

module.exports = withNextIntl(config)
