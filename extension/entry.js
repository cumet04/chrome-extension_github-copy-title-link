navigation.addEventListener("navigate", () => {
  // ブラウザバック時など、ページ遷移が完了する前に処理が動く場合があるので
  // requestIdleCallbackで遷移が安定してから実行する
  window.requestIdleCallback(entry);
});

function entry() {
  const title =
    document.getElementsByClassName("js-issue-title markdown-title")[0];

  const url = document.location.origin + document.location.pathname;
  const name = title.textContent;
  const item = new window.ClipboardItem({
    "text/html": new Blob([`<a href=${url}>${name}</a>`], {
      type: "text/html",
    }),
    "text/plain": new Blob([name], { type: "text/plain" }),
  });

  title.addEventListener("click", () => navigator.clipboard.write([item]));
}
