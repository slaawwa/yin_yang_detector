import ghpages from 'gh-pages'
import { promises as fs } from 'fs'

// https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys
const GIT_URL = 'git@github.com-yin-yang:slaawwa/yin_yang_detector.git';

const main = async () => {
  await new Promise(async (resolve, reject) => {
    const pkgApi = await fs.readFile('./dist/api.json').then(pkg => JSON.parse(pkg))
    console.log(' - pkgApi:14 >', pkgApi.version); // eslint-disable-line no-console
    ghpages.publish('dist', {
      message: `Auto-generated commit [v${pkgApi.version}]`,
      // remote: 'origin',
      tag: `v${pkgApi.version}`,
      // push: false,
      // silent: true,
      history: false,
      // remove: '*.json',
      // repo: 'git@github.com:slaawwa/yin_yang_detector.git',
      repo: GIT_URL,
      // add: true,
      // async boforeAdd(git) {
      //   // TODO: Increment `package.json` version
      //   const pkg = await fs.readFile('./package.json').then(pkg => JSON.parse(pkg))
      //   console.log(' - pkg:25 >', pkg); // eslint-disable-line no-console
      //   console.log(' - pkg.version:26 >', pkg.version); // eslint-disable-line no-console
      //   return git.add('./package.json');
      // },
      // repo: `https://git:${GH_TOKEN}@github.com/slaawwa/yin_yang_detector.git`,
      // repo: 'https://github.com/slaawwa/yin_yang_detector.git',
      user: {
        name: '(Auto)',
        email: 'slaawwa@gmail.com'
      },
    }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('DEPLOY:FINISH')
      resolve();
    });
  })
}

main();
