========================================

# WPR281 GROUP PROJECT

**Students:**  
Marissa Steyl - (603839)  
Lance Carolissen - (605105)  
Carel Paxton Van Der Westhuizen - (605116)  
Ben Linde du Toit - (603396)

**Lecturer:**  
Michael Combrinck

========================================


# Bug-Tracking-System

## Overview

This website is a Bug Tracking System which is designed to 
manage, assign, and monitor issues within software projects.

The system allows users to create and delete tickets, assign them to team members,
track their progress, and update their progress status.


## Purpose

The website's purpose is to simulate a issue tracking workflow used in software development and IT teams.
It shows how bugs are reported, assigned, tracked and resolved.


## How the System Works

1. A user creates an issue, aka a ticket.
2. The issue is assigned then assigned to a team member.
3. The issue is tracked using:
- **Status:** Open / Resolved / Overdue
- **Priority:** Low / Medium / High
4. Users can:
- View all issues (in the dashboard).
- View detailed issue information.
- Edit and update issues.
5. All data is stored in localStorage, allowing persistence after page refresh


## Features

- Create Issues (Tickets)
- Assign Issues to Team Members
- View All Issues (Dashboard)
- View Single Issue (Detailed View)
- Edit / Update Issues
- Manage Users
- Manage Projects
- Data Persistence using localStorage


## People

Each person includes:
- ID
- Name
- Surname
- Email
- Username


## Data Storage

The system uses the browser's localStorage API to store:
- Issues
- People
- Projects

This ensures:
- Data persistence across sessions
- No backend/database required


## Testing & Quality Assurance

The system was diligently tested to ensure functionality and reliability.

**Functional Testing**
- Issue creation
- Issue assignment and reassignment
- Viewing all issues
- Viewing a single issue
- Editing/updating issues

**Edge Cases Tested**
- Creating an issue without assigning a user
- Handling empty or missing inputs
- Setting past target dates (Overdue logic)
- Updating issue status (Open -> Resolved)
- Reassigning issues to different users


## Test Data

Test data was provided for showcasing. The system includes:
- 10 issues
- Three projects
- Multiple users

Data variation includes:
- Different priorities (Low, Medium, High)
- Different statuses (Open, Resolved, Overdue)
- Different assigned users
- Different dates (created, target, resolved)


## Screenshots

**Dashboard View**
![alt text](<Screenshot 2026-04-22 201728.png>)  

**Creating Issue**
![alt text](<Screenshot 2026-04-22 201739.png>)  

**Grid View**
![alt text](<Screenshot 2026-04-22 201754.png>)  

**Profile View**
![alt text](<Screenshot 2026-04-22 201758.png>)

