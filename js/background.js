chrome.runtime.onInstalled.addListener(() => {
  console.log('installed', chrome.storage);
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green');
  });
});
