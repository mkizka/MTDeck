import { Settings } from './ts/utils';

interface FirefoxDetails extends chrome.webRequest.WebRequestBodyDetails {
  originUrl: string
}

Settings.getBool('mtdNoAnimation', isTrue => {
  if (!isTrue) return;

  chrome.webRequest.onBeforeRequest.addListener(
    (details: FirefoxDetails) => {
      const originUrl = details.originUrl ? details.originUrl : details.initiator;
      if (/tweetdeck\.twitter\.com/.test(originUrl)) {

        return {
          cancel: true
        };
      }
    },
    {
      urls: [
        'https://pbs.twimg.com/media/*',
        'https://pbs.twimg.com/tweet_video_thumb',
        'https://pbs.twimg.com/ext_tw_video_thumb/*',
        'https://video.twimg.com/*',
        'https://img.youtube.com/*',
      ],
    },
    ['blocking']
  );
});
