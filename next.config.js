const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
      // Add a rule to handle .node files with file-loader
      config.module.rules.push({
        test: /\.node$/,
        use: 'file-loader',
      });

      return config;
    },
  };
module.exports = withNextIntl(nextConfig);
