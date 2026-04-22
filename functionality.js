document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.dataset.page || "";

    bindGlobalNavigation();

    if (page === "dashboard") {
        initDashboardPage();
    }

    if (page === "grid") {
        initGridPage();
    }

    if (page === "profile") {
        initProfilePage();
    }
});

let currentIssueId = null;

function bindGlobalNavigation() {
    const addTaskBtn = document.getElementById("addTask");
    const addProjectBtn = document.getElementById("addProject");

    if (addTaskBtn) {
        addTaskBtn.addEventListener("click", function () {
            if (document.body.dataset.page === "dashboard") {
                openIssueForm();
            } else {
                localStorage.setItem("sprintly_open_create", "true");
                window.location.href = "dashboard.html";
            }
        });
    }

    if (addProjectBtn) {
        addProjectBtn.addEventListener("click", function () {
            window.location.href = "profile.html#projectsSection";
        });
    }
}

function initDashboardPage() {
    populateIssueFormSelects();
    bindIssueFormEvents();
    bindDetailModalEvents();

    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", renderDashboardBoard);
    }

    renderDashboardBoard();

    if (localStorage.getItem("sprintly_open_create") === "true") {
        localStorage.removeItem("sprintly_open_create");
        openIssueForm();
    }

    const editIssueId = localStorage.getItem("sprintly_edit_issue");
    if (editIssueId) {
        localStorage.removeItem("sprintly_edit_issue");
        openIssueForm(editIssueId);
    }
}

function initGridPage() {
    bindDetailModalEvents();
    populateProjectFilter();

    const searchGrid = document.getElementById("searchGrid");
    const projectFilter = document.getElementById("projectFilter");
    const statusFilter = document.getElementById("statusFilter");

    if (searchGrid) searchGrid.addEventListener("input", renderGridTable);
    if (projectFilter) projectFilter.addEventListener("change", renderGridTable);
    if (statusFilter) statusFilter.addEventListener("change", renderGridTable);

    renderGridTable();
}

function initProfilePage() {
    bindProfileForms();
    renderProfileData();
}

function populateIssueFormSelects() {
    const projectSelect = document.getElementById("issueProject");
    const discovererSelect = document.getElementById("issueDiscoverer");
    const assignedSelect = document.getElementById("issueAssignedTo");

    const projects = getAllProjects();
    const people = getAllPeople();

    if (projectSelect) {
        projectSelect.innerHTML = `<option value="">Select project</option>`;
        projects.forEach(project => {
            projectSelect.innerHTML += `<option value="${project.id}">${escapeHtml(project.name)}</option>`;
        });
    }

    if (discovererSelect) {
        discovererSelect.innerHTML = `<option value="">Select person</option>`;
        people.forEach(person => {
            discovererSelect.innerHTML += `<option value="${person.id}">${escapeHtml(fullName(person))}</option>`;
        });
    }

    if (assignedSelect) {
        assignedSelect.innerHTML = `<option value="">Unassigned</option>`;
        people.forEach(person => {
            assignedSelect.innerHTML += `<option value="${person.id}">${escapeHtml(fullName(person))}</option>`;
        });
    }
}

function populateProjectFilter() {
    const projectFilter = document.getElementById("projectFilter");
    if (!projectFilter) return;

    const currentValue = projectFilter.value;
    projectFilter.innerHTML = `<option value="">All Projects</option>`;

    getAllProjects().forEach(project => {
        projectFilter.innerHTML += `<option value="${project.id}">${escapeHtml(project.name)}</option>`;
    });

    if ([...projectFilter.options].some(option => option.value === currentValue)) {
        projectFilter.value = currentValue;
    }
}

function bindIssueFormEvents() {
    const saveBtn = document.getElementById("formAddBtn");
    const cancelBtn = document.getElementById("formCancelBtn");
    const statusSelect = document.getElementById("issueStatus");
    const workflowSelect = document.getElementById("issueWorkflow");

    if (saveBtn) {
        saveBtn.addEventListener("click", saveIssueFromForm);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", closeAllModals);
    }

    if (statusSelect) {
        statusSelect.addEventListener("change", function () {
            if (statusSelect.value === "resolved" && workflowSelect) {
                workflowSelect.value = "done";
            }
        });
    }
}

