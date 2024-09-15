navigation.addEventListener("navigate", entry);

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
