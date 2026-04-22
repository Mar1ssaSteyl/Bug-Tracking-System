const KEYS = {
  issues:   "sprintly_issues",
  projects: "sprintly_projects",
  people:   "sprintly_people"
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
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function getAllIssues() {
  return _load(KEYS.issues);
}

function getIssueById(id) {
  return getAllIssues().find(i => i.id === id) || null;
}

function getIssuesByProject(projectId) {
  return getAllIssues().filter(i => i.projectId === projectId);
}

function getIssuesByStatus(status) {
  return getAllIssues().filter(i => i.status === status);
}

function getIssuesByAssignee(personId) {
  return getAllIssues().filter(i => i.assignedTo === personId);
}

function createIssue(fields) {
  const issues = getAllIssues();
  const now = new Date().toISOString();
  const issue = {
    id:          _uid("ISS"),
    title:       fields.title       || "Untitled Issue",
    projectId:   fields.projectId   || null,
    description: fields.description || "",
    discoverer:  fields.discoverer  || "",
    assignedTo:  fields.assignedTo  || "",
    status:      fields.status      || "backlog",
    priority:    fields.priority    || "medium",
    startDate:   fields.startDate   || "",
    dueDate:     fields.dueDate     || "",
    targetDate:  fields.targetDate  || "",
    dateSolved:  fields.dateSolved  || "",
    resolution:  fields.resolution  || "",
    createdAt:   now,
    updatedAt:   now
  };
  issues.push(issue);
  _save(KEYS.issues, issues);
  return issue;
}

function updateIssue(id, changes) {
  const issues = getAllIssues();
  const idx = issues.findIndex(i => i.id === id);
  if (idx === -1) return null;
  issues[idx] = { ...issues[idx], ...changes, updatedAt: new Date().toISOString() };
  _save(KEYS.issues, issues);
  return issues[idx];
}

function deleteIssue(id) {
  const issues = getAllIssues();
  const filtered = issues.filter(i => i.id !== id);
  if (filtered.length === issues.length) return false;
  _save(KEYS.issues, filtered);
  return true;
}

function assignIssue(issueId, personId) {
  return updateIssue(issueId, {
    assignedTo: personId,
    status: "assigned"
  });
}

function getEffectiveStatus(issue) {
  if (issue.status === "done") return "done";
  if (issue.dueDate) {
    const due = new Date(issue.dueDate);
    if (!isNaN(due) && due < new Date()) return "overdue";
  }
  return issue.status;
}

function getAllProjects() {
  return _load(KEYS.projects);
}

function getProjectById(id) {
  return getAllProjects().find(p => p.id === id) || null;
}

function createProject(fields) {
  const projects = getAllProjects();
  const project = {
    id:          _uid("PRJ"),
    name:        fields.name        || "Unnamed Project",
    description: fields.description || "",
    createdAt:   new Date().toISOString()
  };
  projects.push(project);
  _save(KEYS.projects, projects);
  return project;
}

function updateProject(id, changes) {
  const projects = getAllProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return null;
  projects[idx] = { ...projects[idx], ...changes };
  _save(KEYS.projects, projects);
  return projects[idx];
}

function deleteProject(id) {
  const projects = getAllProjects();
  const filtered = projects.filter(p => p.id !== id);
  if (filtered.length === projects.length) return false;
  _save(KEYS.projects, filtered);
  return true;
}

function getAllPeople() {
  return _load(KEYS.people);
}

function getPersonById(id) {
  return getAllPeople().find(p => p.id === id) || null;
}

function createPerson(fields) {
  const people = getAllPeople();
  const person = {
    id:        _uid("PER"),
    name:      fields.name  || "Unknown",
    email:     fields.email || "",
    role:      fields.role  || "Developer",
    createdAt: new Date().toISOString()
  };
  people.push(person);
  _save(KEYS.people, people);
  return person;
}

function updatePerson(id, changes) {
  const people = getAllPeople();
  const idx = people.findIndex(p => p.id === id);
  if (idx === -1) return null;
  people[idx] = { ...people[idx], ...changes };
  _save(KEYS.people, people);
  return people[idx];
}

function deletePerson(id) {
  const people = getAllPeople();
  const filtered = people.filter(p => p.id !== id);
  if (filtered.length === people.length) return false;
  _save(KEYS.people, filtered);
  return true;
}

function clearAllData() {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

function exportAllData() {
  return {
    issues:   getAllIssues(),
    projects: getAllProjects(),
    people:   getAllPeople()
  };
}

if (typeof module !== "undefined") {
  module.exports = {
    getAllIssues, getIssueById, getIssuesByProject,
    getIssuesByStatus, getIssuesByAssignee,
    createIssue, updateIssue, deleteIssue,
    assignIssue, getEffectiveStatus,
    getAllProjects, getProjectById, createProject, updateProject, deleteProject,
    getAllPeople, getPersonById, createPerson, updatePerson, deletePerson,
    clearAllData, exportAllData
  };
}
function initStorage() {
  return exportAllData();
}
function loadIssues() {
  return getAllIssues();
}