
const tabsContainer = document.querySelector(".tabs");
const addTabButton = document.querySelector(".add-tabs button");
const siteWindow = document.querySelector(".site-window");

let tabId = 0;

function createTab(url = "https://www.google.com/webhp?igu=1") {
  tabId++;

  const tab = document.createElement("div");
  tab.classList.add("tab");
  tab.dataset.tabId = tabId;

  const spinner = document.createElement("span");
  spinner.textContent = "Loading...";
  tab.appendChild(spinner);

  tab.addEventListener("click", () => switchTab(tabId));

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.classList.add("site-frame");
  iframe.dataset.tabId = tabId;
  iframe.style.display = "none";

  iframe.addEventListener("load", () => {
    tab.innerHTML = "";

    const icon = document.createElement("img");
    icon.src = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(url).hostname}`;
    icon.style.width = "16px";
    icon.style.height = "16px";
    icon.style.marginRight = "8px";

    const label = document.createElement("span");
    label.textContent = iframe.contentDocument?.title || new URL(url).hostname;

    const closeBtn = document.createElement("i");
    closeBtn.classList.add("fa-solid", "fa-xmark", "close-btn");
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tab.remove();
      iframe.remove();

      const remainingTabs = document.querySelectorAll(".tab");
      if (remainingTabs.length > 0) {
        const lastTabId = remainingTabs[remainingTabs.length - 1].dataset.tabId;
        switchTab(lastTabId);
      }
    });

    tab.appendChild(icon);
    tab.appendChild(label);
    tab.appendChild(closeBtn);
  });

  tabsContainer.appendChild(tab);
  siteWindow.appendChild(iframe);

  switchTab(tabId);
}

function switchTab(id) {
  document.querySelectorAll(".site-frame").forEach(f => {
    f.style.display = f.dataset.tabId === String(id) ? "block" : "none";
  });

  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active-tab", t.dataset.tabId === String(id));
  });
}

addTabButton.addEventListener("click", () => createTab());

createTab();
