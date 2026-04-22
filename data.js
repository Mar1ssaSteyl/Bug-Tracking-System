(function seedData() {
  const alreadySeeded = localStorage.getItem("sprintly_seeded");
  if (alreadySeeded) return;

  const proj1 = createProject({
    name: "Sprintly Web App",
    description: "Main customer-facing bug tracking web application."
  });

  const proj2 = createProject({
    name: "Mobile Client",
    description: "iOS and Android companion app for Sprintly."
  });

  const proj3 = createProject({
    name: "Internal Admin Portal",
    description: "Back-office tools for the support team."
  });

  const alice = createPerson({
    name: "Alice",
    surname: "Nkosi",
    email: "alice@sprintly.io",
    username: "alice.nkosi",
    role: "Frontend Developer"
  });

  const bob = createPerson({
    name: "Bob",
    surname: "Patel",
    email: "bob@sprintly.io",
    username: "bob.patel",
    role: "Backend Developer"
  });

  const cara = createPerson({
    name: "Cara",
    surname: "Joubert",
    email: "cara@sprintly.io",
    username: "cara.joubert",
    role: "QA Engineer"
  });

  const dan = createPerson({
    name: "Dan",
    surname: "Mokoena",
    email: "dan@sprintly.io",
    username: "dan.mokoena",
    role: "DevOps Engineer"
  });

  const eve = createPerson({
    name: "Eve",
    surname: "Swanepoel",
    email: "eve@sprintly.io",
    username: "eve.swanepoel",
    role: "UX Designer"
  });

  createIssue({
    summary: "Login page crashes on Safari",
    projectId: proj1.id,
    description: "Users on Safari 17 see a blank white screen after entering credentials. Console shows TypeError on auth.js line 42.",
    discoveredBy: cara.id,
    dateIdentified: "2026-04-01",
    assignedTo: alice.id,
    workflow: "underway",
    status: "open",
    priority: "high",
    targetDate: "2026-04-10",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Dashboard counter shows wrong total",
    projectId: proj1.id,
    description: "The Total Issues badge on the dashboard was counting archived issues.",
    discoveredBy: bob.id,
    dateIdentified: "2026-04-03",
    assignedTo: bob.id,
    workflow: "done",
    status: "resolved",
    priority: "medium",
    targetDate: "2026-04-12",
    actualResolutionDate: "2026-04-11",
    resolutionSummary: "Filtered archived issues from the count query."
  });

  createIssue({
    summary: "Add dark mode support",
    projectId: proj1.id,
    description: "Users have requested a dark mode toggle that respects OS preference.",
    discoveredBy: eve.id,
    dateIdentified: "2026-04-04",
    assignedTo: "",
    workflow: "backlog",
    status: "open",
    priority: "low",
    targetDate: "2026-05-20",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Push notifications not delivered on Android 14",
    projectId: proj2.id,
    description: "FCM tokens are registering correctly but notifications silently fail on Android 14 devices.",
    discoveredBy: cara.id,
    dateIdentified: "2026-04-05",
    assignedTo: dan.id,
    workflow: "assigned",
    status: "open",
    priority: "high",
    targetDate: "2026-04-28",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Profile picture upload fails for files larger than 2MB",
    projectId: proj2.id,
    description: "The image upload endpoint returns 413 Payload Too Large.",
    discoveredBy: alice.id,
    dateIdentified: "2026-04-06",
    assignedTo: bob.id,
    workflow: "underway",
    status: "open",
    priority: "medium",
    targetDate: "2026-04-27",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "SQL injection vulnerability in search endpoint",
    projectId: proj3.id,
    description: "Search parameter was passed directly into raw SQL.",
    discoveredBy: cara.id,
    dateIdentified: "2026-03-20",
    assignedTo: bob.id,
    workflow: "done",
    status: "resolved",
    priority: "high",
    targetDate: "2026-03-25",
    actualResolutionDate: "2026-03-22",
    resolutionSummary: "Replaced raw SQL with parameterised queries."
  });

  createIssue({
    summary: "Export to CSV missing assignee column",
    projectId: proj1.id,
    description: "The CSV export on grid view omits the assignedTo field.",
    discoveredBy: dan.id,
    dateIdentified: "2026-04-07",
    assignedTo: "",
    workflow: "backlog",
    status: "open",
    priority: "medium",
    targetDate: "2026-05-05",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Tooltip text overflows on small screens",
    projectId: proj1.id,
    description: "On 320px-wide viewports the priority tooltip clips outside the viewport.",
    discoveredBy: eve.id,
    dateIdentified: "2026-04-08",
    assignedTo: alice.id,
    workflow: "assigned",
    status: "open",
    priority: "low",
    targetDate: "2026-04-30",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "App crashes on swipe-to-delete gesture",
    projectId: proj2.id,
    description: "Swiping left on a ticket card in the mobile list view causes a crash.",
    discoveredBy: cara.id,
    dateIdentified: "2026-04-09",
    assignedTo: bob.id,
    workflow: "underway",
    status: "open",
    priority: "high",
    targetDate: "2026-04-18",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Admin role cannot delete users",
    projectId: proj3.id,
    description: "The delete-user button was hidden due to a CSS z-index conflict.",
    discoveredBy: dan.id,
    dateIdentified: "2026-03-15",
    assignedTo: eve.id,
    workflow: "done",
    status: "resolved",
    priority: "medium",
    targetDate: "2026-03-26",
    actualResolutionDate: "2026-03-24",
    resolutionSummary: "Raised action area above sidebar stacking context."
  });

  createIssue({
    summary: "Session token not invalidated on logout",
    projectId: proj3.id,
    description: "After logging out, the JWT token remains valid until expiry.",
    discoveredBy: cara.id,
    dateIdentified: "2026-04-10",
    assignedTo: "",
    workflow: "backlog",
    status: "open",
    priority: "high",
    targetDate: "2026-05-01",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  createIssue({
    summary: "Email notifications sent twice on issue update",
    projectId: proj1.id,
    description: "Each issue update triggers two identical emails to the assignee.",
    discoveredBy: alice.id,
    dateIdentified: "2026-04-12",
    assignedTo: dan.id,
    workflow: "assigned",
    status: "open",
    priority: "medium",
    targetDate: "2026-04-25",
    actualResolutionDate: "",
    resolutionSummary: ""
  });

  localStorage.setItem("sprintly_seeded", "true");
})();