export default defineContentScript({
  matches: ['*://*.bandcamp.com/*'],
  main() {
    console.log('Hello content.');
  },
});
