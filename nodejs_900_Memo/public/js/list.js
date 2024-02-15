document.addEventListener("DOMContentLoaded", () => {
  const list_table = document.querySelector("div.listbox");

  list_table?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "LI" || target.tagName === "IMG") {
      const ul = target.closest("UL");
      const m_seq = ul.dataset.seq;

      document.location.replace(`/${m_seq}/detail`);
    }
  });
});
