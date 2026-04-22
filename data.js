
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

  const alice = createPerson({ name: "Alice Nkosi",    email: "alice@sprintly.io",   role: "Frontend Developer" });
  const bob   = createPerson({ name: "Bob Patel",      email: "bob@sprintly.io",     role: "Backend Developer"  });
  const cara  = createPerson({ name: "Cara Joubert",   email: "cara@sprintly.io",    role: "QA Engineer"        });
  const dan   = createPerson({ name: "Dan Mokoena",    email: "dan@sprintly.io",     role: "DevOps Engineer"    });
  const eve   = createPerson({ name: "Eve Swanepoel",  email: "eve@sprintly.io",     role: "UX Designer"        });

  createIssue({
    title:       "Login page crashes on Safari",
    projectId:   proj1.id,
    description: "Users on Safari 17 see a blank white screen after entering credentials. Console shows TypeError on auth.js line 42.",
    discoverer:  cara.name,
    assignedTo:  alice.name,
    status:      "underway",
    priority:    "high",
    startDate:   "2025-03-01",
    dueDate:     "2025-03-10",   // past → overdue
    targetDate:  "2025-03-10",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Dashboard counter shows wrong total",
    projectId:   proj1.id,
    description: "The 'Total Issues' badge on the dashboard was counting archived issues. Fixed by filtering status !== 'archived'.",
    discoverer:  bob.name,
    assignedTo:  bob.name,
    status:      "done",
    priority:    "medium",
    startDate:   "2025-03-05",
    dueDate:     "2025-03-12",
    targetDate:  "2025-03-12",
    dateSolved:  "2025-03-11",
    resolution:  "Filtered archived issues from count query."
  });

  createIssue({
    title:       "Add dark mode support",
    projectId:   proj1.id,
    description: "Users have requested a dark mode toggle. Should respect OS preference via prefers-color-scheme media query.",
    discoverer:  eve.name,
    assignedTo:  "",
    status:      "backlog",
    priority:    "low",
    startDate:   "",
    dueDate:     "2025-06-01",
    targetDate:  "2025-06-01",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Push notifications not delivered on Android 14",
    projectId:   proj2.id,
    description: "FCM tokens are registering correctly but notifications silently fail on Android 14 devices. Affects ~30% of mobile users.",
    discoverer:  cara.name,
    assignedTo:  dan.name,
    status:      "assigned",
    priority:    "high",
    startDate:   "2025-04-01",
    dueDate:     "2025-04-15",
    targetDate:  "2025-04-15",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Profile picture upload fails for files > 2MB",
    projectId:   proj2.id,
    description: "The image upload endpoint returns 413 Payload Too Large. Need to either increase limit or add client-side compression.",
    discoverer:  alice.name,
    assignedTo:  bob.name,
    status:      "underway",
    priority:    "medium",
    startDate:   "2025-04-03",
    dueDate:     "2025-04-20",
    targetDate:  "2025-04-20",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "SQL injection vulnerability in search endpoint",
    projectId:   proj3.id,
    description: "Search parameter was passed directly into raw SQL. Patched with parameterised queries and input sanitisation.",
    discoverer:  cara.name,
    assignedTo:  bob.name,
    status:      "done",
    priority:    "high",
    startDate:   "2025-02-20",
    dueDate:     "2025-02-22",
    targetDate:  "2025-02-22",
    dateSolved:  "2025-02-21",
    resolution:  "Replaced raw SQL with parameterised statements across all admin endpoints."
  });

  createIssue({
    title:       "Export to CSV missing 'Assignee' column",
    projectId:   proj1.id,
    description: "The CSV export on the grid view omits the assignedTo field. Users need this for reporting.",
    discoverer:  dan.name,
    assignedTo:  "",
    status:      "backlog",
    priority:    "medium",
    startDate:   "",
    dueDate:     "2025-05-10",
    targetDate:  "2025-05-10",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Tooltip text overflows on small screens",
    projectId:   proj1.id,
    description: "On 320px-wide viewports the priority tooltip clips outside the viewport. Needs CSS overflow fix.",
    discoverer:  eve.name,
    assignedTo:  alice.name,
    status:      "assigned",
    priority:    "low",
    startDate:   "2025-04-10",
    dueDate:     "2025-04-30",
    targetDate:  "2025-04-30",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "App crashes on swipe-to-delete gesture",
    projectId:   proj2.id,
    description: "Swiping left on a ticket card in the mobile list view causes a NullPointerException in IssueAdapter.kt line 88.",
    discoverer:  cara.name,
    assignedTo:  bob.name,
    status:      "underway",
    priority:    "high",
    startDate:   "2025-04-05",
    dueDate:     "2025-04-18",
    targetDate:  "2025-04-18",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Admin role cannot delete users",
    projectId:   proj3.id,
    description: "The delete-user button was hidden due to a CSS z-index conflict with the sidebar. Fixed by adjusting layering.",
    discoverer:  dan.name,
    assignedTo:  eve.name,
    status:      "done",
    priority:    "medium",
    startDate:   "2025-03-18",
    dueDate:     "2025-03-25",
    targetDate:  "2025-03-25",
    dateSolved:  "2025-03-24",
    resolution:  "Set z-index: 10 on the action buttons container to sit above the sidebar."
  });

  createIssue({
    title:       "Session token not invalidated on logout",
    projectId:   proj3.id,
    description: "After logging out, the JWT token remains valid until natural expiry. Server-side token blacklisting is required.",
    discoverer:  cara.name,
    assignedTo:  "",
    status:      "backlog",
    priority:    "high",
    startDate:   "",
    dueDate:     "2025-05-01",
    targetDate:  "2025-05-01",
    dateSolved:  "",
    resolution:  ""
  });

  createIssue({
    title:       "Email notifications sent twice on issue update",
    projectId:   proj1.id,
    description: "Each issue update triggers two identical emails to the assignee. Likely a duplicate event listener registration on the update handler.",
    discoverer:  alice.name,
    assignedTo:  dan.name,
    status:      "assigned",
    priority:    "medium",
    startDate:   "2025-04-08",
    dueDate:     "2025-04-22",
    targetDate:  "2025-04-22",
    dateSolved:  "",
    resolution:  ""
  });

  localStorage.setItem("sprintly_seeded", "true");

  console.log("✅ Sprintly demo data loaded:", exportAllData());

})();
