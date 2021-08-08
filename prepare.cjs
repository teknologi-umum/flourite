// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

if (process.env.NODE_ENV === 'production') {
  process.exit(0);
} else {
  exec('husky install', (error, stdout, stderr) => {
    if (error) throw error;
    console.log(stdout);
    console.log(stderr);
  });
}