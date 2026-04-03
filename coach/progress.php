<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coach Dashboard - Student Progress</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <style>
      /* ====== EXACT THEME FROM STUDENT DASHBOARD ====== */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* .circleRotate,
      .polyganRotate {
        animation: rotation 4s linear infinite;
        transform-origin: center;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      } */
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #141414;
        color: #fff;
        min-height: 100vh;
        overflow-x: hidden;
      }

      .wrapperOfAll {
        width: 100%;
        min-height: 100vh;
        max-width: 100%;
      }

      .gradientwrapper {
        background-blend-mode: darken;
        background: linear-gradient(135deg, #b1d3ffab, #ffb3dda8, #ffd04ead);
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        /* background-image: url("https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png"); */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
      }

      /* Fixed Sidebar */
      .sidebar {
        width: 250px;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        padding: 25px 15px;
        border-right: 1px solid #dadada4d;
        backdrop-filter: blur(20px);
        background-color: #00000065;
        z-index: 100;
        overflow-y: auto;
      }

      .headingMain {
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
        margin-bottom: 2rem;
        background: linear-gradient(120deg, #c589fe, #fbd786, #f7797d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        padding-bottom: 15px;
        border-bottom: 1px solid #dadada4d;
      }

      .sidebarItems {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .sidebarItems a {
        color: white;
        border-radius: 10px;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 12px 15px;
        text-decoration: none;
        transition: all ease 0.3s;
        background-color: transparent;
      }

      .sidebarItems a:hover {
        background-color: #ffffff2f;
      }

      .sidebarItems a.activeNav {
        background-image: linear-gradient(
          to bottom right,
          #c589fe,
          #ffc446,
          #ff4349c9
        );
      }

      .sidebarItems a.activeNav:hover {
        background-color: transparent;
      }

      .sidebarItems a i {
        font-size: 1.2rem;
        width: 24px;
        text-align: center;
      }

      /* Main Content */
      .contentMainDiv {
        margin-left: 250px;
        padding: 20px;
        min-height: 100vh;
      }

      /* Header */
      .dashboard-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        margin-bottom: 25px;
        border-bottom: 1px solid #dadada4d;
      }

      .header-icons {
        display: flex;
        gap: 15px;
      }

      .header-icon {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
      }

      .header-icon:hover {
        border-color: #fbd786;
        background-color: rgba(251, 76, 55, 0.1);
      }

      .notification-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: linear-gradient(to right, #fa4a3b, #fbd786);
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Cards */
      .dashboard-card {
        background-color: #00000065;
        border-radius: 12px;
        border: 1px solid #dadada4d;
        transition: all 0.3s ease;
        padding: 20px;
        margin-bottom: 20px;
        height: auto;
      }

      .dashboard-card:hover {
        border-color: #fbd786;
        transform: translateY(-5px);
      }

      /* Buttons */
      .button-outer {
        border: 1px solid #dadada4d;
        transition: all ease 0.4s;
        border-radius: 10px;
        background-color: transparent;
        display: inline-block;
      }

      .button-outer:hover {
        background-color: white;
        border: 1px solid transparent;
      }

      .gradient-btn {
        border: none;
        font-size: 1rem;
        padding: 0.6rem 1.6em;
        font-weight: bold;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(120deg, #a748ff, #ffc745, #ff5a28);
        transition: all 0.3s ease;
        background-color: transparent;
        width: 100%;
      }

      /* Progress bars */
      .progress {
        height: 8px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar {
        background: linear-gradient(to right, #fb4c37, #ffc745);
        border-radius: 4px;
      }

      /* Student Cards */
      .student-card {
        padding: 15px;
        border-radius: 8px;
        background-color: 00000065;
        margin-bottom: 15px;
        transition: all 0.3s ease;
      }

      .student-card:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .student-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      .student-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fb4c37, #ffc745);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        margin-right: 15px;
      }

      .student-info {
        flex-grow: 1;
      }

      .student-name {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .student-meta {
        color: #aaa;
        font-size: 0.85rem;
      }

      /* Charts */
      .chart-container {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .chart-title {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 10px;
        color: #aaa;
      }

      .chart-bar {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        margin-bottom: 12px;
        position: relative;
      }

      .chart-fill {
        height: 100%;
        border-radius: 4px;
        background: linear-gradient(135deg, #fb4c37, #ffc745);
      }

      .chart-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 5px;
      }

      /* Resource items */
      .resource-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
        transition: all 0.3s ease;
      }

      .resource-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .resource-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        background: linear-gradient(135deg, #a748ff, #ffc745, #ff3419be);
      }

      /* Button alignment fixes */
      .btn-align-fix {
        display: flex;
        align-items: center;
        justify-content: end;
        margin-top: 15px;
      }

      /* Stats Grid */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
      }

      .stat-card {
        background: #00000065;
        border: 1px solid #dadada4d;
        border-radius: 12px;
        padding: 15px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .stat-card:hover {
        border-color: #ffc745;
        transform: translateY(-5px);
      }

      .stat-number {
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(135deg, #fb4c37, #ffc107);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 5px;
      }

      .stat-label {
        color: #aaa;
        font-size: 0.85rem;
      }

      /* Responsive Design */
      @media (max-width: 992px) {
        .sidebar {
          width: 70px;
          padding: 20px 10px;
        }

        .sidebar .headingMain {
          font-size: 0;
          margin-bottom: 1.5rem;
          padding-bottom: 10px;
        }

        .sidebar .headingMain:after {
          content: "CD";
          font-size: 1.2rem;
          background: linear-gradient(135deg, #fb4c37, #e02870);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebarItems a span {
          display: none;
        }

        .contentMainDiv {
          margin-left: 70px;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        .dashboard-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }

        .header-icons {
          align-self: flex-end;
        }

        .btn-align-fix {
          justify-content: center;
        }

        .stats-grid {
          grid-template-columns: 1fr;
        }

        .student-header {
          flex-direction: column;
          text-align: center;
        }

        .student-avatar {
          margin-right: 0;
          margin-bottom: 10px;
        }
      }

      @media (max-width: 576px) {
        .sidebar {
          width: 60px;
          padding: 15px 5px;
        }

        .contentMainDiv {
          margin-left: 60px;
          padding: 15px;
        }

        .sidebarItems a {
          padding: 10px;
          justify-content: center;
        }

        .sidebarItems a i {
          font-size: 1.1rem;
          margin-right: 0;
        }

        .header-icon {
          height: 40px;
          width: 40px;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapperOfAll">
      <div class="gradientwrapper"></div>

      <!-- Fixed Sidebar -->
      <nav class="sidebar">
        <h4 class="headingMain">Coach Portal</h4>
        <div class="sidebarItems">
          <p class="text-uppercase small mt-3 mb-1 text-light">Inspire</p>
          <a href="index.php"
            ><i class="ri-home-4-line"></i><span>Dashboard</span></a
          >
          <a href="progress.php" class="activeNav"
            ><i class="ri-database-line"></i><span>Student Progress</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Share</p>
          <a href="upload.php"
            ><i class="ri-upload-cloud-line"></i><span>Upload Content</span></a
          >
          <a href="calendar.php"
            ><i class="ri-calendar-check-line"></i
            ><span>Booking Calendar</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Heal</p>
          <a href="musescore.php"
            ><i class="ri-file-music-line"></i><span>MuseScore Sheets</span></a
          >
        </div>
      </nav>
      <!-- Main Content -->
      <main class="contentMainDiv">
        <!-- Header -->
        <div class="dashboard-header">
          <div
            style="
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: center;
              gap: 5rem;
            "
          >
            <div>
              <h1 class="fw-bold">Student Progress</h1>
              <p class="text-light mb-0">
                Track and analyze your student learning journey
              </p>
            </div>
 <img src="./icon.svg" alt="" style="object-fit: cover; scale: 1.3;">
          
          </div>
          <div>
            <div
              style="
                justify-content: center;
                align-items: center;
                display: flex;
                gap: 5rem;
              "
            >
              <div class="header-icons">
                <div class="header-icon">
                  <i class="ri-notification-3-line"></i>
                </div>
                <div class="header-icon">
                  <i class="ri-user-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">24</div>
            <div class="stat-label">Active Students</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">87%</div>
            <div class="stat-label">Average Completion</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">142</div>
            <div class="stat-label">Lessons Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">92%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
        </div>

        <div class="row">
          <!-- Student List -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-team-line me-2"></i> My Students
                <div class="ms-auto">
                  <div class="button-outer">
                    <button class="gradient-btn">Add New Student</button>
                  </div>
                </div>
              </h5>

              <div class="mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search students..."
                  style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #dadada4d;
                    color: white;
                  "
                />
              </div>

              <!-- Student Card -->
              <div class="student-card">
                <div class="student-header">
                  <div class="student-avatar">
                    <i class="ri-user-line"></i>
                  </div>
                  <div class="student-info">
                    <div class="student-name">Alex Johnson</div>
                    <div class="student-meta">
                      Guitar · 12 lessons completed
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="text-success">78% Complete</div>
                    <div class="text-light small">Last activity: Today</div>
                  </div>
                </div>

                <div class="chart-container">
                  <div class="chart-label">
                    <span>Guitar Mastery Course</span>
                    <span>78%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 78%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Music Theory</span>
                    <span>45%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 45%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Sight Reading</span>
                    <span>32%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 32%"></div>
                  </div>
                </div>

                <div class="btn-align-fix">
                  <div class="button-outer">
                    <button class="gradient-btn">View Full Progress</button>
                  </div>
                </div>
              </div>

              <!-- Student Card -->
              <div class="student-card">
                <div class="student-header">
                  <div class="student-avatar">
                    <i class="ri-user-line"></i>
                  </div>
                  <div class="student-info">
                    <div class="student-name">Maria Garcia</div>
                    <div class="student-meta">Piano · 8 lessons completed</div>
                  </div>
                  <div class="text-end">
                    <div class="text-success">65% Complete</div>
                    <div class="text-light small">Last activity: Yesterday</div>
                  </div>
                </div>

                <div class="chart-container">
                  <div class="chart-label">
                    <span>Piano Fundamentals</span>
                    <span>65%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 65%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Music Theory</span>
                    <span>52%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 52%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Ear Training</span>
                    <span>28%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 28%"></div>
                  </div>
                </div>

                <div class="btn-align-fix">
                  <div class="button-outer">
                    <button class="gradient-btn">View Full Progress</button>
                  </div>
                </div>
              </div>

              <!-- Student Card -->
              <div class="student-card">
                <div class="student-header">
                  <div class="student-avatar">
                    <i class="ri-user-line"></i>
                  </div>
                  <div class="student-info">
                    <div class="student-name">James Wilson</div>
                    <div class="student-meta">
                      Music Theory · 5 lessons completed
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="text-warning">42% Complete</div>
                    <div class="text-light small">
                      Last activity: 3 days ago
                    </div>
                  </div>
                </div>

                <div class="chart-container">
                  <div class="chart-label">
                    <span>Music Theory</span>
                    <span>42%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 42%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Composition</span>
                    <span>25%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 25%"></div>
                  </div>

                  <div class="chart-label">
                    <span>Ear Training</span>
                    <span>18%</span>
                  </div>
                  <div class="chart-bar">
                    <div class="chart-fill" style="width: 18%"></div>
                  </div>
                </div>

                <div class="btn-align-fix">
                  <div class="button-outer">
                    <button class="gradient-btn">View Full Progress</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progress Reports -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-file-chart-line me-2"></i> Recent Progress Reports
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-file-text-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Alex Johnson - Monthly Progress</h6>
                  <p class="text-light small mb-0">
                    Generated: Oct 1, 2023 · Guitar Mastery
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #fb4c37">
                  <i class="ri-download-line"></i>
                </button>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-file-text-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Maria Garcia - Skill Assessment</h6>
                  <p class="text-light small mb-0">
                    Generated: Sep 28, 2023 · Piano Fundamentals
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #fb4c37">
                  <i class="ri-download-line"></i>
                </button>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-file-text-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Quarterly Progress Overview</h6>
                  <p class="text-light small mb-0">
                    Generated: Sep 25, 2023 · All Students
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #fb4c37">
                  <i class="ri-download-line"></i>
                </button>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">Generate New Report</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Performance Analytics -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-line-chart-line me-2"></i> Performance Analytics
              </h5>

              <div class="chart-container">
                <div class="chart-title">Course Completion Rate</div>
                <div class="chart-bar">
                  <div class="chart-fill" style="width: 87%"></div>
                </div>

                <div class="chart-title">Average Practice Hours/Week</div>
                <div class="chart-bar">
                  <div class="chart-fill" style="width: 72%"></div>
                </div>

                <div class="chart-title">Assignment Completion</div>
                <div class="chart-bar">
                  <div class="chart-fill" style="width: 94%"></div>
                </div>

                <div class="chart-title">Student Satisfaction</div>
                <div class="chart-bar">
                  <div class="chart-fill" style="width: 92%"></div>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">View Detailed Analytics</button>
                </div>
              </div>
            </div>

            <!-- Upcoming Assessments -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-calendar-event-line me-2"></i> Upcoming Assessments
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-clipboard-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Alex Johnson - Guitar Evaluation</h6>
                  <small class="text-light">Oct 10, 2023 · 3:00 PM</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-clipboard-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Maria Garcia - Piano Exam</h6>
                  <small class="text-light">Oct 15, 2023 · 2:00 PM</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-clipboard-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Quarterly Progress Reviews</h6>
                  <small class="text-light">Oct 20, 2023 · All Day</small>
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">Schedule Assessment</button>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-zap-line me-2"></i> Quick Actions
              </h5>

              <div class="d-grid gap-2">
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-feedback-line me-2"></i> Send Progress Update
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-calendar-event-line me-2"></i> Schedule
                    Evaluation
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-file-chart-line me-2"></i> Generate Report
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-mail-send-line me-2"></i> Email Parents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // Simple interactivity for student cards
      document.querySelectorAll(".student-card").forEach((card) => {
        card.addEventListener("click", function () {
          const studentName = this.querySelector(".student-name").textContent;
          alert(`Viewing detailed progress for ${studentName}`);
        });
      });

      // Search functionality
      const searchInput = document.querySelector('input[type="text"]');
      searchInput.addEventListener("keyup", function () {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll(".student-card").forEach((card) => {
          const studentName = card
            .querySelector(".student-name")
            .textContent.toLowerCase();
          if (studentName.includes(searchTerm)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    </script>
  </body>
</html>
