<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coach Dashboard - Home</title>
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

      /* Stats Cards */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 25px;
      }

      .stat-card {
        background: #00000065;
        border: 1px solid #dadada4d;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        transition: all 0.3s ease;
      }

      .stat-card:hover {
        border-color: #ffc107;
        transform: translateY(-5px);
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(135deg, #fb4c37, #ffc107);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 5px;
      }

      .stat-label {
        color: #aaa;
        font-size: 0.9rem;
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

      .card-content {
        min-height: auto;
      }

      /* Upcoming Sessions */
      .session-item {
        padding: 15px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
        border-left: 3px solid #ffc745;
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
          <a href="index.php" class="activeNav"
            ><i class="ri-home-4-line"></i><span>Dashboard</span></a
          >
          <a href="progress.php"
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
              <h1 class="fw-bold">Coach Dashboard</h1>
              <p class="text-light mb-0">
                Manage your lessons student and content
              </p>
            </div>
            <img src="./icon.svg" alt="" style="object-fit: cover; scale: 1.3;">
          </div>

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

        <!-- Stats Overview -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">24</div>
            <div class="stat-label">Active Students</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Upcoming Lessons</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">87%</div>
            <div class="stat-label">Average Completion</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">45</div>
            <div class="stat-label">Content Items</div>
          </div>
        </div>

        <div class="row">
          <!-- Left Column -->
          <div class="col-lg-8">
            <!-- Upcoming Sessions -->
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-calendar-event-line me-2"></i> Today's Sessions
                <a
                  href="calendar.html"
                  class="ms-auto text-decoration-none small"
                  >View Calendar</a
                >
              </h5>

              <div class="session-item">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Guitar Lesson with Alex</h6>
                  <span class="text-light">10:00 AM - 11:00 AM</span>
                </div>
                <p class="text-light small mb-1">
                  Focus: Chord transitions and strumming patterns
                </p>
                <div class="d-flex align-items-center">
                  <span class="badge bg-success me-2">Confirmed</span>
                  <a href="#" class="text-decoration-none small"
                    >View Preparation Notes</a
                  >
                </div>
              </div>

              <div class="session-item">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Piano Fundamentals with Maria</h6>
                  <span class="text-light">2:00 PM - 3:00 PM</span>
                </div>
                <p class="text-light small mb-1">
                  Focus: Major scales and hand positioning
                </p>
                <div class="d-flex align-items-center">
                  <span class="badge bg-success me-2">Confirmed</span>
                  <a href="#" class="text-decoration-none small"
                    >View Preparation Notes</a
                  >
                </div>
              </div>

              <div class="session-item">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Music Theory with James</h6>
                  <span class="text-light">4:30 PM - 5:30 PM</span>
                </div>
                <p class="text-light small mb-1">
                  Focus: Chord progression analysis
                </p>
                <div class="d-flex align-items-center">
                  <span class="badge bg-warning me-2"
                    >Pending Confirmation</span
                  >
                  <a href="#" class="text-decoration-none small"
                    >Send Reminder</a
                  >
                </div>
              </div>
            </div>

            <!-- Recent Uploads -->
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-upload-cloud-line me-2"></i> Recent Uploads
                <a href="upload.html" class="ms-auto text-decoration-none small"
                  >Upload New</a
                >
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-video-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Advanced Chord Progressions</h6>
                  <p class="text-light small mb-0">
                    Video Lesson · Uploaded: Today, 9:15 AM
                  </p>
                </div>
                <div class="btn-group">
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-edit-line"></i>
                  </button>
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-links-line"></i>
                  </button>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-file-text-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Practice Exercises - Module 3</h6>
                  <p class="text-light small mb-0">
                    PDF · Uploaded: Yesterday, 4:30 PM
                  </p>
                </div>
                <div class="btn-group">
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-edit-line"></i>
                  </button>
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-links-line"></i>
                  </button>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-music-2-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Sheet Music - Autumn Leaves</h6>
                  <p class="text-light small mb-0">
                    MuseScore · Uploaded: Sep 28, 2023
                  </p>
                </div>
                <div class="btn-group">
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-edit-line"></i>
                  </button>
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    <i class="ri-links-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Student Progress Overview -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-database-line me-2"></i> Student Progress
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Alex Johnson</h6>
                  <div class="progress mb-1" style="height: 6px">
                    <div class="progress-bar" style="width: 78%"></div>
                  </div>
                  <small class="text-light">Guitar Course: 78% completed</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Maria Garcia</h6>
                  <div class="progress mb-1" style="height: 6px">
                    <div class="progress-bar" style="width: 45%"></div>
                  </div>
                  <small class="text-light"
                    >Piano Fundamentals: 45% completed</small
                  >
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">James Wilson</h6>
                  <div class="progress mb-1" style="height: 6px">
                    <div class="progress-bar" style="width: 32%"></div>
                  </div>
                  <small class="text-light">Music Theory: 32% completed</small>
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Students</button>
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
                    <i class="ri-upload-cloud-line me-2"></i> Upload New Content
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-calendar-event-line me-2"></i> Manage
                    Availability
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-file-music-line me-2"></i> Link MuseScore
                    Sheets
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-feedback-line me-2"></i> Send Progress Reports
                  </button>
                </div>
              </div>
            </div>

            <!-- Recent Feedback -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-feedback-line me-2"></i> Recent Feedback
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Alex Johnson</h6>
                  <small class="text-light"
                    >"The chord progression lesson was incredibly
                    helpful!"</small
                  >
                </div>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Maria Garcia</h6>
                  <small class="text-light"
                    >"Need more practice exercises for major scales"</small
                  >
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Feedback</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