function bindDetailModalEvents() {
    const detailCloseBtn = document.getElementById("detailCloseBtn");
    const detailEditBtn = document.getElementById("detailEditBtn");
    const detailDeleteBtn = document.getElementById("detailDeleteBtn");
    const overlay = document.getElementById("modalOverlay");

    if (detailCloseBtn) {
        detailCloseBtn.addEventListener("click", closeAllModals);
    }

    if (overlay) {
        overlay.addEventListener("click", closeAllModals);
    }

    if (detailEditBtn) {
        detailEditBtn.addEventListener("click", function () {
            if (!currentIssueId) return;

            if (document.body.dataset.page === "dashboard") {
                closeDetailModal();
                openIssueForm(currentIssueId);
            } else {
                localStorage.setItem("sprintly_edit_issue", currentIssueId);
                window.location.href = "dashboard.html";
            }
        });
    }

    if (detailDeleteBtn) {
        detailDeleteBtn.addEventListener("click", function () {
            if (!currentIssueId) return;

            const confirmDelete = confirm("Are you sure you want to delete this issue?");
            if (!confirmDelete) return;

            deleteIssue(currentIssueId);
            currentIssueId = null;
            closeAllModals();
            refreshCurrentPage();
        });
    }
}

function openIssueForm(issueId = null) {
    populateIssueFormSelects();

    const formPopup = document.getElementById("form_Popup");
    const overlay = document.getElementById("modalOverlay");
    const formTitle = document.getElementById("formTitle");

    if (!formPopup || !overlay) return;

    resetIssueForm();

    if (issueId) {
        const issue = getIssueById(issueId);
        if (!issue) return;

        document.getElementById("issueId").value = issue.id;
        document.getElementById("issueSummary").value = issue.summary;
        document.getElementById("issueDescription").value = issue.description;
        document.getElementById("issueDiscoverer").value = issue.discoveredBy || "";
        document.getElementById("issueDateIdentified").value = issue.dateIdentified || "";
        document.getElementById("issueProject").value = issue.projectId || "";
        document.getElementById("issueAssignedTo").value = issue.assignedTo || "";
        document.getElementById("issueWorkflow").value = issue.workflow || "backlog";
        document.getElementById("issueStatus").value = issue.status || "open";
        document.getElementById("issueTargetDate").value = issue.targetDate || "";
        document.getElementById("issueActualResolutionDate").value = issue.actualResolutionDate || "";
        document.getElementById("issueResolutionSummary").value = issue.resolutionSummary || "";

        const priorityInput = document.querySelector(`input[name="priority"][value="${issue.priority}"]`);
        if (priorityInput) priorityInput.checked = true;

        if (formTitle) formTitle.textContent = "Edit Issue";
    } else {
        if (formTitle) formTitle.textContent = "Create Issue Form";
    }

    formPopup.style.display = "grid";
    overlay.style.display = "block";
}

function resetIssueForm() {
    const mediumPriority = document.querySelector(`input[name="priority"][value="medium"]`);

    setValue("issueId", "");
    setValue("issueSummary", "");
    setValue("issueDescription", "");
    setValue("issueDiscoverer", "");
    setValue("issueDateIdentified", new Date().toISOString().slice(0, 10));
    setValue("issueProject", "");
    setValue("issueAssignedTo", "");
    setValue("issueWorkflow", "backlog");
    setValue("issueStatus", "open");
    setValue("issueTargetDate", "");
    setValue("issueActualResolutionDate", "");
    setValue("issueResolutionSummary", "");

    if (mediumPriority) mediumPriority.checked = true;
}

function saveIssueFromForm() {
    const issueId = getValue("issueId").trim();
    const summary = getValue("issueSummary").trim();
    const description = getValue("issueDescription").trim();
    const discoveredBy = getValue("issueDiscoverer");
    const dateIdentified = getValue("issueDateIdentified");
    const projectId = getValue("issueProject");
    const assignedTo = getValue("issueAssignedTo");
    let workflow = getValue("issueWorkflow");
    let status = getValue("issueStatus");
    const priority = getSelectedPriority();
    const targetDate = getValue("issueTargetDate");
    let actualResolutionDate = getValue("issueActualResolutionDate");
    const resolutionSummary = getValue("issueResolutionSummary").trim();

    if (!summary || !description || !discoveredBy || !dateIdentified || !projectId || !priority || !targetDate) {
        alert("Please complete all required issue fields.");
        return;
    }

    if (status === "resolved" && !actualResolutionDate) {
        actualResolutionDate = new Date().toISOString().slice(0, 10);
    }

    if (status === "resolved") {
        workflow = "done";
    }

    const payload = {
        summary,
        description,
        discoveredBy,
        dateIdentified,
        projectId,
        assignedTo,
        workflow,
        status,
        priority,
        targetDate,
        actualResolutionDate,
        resolutionSummary
    };

    if (issueId) {
        updateIssue(issueId, payload);
    } else {
        createIssue(payload);
    }

    closeAllModals();
    refreshCurrentPage();
}

