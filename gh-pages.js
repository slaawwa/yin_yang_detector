import ghpages from 'gh-pages'


const GIT_URL = 'git@github.com-yin-yang:slaawwa/yin_yang_detector.git';

const main = async () => {
  await new Promise((resolve, reject) => {
      ghpages.publish('dist', {
          message: 'Auto-generated commit',
          // remote: 'origin',
          tag: 'v0.0.1',
          // push: false,
          // silent: true,
          // history: false,
          // remove: '*.json',
          repo: GIT_URL,
          // repo: `https://git:${GH_TOKEN}@github.com/slaawwa/yin_yang_detector.git`,
          // repo: 'https://github.com/slaawwa/yin_yang_detector.git',
          user: {
              name: 'Viacheslav Kushnir (Auto)',
              email: 'slaawwa@gmail.com'
          },
      }, (err) => {
          if (err) {
              reject(err);
              return;
          }
          console.log('DONE')
          resolve();
      });
  })
}

main();
