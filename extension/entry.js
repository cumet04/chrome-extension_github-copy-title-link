new MutationObserver((_) => {
  const id = "copy-title-link";
  if (document.getElementById(id)) return;

  const title = titleElement();

  // PRの差分ページなど、URL末尾に意図せぬURL成分がついている場合があるので除去
  // MEMO: title DOMの取得もそうだが、issueとPRで処理分けたほうが良さそう
  const url = document.location.toString()
    .replace(/(issues\/\d+).*$/, "$1")
    .replace(/(pull\/\d+).*$/, "$1");
  const name = title.textContent; // この文字列はボタン追加前に（contentが増える前に）取得しておく

  const button = createButton(id);
  button.addEventListener("click", () => {
    const item = new window.ClipboardItem({
      "text/html": new Blob([`<a href=${url}>${name}</a>`], {
        type: "text/html",
      }),
      "text/plain": new Blob([name], { type: "text/plain" }),
    });

    navigator.clipboard.write([item]);
    console.debug(`Copied: ${name} (${url})`);
  });

  title.append(button);
}).observe(document.body, {
  childList: true,
  subtree: true,
});

function titleElement() {
  return document.querySelector("[data-testid='issue-title'") ||
    document.querySelector("h1[data-component=PH_Title] > .markdown-title");
}

function createButton(id) {
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