function getSelectedPriority() {
    const checked = document.querySelector('input[name="priority"]:checked');
    return checked ? checked.value : "";
}

function renderDashboardBoard() {
    const backlogList = document.getElementById("backlogList");
    const assignedList = document.getElementById("assignedList");
    const underwayList = document.getElementById("underwayList");
    const doneList = document.getElementById("doneList");
    const searchValue = (document.getElementById("search")?.value || "").toLowerCase();

    if (!backlogList || !assignedList || !underwayList || !doneList) return;

    backlogList.innerHTML = "";
    assignedList.innerHTML = "";
    underwayList.innerHTML = "";
    doneList.innerHTML = "";

    const issues = getAllIssues()
        .filter(issue => issue.summary.toLowerCase().includes(searchValue))
        .sort(sortIssues);

    issues.forEach(issue => {
        const card = createIssueCard(issue);

        if (issue.workflow === "backlog") backlogList.appendChild(card);
        if (issue.workflow === "assigned") assignedList.appendChild(card);
        if (issue.workflow === "underway") underwayList.appendChild(card);
        if (issue.workflow === "done") doneList.appendChild(card);
    });

    renderDashboardStats(issues);
}

function renderDashboardStats(issues) {
    setText("statTotal", issues.length);
    setText("statOpen", issues.filter(issue => getEffectiveStatus(issue) === "open").length);
    setText("statResolved", issues.filter(issue => getEffectiveStatus(issue) === "resolved").length);
    setText("statOverdue", issues.filter(issue => getEffectiveStatus(issue) === "overdue").length);
}

function createIssueCard(issue) {
    const card = document.createElement("div");
    card.className = "ticketCard";

    const project = getProjectById(issue.projectId);
    const assigneeName = resolvePersonName(issue.assignedTo);
    const effectiveStatus = getEffectiveStatus(issue);

    card.innerHTML = `
        <h4 class="ticketTitle">${escapeHtml(issue.summary)}</h4>
        <p class="ticketMeta">${project ? escapeHtml(project.name) : "No project"}</p>
        <p class="ticketMeta">${escapeHtml(assigneeName || "Unassigned")}</p>
        <div class="badgeRow">
            <span class="badge priority-${issue.priority}">${capitalize(issue.priority)}</span>
            <span class="badge status-${effectiveStatus}">${capitalize(effectiveStatus)}</span>
        </div>
    `;

    card.addEventListener("click", function () {
        openIssueDetail(issue.id);
    });

    return card;
}

