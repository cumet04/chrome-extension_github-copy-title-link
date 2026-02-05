new MutationObserver((_) => {
  entry();
}).observe(document.body, {
  childList: true,
  subtree: true,
});

function entry() {
  const id = "copy-title-link";
  if (document.getElementById(id)) return;

  // issueページのtitle取得を試みて、なければPRページのtitle取得を試みる
  const title = document.querySelector("[data-testid='issue-title']") ||
    document.querySelector("h1.gh-header-title  > .js-issue-title");

  title.append(createButton(id));
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

  button.addEventListener("click", () => {
    // PRの差分ページなど、URL末尾に意図せぬURL成分がついている場合があるので除去
    // MEMO: title DOMの取得もそうだが、issueとPRで処理分けたほうが良さそう
    const url = document.location.toString()
      .replace(/(issues\/\d+).*$/, "$1")
      .replace(/(pull\/\d+).*$/, "$1");
    const name = title.textContent;

    const item = new window.ClipboardItem({
      "text/html": new Blob([`<a href=${url}>${name}</a>`], {
        type: "text/html",
      }),
      "text/plain": new Blob([name], { type: "text/plain" }),
    });

    navigator.clipboard.write([item]);
  });

  return button;
}
