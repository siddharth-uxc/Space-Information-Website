# Software Engineering – Set 1: E-Learning Platform Development

> **5–6 mark answers for Q1 – Q5**

---

## Q1) Explain why requirement gathering is important before starting development of the E-Learning platform.

- **Clarifies scope & goals** – Confirms what features are needed (classes, uploads, assignments, tests, feedback) and what is out of scope, preventing misunderstandings between stakeholders.
- **Reduces rework & cost** – Early clarity prevents building the wrong features; changes made during the requirements phase cost far less than changes made during coding or testing.
- **Captures stakeholder needs** – Aligns teachers, students, and admins on expectations and priorities so the final product satisfies all user groups.
- **Improves planning & estimation** – Enables a realistic schedule, budget, team size, and milestone definition because the work is well-understood upfront.
- **Defines quality attributes** – Identifies non-functional needs such as security, performance, availability, and scalability before the architecture is decided.
- **Supports risk management** – Reveals constraints (internet connectivity issues, device support, data-privacy laws) and their mitigations early, reducing late surprises.
- **Enables correct design choices** – Architecture and database design depend on requirements (e.g., how content is stored, how quizzes are scored, how progress is tracked).
- **Provides acceptance criteria** – Makes testing and validation possible by establishing a clear definition of "done" and "correct" for every feature.

---

## Q2) List and explain the key functional requirements of the E-Learning platform.

Functional requirements describe **what the system must do**:

| # | Requirement | Description |
|---|-------------|-------------|
| 1 | **User Registration & Login** | Teachers and students must be able to register, log in, and log out securely with role-based access. |
| 2 | **Course & Content Management** | Teachers can create courses, upload lectures (PDF/video), and organise materials by topic or week. |
| 3 | **Student Enrollment** | Students can browse available courses, enroll/join, and view enrolled course content. |
| 4 | **Assignment Creation & Submission** | Teachers can create and publish assignments; students can upload/submit their work before the deadline. |
| 5 | **Online Test / Quiz** | Teachers can create quizzes with MCQs or short-answer questions; students can attempt them within a set time. |
| 6 | **Marks Calculation & Result Display** | System automatically calculates scores for objective tests and stores results; students can view their marks. |
| 7 | **Feedback Mechanism** | Teachers can provide written feedback on assignments; students can read the feedback from their dashboard. |
| 8 | **Notifications** | System sends alerts for new assignments, approaching deadlines, and posted results. |

---

## Q3) Differentiate between functional and non-functional requirements (with examples for this project).

### Functional Requirements — *What the system must do*

- Teacher can **upload lectures/materials** (PDF/video).
- Student can **enroll in a course** and **view content**.
- Teacher can **create assignments/quizzes** with deadlines.
- Student can **submit assignments** and **take online tests**.
- System **calculates and stores marks** and **displays results** to students.
- Teacher can **give written feedback**; student can **view feedback** on their dashboard.

### Non-Functional Requirements — *How well the system must work / constraints*

| Quality Attribute | Example Requirement |
|-------------------|---------------------|
| **Performance** | Quiz submission must respond within **< 2 seconds** under normal load. |
| **Scalability** | Must support **500 concurrent students** taking tests simultaneously. |
| **Security & Privacy** | Secure login with encrypted passwords; role-based access (teacher/student); grades visible only to the owner. |
| **Availability / Reliability** | System uptime target of **≥ 99.5%**; no data loss on assignment submission. |
| **Usability** | Simple, intuitive UI accessible on both desktop and mobile browsers. |
| **Compatibility** | Works on latest versions of Chrome, Firefox, Safari, and Edge. |
| **Maintainability** | New course types or question formats can be added without breaking existing functionality. |

**Key distinction:** Functional requirements define *features and behaviours*; non-functional requirements define *quality constraints and operational standards*.

---

## Q4) Draw and explain the DFD (Data Flow Diagram) for the E-Learning platform.

### Context Diagram (Level 0)

```
  [Teacher] ──uploads──▶ ┌──────────────────────┐ ◀──enrolls── [Student]
                         │  E-Learning Platform  │
  [Teacher] ◀──results── │       System         │ ──results──▶ [Student]
                         └──────────────────────┘
                                   │
                            [Admin manages users]
```

### Level-1 DFD (Major Processes)

```
[Teacher]
   │ Course/Material data
   ▼
(1.0 Manage Content) ──▶ {Course DB}
                               │
[Student] ─enroll─▶ (2.0 Enroll & View) ◀──course data── {Course DB}
                               │
[Student] ─submit─▶ (3.0 Manage Assignments) ──▶ {Assignment DB}
[Teacher] ─create─▶ (3.0 Manage Assignments)
                               │
                    (4.0 Evaluate & Marks) ◀──submissions── {Assignment DB}
                               │
                        {Results DB}
                               │
[Student] ◀──marks/feedback── (5.0 Display Results & Feedback)
[Teacher] ◀──view──────────── (5.0 Display Results & Feedback)
```

**Explanation of processes:**

1. **Manage Content (1.0)** – Receives course and material data from teachers and stores it in the Course DB.
2. **Enroll & View (2.0)** – Handles student enrollment and retrieves course content for display.
3. **Manage Assignments (3.0)** – Teachers create quizzes/assignments; students submit answers; data is stored in Assignment DB.
4. **Evaluate & Marks (4.0)** – Processes submissions, calculates scores, and writes results to Results DB.
5. **Display Results & Feedback (5.0)** – Fetches marks and teacher feedback, shows them to students and teachers.

---

## Q5) If requirements change frequently, which process model should be used? Justify.

**Recommended model: Agile (Iterative / Incremental) – e.g., Scrum**

### Justification

- **Handles change by design** – Agile uses short **sprints (1–2 weeks)** where the plan is revisited at the start of every sprint via backlog refinement. New or changed requirements are simply reprioritised in the **product backlog** rather than triggering a full replan.
- **Continuous stakeholder feedback** – Regular **sprint reviews** with teachers and students ensure the platform evolves in the right direction; problems are caught after 1–2 weeks, not 6 months.
- **Working product early** – Core functionality (login, course view) is delivered first, then quizzes, then feedback — giving stakeholders something usable while the rest is built.
- **Reduced disruption** – Changes are managed through a prioritised backlog, avoiding the costly document-revision cycles of a rigid **Waterfall** model.
- **Team adaptability** – Daily stand-ups and retrospectives help the team adjust processes and address blockers quickly.

### Why NOT Waterfall?
- Waterfall requires all requirements to be fixed upfront; frequent changes would force costly rework in later phases (coding, testing) and risk delivering an outdated product.

**Conclusion:** For an E-Learning platform with evolving requirements (new question types, new grading policies, integration with video conferencing, etc.), **Agile/Scrum** is the ideal model because it embraces change as a normal part of development.