function renderGridTable() {
    const tableBody = document.getElementById("issuesTableBody");
    if (!tableBody) return;

    const searchValue = (document.getElementById("searchGrid")?.value || "").toLowerCase();
    const projectFilter = document.getElementById("projectFilter")?.value || "";
    const statusFilter = document.getElementById("statusFilter")?.value || "";

    populateProjectFilter();

    const issues = getAllIssues()
        .filter(issue => issue.summary.toLowerCase().includes(searchValue))
        .filter(issue => !projectFilter || issue.projectId === projectFilter)
        .filter(issue => !statusFilter || getEffectiveStatus(issue) === statusFilter)
        .sort(sortIssues);

    tableBody.innerHTML = "";

    if (issues.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="emptyStateCell">No issues found.</td>
            </tr>
        `;
        return;
    }

    issues.forEach(issue => {
        const row = document.createElement("tr");
        const project = getProjectById(issue.projectId);
        const effectiveStatus = getEffectiveStatus(issue);

        row.innerHTML = `
            <td>${escapeHtml(issue.summary)}</td>
            <td>${project ? escapeHtml(project.name) : "No project"}</td>
            <td>${escapeHtml(resolvePersonName(issue.assignedTo) || "Unassigned")}</td>
            <td><span class="badge status-${effectiveStatus}">${capitalize(effectiveStatus)}</span></td>
            <td><span class="badge priority-${issue.priority}">${capitalize(issue.priority)}</span></td>
            <td>${issue.dateIdentified || "-"}</td>
            <td>${issue.targetDate || "-"}</td>
            <td class="actionCell">
                <button type="button" class="smallBtn" data-action="view" data-id="${issue.id}">View</button>
                <button type="button" class="smallBtn" data-action="edit" data-id="${issue.id}">Edit</button>
                <button type="button" class="smallBtn deleteSmallBtn" data-action="delete" data-id="${issue.id}">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    tableBody.querySelectorAll("button[data-action]").forEach(button => {
        button.addEventListener("click", function () {
            const action = button.dataset.action;
            const id = button.dataset.id;

            if (action === "view") {
                openIssueDetail(id);
            }

            if (action === "edit") {
                localStorage.setItem("sprintly_edit_issue", id);
                window.location.href = "dashboard.html";
            }

            if (action === "delete") {
                const confirmDelete = confirm("Delete this issue?");
                if (!confirmDelete) return;
                deleteIssue(id);
                renderGridTable();
            }
        });
    });
}

function openIssueDetail(issueId) {
    const issue = getIssueById(issueId);
    const detailModal = document.getElementById("issueDetailModal");
    const detailContent = document.getElementById("issueDetailContent");
    const overlay = document.getElementById("modalOverlay");

    if (!issue || !detailModal || !detailContent || !overlay) return;

    currentIssueId = issue.id;

    const project = getProjectById(issue.projectId);
    const discoverer = resolvePersonName(issue.discoveredBy);
    const assignee = resolvePersonName(issue.assignedTo);
    const effectiveStatus = getEffectiveStatus(issue);

    detailContent.innerHTML = `
        <div class="detailGrid">
            <div><strong>Summary:</strong><br>${escapeHtml(issue.summary)}</div>
            <div><strong>Project:</strong><br>${project ? escapeHtml(project.name) : "No project"}</div>
            <div><strong>Identified By:</strong><br>${escapeHtml(discoverer || "Unknown")}</div>
            <div><strong>Date Identified:</strong><br>${issue.dateIdentified || "-"}</div>
            <div><strong>Assigned To:</strong><br>${escapeHtml(assignee || "Unassigned")}</div>
            <div><strong>Board Column:</strong><br>${capitalizeWorkflow(issue.workflow)}</div>
            <div><strong>Status:</strong><br>${capitalize(effectiveStatus)}</div>
            <div><strong>Priority:</strong><br>${capitalize(issue.priority)}</div>
            <div><strong>Target Date:</strong><br>${issue.targetDate || "-"}</div>
            <div><strong>Actual Resolution Date:</strong><br>${issue.actualResolutionDate || "-"}</div>
            <div class="fullSpan"><strong>Description:</strong><br>${escapeHtml(issue.description || "-")}</div>
            <div class="fullSpan"><strong>Resolution Summary:</strong><br>${escapeHtml(issue.resolutionSummary || "-")}</div>
        </div>
    `;

    detailModal.style.display = "block";
    overlay.style.display = "block";
}

function closeDetailModal() {
    const detailModal = document.getElementById("issueDetailModal");
    if (detailModal) detailModal.style.display = "none";
}

function closeAllModals() {
    const formPopup = document.getElementById("form_Popup");
    const detailModal = document.getElementById("issueDetailModal");
    const overlay = document.getElementById("modalOverlay");

    if (formPopup) formPopup.style.display = "none";
    if (detailModal) detailModal.style.display = "none";
    if (overlay) overlay.style.display = "none";
}

function bindProfileForms() {
    const personForm = document.getElementById("personForm");
    const projectForm = document.getElementById("projectForm");

    if (personForm) {
        personForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = getValue("personName").trim();
            const surname = getValue("personSurname").trim();
            const email = getValue("personEmail").trim();
            const username = getValue("personUsername").trim();
            const role = getValue("personRole").trim();

            if (!name || !surname || !email || !username || !role) {
                alert("Please complete all person fields.");
                return;
            }

            createPerson({ name, surname, email, username, role });
            personForm.reset();
            renderProfileData();
        });
    }

    if (projectForm) {
        projectForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = getValue("projectNameInput").trim();
            const description = getValue("projectDescriptionInput").trim();

            if (!name) {
                alert("Please enter a project name.");
                return;
            }

            createProject({ name, description });
            projectForm.reset();
            renderProfileData();
        });
    }
}

