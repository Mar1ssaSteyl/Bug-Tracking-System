const KEYS = {
  issues: "sprintly_issues",
  projects: "sprintly_projects",
  people: "sprintly_people"
};

function _load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function _save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function _uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function _today() {
  return new Date().toISOString().slice(0, 10);
}

function _normaliseProject(project) {
  return {
    id: project.id || _uid("PRJ"),
    name: project.name || "Unnamed Project",
    description: project.description || "",
    createdAt: project.createdAt || new Date().toISOString()
  };
}

function _normalisePerson(person) {
  const fullName = person.name || "";
  let firstName = person.name || "";
  let surname = person.surname || "";

  if (!person.surname && fullName.includes(" ")) {
    const parts = fullName.trim().split(" ");
    firstName = parts[0];
    surname = parts.slice(1).join(" ");
  }

  return {
    id: person.id || _uid("PER"),
    name: firstName || "Unknown",
    surname: surname || "",
    email: person.email || "",
    username: person.username || _makeUsername(firstName || "user", surname || ""),
    role: person.role || "Developer",
    avatar: person.avatar || "",
    createdAt: person.createdAt || new Date().toISOString()
  };
}

function _deriveWorkflow(issue) {
  if (issue.workflow) return issue.workflow;
  if (issue.status === "resolved" || issue.status === "done") return "done";
  if (!issue.assignedTo) return "backlog";
  if (issue.status === "assigned") return "assigned";
  if (issue.status === "underway" || issue.status === "in progress") return "underway";
  return "assigned";
}

function _normaliseIssue(issue) {
  return {
    id: issue.id || _uid("ISS"),
    summary: issue.summary || issue.title || "Untitled Issue",
    description: issue.description || "",
    discoveredBy: issue.discoveredBy || issue.discoverer || "",
    dateIdentified: issue.dateIdentified || issue.startDate || _today(),
    projectId: issue.projectId || "",
    assignedTo: issue.assignedTo || "",
    workflow: _deriveWorkflow(issue),
    status: issue.status === "done" ? "resolved" : (issue.status || "open"),
    priority: issue.priority || "medium",
    targetDate: issue.targetDate || issue.dueDate || "",
    actualResolutionDate: issue.actualResolutionDate || issue.dateSolved || "",
    resolutionSummary: issue.resolutionSummary || issue.resolution || "",
    createdAt: issue.createdAt || new Date().toISOString(),
    updatedAt: issue.updatedAt || issue.createdAt || new Date().toISOString()
  };
}

function _makeUsername(name, surname) {
  const base = `${name}.${surname}`.toLowerCase().replace(/[^a-z0-9.]/g, "").replace(/\.+/g, ".");
  return base || `user${Math.floor(Math.random() * 1000)}`;
}

function _uniqueUsername(username) {
  const people = getAllPeople();
  if (!people.some(p => p.username === username)) return username;

  let count = 1;
  let next = `${username}${count}`;
  while (people.some(p => p.username === next)) {
    count++;
    next = `${username}${count}`;
  }
  return next;
}

/* PROJECTS */
function getAllProjects() {
  return _load(KEYS.projects).map(_normaliseProject);
}

function getProjectById(id) {
  return getAllProjects().find(project => project.id === id) || null;
}

function createProject(fields) {
  const projects = getAllProjects();
  const project = _normaliseProject(fields);
  projects.push(project);
  _save(KEYS.projects, projects);
  return project;
}

function updateProject(id, changes) {
  const projects = getAllProjects();
  const index = projects.findIndex(project => project.id === id);
  if (index === -1) return null;

  projects[index] = {
    ...projects[index],
    ...changes
  };

  _save(KEYS.projects, projects);
  return projects[index];
}

function deleteProject(id) {
  const projects = getAllProjects();
  const filtered = projects.filter(project => project.id !== id);
  if (filtered.length === projects.length) return false;
  _save(KEYS.projects, filtered);
  return true;
}

/* PEOPLE */
function getAllPeople() {
  return _load(KEYS.people).map(_normalisePerson);
}

