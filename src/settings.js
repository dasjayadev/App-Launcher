document.addEventListener("DOMContentLoaded", function () {
    const appForm = document.getElementById("app-form");
    const appNameInput = document.getElementById("app-name");
    const appPathInput = document.getElementById("app-path");
    const appParametersInput = document.getElementById("app-parameters");
    const applicationsList = document.getElementById("applications-list");
  
    // Function to render applications list
    function renderApplications(apps) {
      applicationsList.innerHTML = '';
      apps.forEach(app => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = app.name;
  
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeApplication(app);
  
        li.appendChild(removeButton);
        applicationsList.appendChild(li);
      });
    }
  
    // Fetch the list of applications from the server
    function fetchApplications() {
      fetch("/apps")
        .then(response => response.json())
        .then(data => renderApplications(data))
        .catch(error => console.error("Error fetching applications:", error));
    }
  
    // Function to add a new application
    appForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const newApp = {
        name: appNameInput.value,
        path: appPathInput.value,
        parameters: appParametersInput.value
      };
  
      fetch("/apps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApp),
      })
      .then(response => response.json())
      .then(data => {
        appNameInput.value = '';
        appPathInput.value = '';
        appParametersInput.value = '';
        fetchApplications(); // Refresh the list
      })
      .catch(error => console.error("Error adding application:", error));
    });
  
    // Function to remove an application
    function removeApplication(app) {
      fetch(`/apps/${encodeURIComponent(app.path)}`, {
        method: "DELETE",
      })
      .then(response => response.json())
      .then(data => {
        fetchApplications(); // Refresh the list
      })
      .catch(error => console.error("Error removing application:", error));
    }
  
    // Initial fetch of applications
    fetchApplications();
  });
  