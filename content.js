function hideDollarButtons() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    // `textContent` を使用してすべてのテキストを取得
    if (button.textContent.includes('$')) {
      button.style.display = 'none';
    }
  });
}

// 動的コンテンツの変更を監視する
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length) {
      hideDollarButtons();
    }
  });
});

// 監視を開始する
observer.observe(document.body, { childList: true, subtree: true });

// ストレージから設定を読み込む
chrome.storage.local.get('isHidden', function(data) {
  if (data.isHidden) {
    hideDollarButtons();
  }
});

// メッセージリスナー
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleHideDollarButtons") {
    chrome.storage.local.get('isHidden', function(data) {
      if (data.isHidden) {
        hideDollarButtons();
      } else {
        // 表示処理のロジックをここに追加
      }
    });
  }
});
