document.addEventListener("DOMContentLoaded", function () {
  const appList = document.getElementById("app-list");
  const loadingScreen = document.getElementById("loading-screen");

  
  const apps = [
    {
      name: "Google Chrome",
      icon: "fa fa-chrome",
      path: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      parameters: "https://google.com",
    },
    {
      name: "Visual Studio Code",
      icon: "fa fa-code",
      path: "C:\\Program Files\\Microsoft VS Code\\Code.exe",
      parameters: "",
    },
    {
      name: "Notepad",
      icon: "fa fa-file-alt",
      path: "C:\\Windows\\System32\\notepad.exe",
      parameters: "",
    },
    {
      name: "File Explorer",
      icon: "fa fa-folder-open",
      path: "explorer.exe",
      parameters: "",
    },
    {
      name: "Calculator",
      icon: "fa fa-calculator",
      path: "calc.exe",
      parameters: "",
    },
  ];

  // Function to create application icons
  function createAppIcon(app) {
    const col = document.createElement("div");
    col.className = "col";

    const div = document.createElement("div");
    div.className = "app-icon p-3";
    div.innerHTML = `<i class="${app.icon}"></i><br><span>${app.name}</span>`;
    div.addEventListener("click", () => launchApp(app));

    col.appendChild(div);
    return col;
  }

  // Function to launch an application
  function launchApp(app) {
    loadingScreen.classList.remove("d-none");
    loadingScreen.classList.add("d-flex");

    fetch("/Launcher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appPath: app.path,
        parameters: app.parameters,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        loadingScreen.classList.remove("d-flex");
        loadingScreen.classList.add("d-none");
      })
      .catch((error) => {
        console.error("Error:", error);
        loadingScreen.classList.remove("d-flex");
        loadingScreen.classList.add("d-none");
      });
  }

  // Populate the UI with application icons
  apps.forEach((app) => {
    appList.appendChild(createAppIcon(app));
  });
});
