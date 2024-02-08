chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get('isHidden', function(data) {
    var isHidden = !data.isHidden; // 状態をトグル
    chrome.storage.local.set({'isHidden': isHidden}); // 新しい状態を保存

    // 全てのタブに対してメッセージを送信
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "toggleHideDollarButtons"});
      }
    });
  });
});
