navigation.addEventListener("navigate", () => {
  // ブラウザバック時など、ページ遷移が完了する前に処理が動く場合があるので
  // requestIdleCallbackで遷移が安定してから実行する
  window.requestIdleCallback(entry);
});
window.addEventListener("load", () => {
  window.requestIdleCallback(entry);
});

function entry() {
  // issueページのtitle取得を試みて、なければPRページのtitle取得を試みる
  const title = document.querySelector("[data-testid='issue-title']") ||
    document.querySelector("h1.gh-header-title  > .js-issue-title");
  const button = ensureButton();

  const url = document.location.origin + document.location.pathname;
  const name = title.textContent;
  const item = new window.ClipboardItem({
    "text/html": new Blob([`<a href=${url}>${name}</a>`], {
      type: "text/html",
    }),
    "text/plain": new Blob([name], { type: "text/plain" }),
  });

  button.addEventListener("click", () => {
    navigator.clipboard.write([item]);
  });
  title.append(button);
}

function ensureButton() {
  const id = "copy-title-link";

  // github内でページ遷移して複数回イベントが発生した場合やブラウザバックした場合などに
  // 既存のボタンが残っている場合があるので、それを削除して新しいボタンを作成する
  document.getElementById(id)?.remove();

  const button = document.createElement("sup");
  button.id = id;

  button.className = "color-fg-muted";
  button.innerHTML = "&#10697;";
  button.style.position = "relative";
  button.style.fontSize = "1rem";
  button.style.top = "-1rem";
  button.style.left = "0.3rem";
  button.style.cursor = "pointer";
  return button;
}