function renderProfileData() {
    const peopleList = document.getElementById("peopleList");
    const projectList = document.getElementById("projectList");

    if (peopleList) {
        const people = getAllPeople();
        peopleList.innerHTML = people.map(person => `
            <div class="infoCard">
                <div class="infoCardHeader">
                    <h4>${escapeHtml(fullName(person))}</h4>
                    <div class="cardActionGroup">
                        <button type="button" class="iconDangerBtn" data-person-delete="${person.id}">Remove</button>
                    </div>
                </div>
                <p><strong>Username:</strong> ${escapeHtml(person.username)}</p>
                <p><strong>Email:</strong> ${escapeHtml(person.email)}</p>
                <p><strong>Role:</strong> ${escapeHtml(person.role)}</p>
                <p><strong>Assigned Issues:</strong> ${getIssuesByAssignee(person.id).length}</p>
                <p class="helpText">Removing a person will unassign their issues.</p>
            </div>
        `).join("");

        peopleList.querySelectorAll("[data-person-delete]").forEach(button => {
            button.addEventListener("click", function () {
                handleDeletePerson(button.dataset.personDelete);
            });
        });
    }

    if (projectList) {
        const projects = getAllProjects();
        projectList.innerHTML = projects.map(project => `
            <div class="infoCard">
                <div class="infoCardHeader">
                    <h4>${escapeHtml(project.name)}</h4>
                    <div class="cardActionGroup">
                        <button type="button" class="iconDangerBtn" data-project-delete="${project.id}">Remove</button>
                    </div>
                </div>
                <p>${escapeHtml(project.description || "No description")}</p>
                <p><strong>Total Issues:</strong> ${getIssuesByProject(project.id).length}</p>
                <p class="helpText">A project can only be removed when it has no linked issues.</p>
            </div>
        `).join("");

        projectList.querySelectorAll("[data-project-delete]").forEach(button => {
            button.addEventListener("click", function () {
                handleDeleteProject(button.dataset.projectDelete);
            });
        });
    }
}

function handleDeletePerson(personId) {
    const person = getPersonById(personId);
    if (!person) return;

    const assignedIssues = getIssuesByAssignee(personId);

    const confirmMessage = assignedIssues.length > 0
        ? `Remove ${fullName(person)}?\n\nThis will unassign ${assignedIssues.length} issue(s).`
        : `Remove ${fullName(person)}?`;

    const confirmed = confirm(confirmMessage);
    if (!confirmed) return;

    assignedIssues.forEach(issue => {
        updateIssue(issue.id, {
            assignedTo: "",
            workflow: issue.status === "resolved" ? "done" : "backlog"
        });
    });

    deletePerson(personId);
    renderProfileData();
}

function handleDeleteProject(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;

    const projectIssues = getIssuesByProject(projectId);

    if (projectIssues.length > 0) {
        alert(`You cannot remove "${project.name}" because it still has ${projectIssues.length} issue(s) linked to it.`);
        return;
    }

    const confirmed = confirm(`Remove project "${project.name}"?`);
    if (!confirmed) return;

    deleteProject(projectId);
    renderProfileData();
}

function refreshCurrentPage() {
    const page = document.body.dataset.page;

    if (page === "dashboard") renderDashboardBoard();
    if (page === "grid") renderGridTable();
    if (page === "profile") renderProfileData();
}

function sortIssues(a, b) {
    const priorityRank = { high: 3, medium: 2, low: 1 };
    return (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0);
}

function resolvePersonName(value) {
    if (!value) return "";
    const person = getPersonById(value);
    return person ? fullName(person) : value;
}

function fullName(person) {
    return `${person.name || ""} ${person.surname || ""}`.trim();
}

function capitalize(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function capitalizeWorkflow(workflow) {
    const map = {
        backlog: "Backlog",
        assigned: "Assigned",
        underway: "In Progress",
        done: "Done"
    };
    return map[workflow] || capitalize(workflow);
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
}

function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}