function getPersonById(id) {
  return getAllPeople().find(person => person.id === id) || null;
}

function createPerson(fields) {
  const people = getAllPeople();
  const username = _uniqueUsername(fields.username || _makeUsername(fields.name || "user", fields.surname || ""));
  const person = _normalisePerson({
    ...fields,
    username
  });

  people.push(person);
  _save(KEYS.people, people);
  return person;
}

function updatePerson(id, changes) {
  const people = getAllPeople();
  const index = people.findIndex(person => person.id === id);
  if (index === -1) return null;

  if (changes.username) {
    changes.username = _uniqueUsername(changes.username);
  }

  people[index] = {
    ...people[index],
    ...changes
  };

  _save(KEYS.people, people);
  return people[index];
}

function deletePerson(id) {
  const people = getAllPeople();
  const filtered = people.filter(person => person.id !== id);
  if (filtered.length === people.length) return false;
  _save(KEYS.people, filtered);
  return true;
}

/* ISSUES */
function getAllIssues() {
  return _load(KEYS.issues).map(_normaliseIssue);
}

function getIssueById(id) {
  return getAllIssues().find(issue => issue.id === id) || null;
}

function getIssuesByProject(projectId) {
  return getAllIssues().filter(issue => issue.projectId === projectId);
}

function getIssuesByWorkflow(workflow) {
  return getAllIssues().filter(issue => issue.workflow === workflow);
}

function getIssuesByAssignee(personId) {
  return getAllIssues().filter(issue => issue.assignedTo === personId);
}

function createIssue(fields) {
  const issues = getAllIssues();
  const issue = _normaliseIssue({
    ...fields,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  if (issue.status === "resolved") {
    issue.workflow = "done";
    issue.actualResolutionDate = issue.actualResolutionDate || _today();
  }

  issues.push(issue);
  _save(KEYS.issues, issues);
  return issue;
}

function updateIssue(id, changes) {
  const issues = getAllIssues();
  const index = issues.findIndex(issue => issue.id === id);
  if (index === -1) return null;

  const updated = {
    ...issues[index],
    ...changes,
    updatedAt: new Date().toISOString()
  };

  if (updated.status === "resolved") {
    updated.workflow = "done";
    updated.actualResolutionDate = updated.actualResolutionDate || _today();
  }

  if (updated.status === "open" && updated.workflow === "done") {
    updated.workflow = updated.assignedTo ? "underway" : "backlog";
  }

  issues[index] = _normaliseIssue(updated);
  _save(KEYS.issues, issues);
  return issues[index];
}

function deleteIssue(id) {
  const issues = getAllIssues();
  const filtered = issues.filter(issue => issue.id !== id);
  if (filtered.length === issues.length) return false;
  _save(KEYS.issues, filtered);
  return true;
}

function assignIssue(issueId, personId) {
  return updateIssue(issueId, {
    assignedTo: personId,
    workflow: personId ? "assigned" : "backlog",
    status: "open"
  });
}

function getEffectiveStatus(issue) {
  if (issue.status === "resolved") return "resolved";

  if (issue.targetDate) {
    const target = new Date(issue.targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isNaN(target) && target < today) {
      return "overdue";
    }
  }

  return "open";
}

/* HELPERS */
function clearAllData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  localStorage.removeItem("sprintly_seeded");
  localStorage.removeItem("sprintly_open_create");
}

function exportAllData() {
  return {
    issues: getAllIssues(),
    projects: getAllProjects(),
    people: getAllPeople()
  };
}

function initStorage() {
  return exportAllData();
}

function loadIssues() {
  return getAllIssues();
}

if (typeof module !== "undefined") {
  module.exports = {
    getAllIssues,
    getIssueById,
    getIssuesByProject,
    getIssuesByWorkflow,
    getIssuesByAssignee,
    createIssue,
    updateIssue,
    deleteIssue,
    assignIssue,
    getEffectiveStatus,
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getAllPeople,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
    clearAllData,
    exportAllData
  };
}