module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '#Generated': './src/generated',
          '#Assets': './src/assets',
          '#Features': './src/features',
          '#Components': './src/components',
          '#Base': './src',
        },
        extensions: ['.tsx', '.ts', '.js', '.png'],
      },
    ],
  ],
};
