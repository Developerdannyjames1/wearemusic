<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Dashboard - Progress Tracking</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <style>
      /* ====== EXACT THEME YOU PROVIDED ====== */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .circleRotate,
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
        /* background-image: linear-gradient(to bottom right, #e4a246, #d65aa7); */
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

      /* Status Badges */
      .status-badge {
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .status-completed {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
      }

      .status-inprogress {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
      }

      .status-upcoming {
        background: rgba(13, 110, 253, 0.2);
        color: #0d6efd;
      }

      /* Progress bars */
      .progress {
        height: 8px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-bar {
        background-image: linear-gradient(120deg, #a748ff, #ffc745, #ff5a28);
        border-radius: 4px;
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
        border-color: #fbd786;
        transform: translateY(-5px);
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(135deg, #ffc745, #ff3419be);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 5px;
      }

      .stat-label {
        color: #aaa;
        font-size: 0.9rem;
      }

      /* Performance Reviews */
      .review-item {
        padding: 15px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 15px;
        border-left: 3px solid #fbd786;
      }

      .rating {
        display: flex;
        gap: 3px;
        margin-bottom: 10px;
      }

      .rating i {
        color: #ffc107;
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
          content: "SP";
          font-size: 1.2rem;
          background: linear-gradient(135deg, #fbd786, #e02870);
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
        <h4 class="headingMain">Student Portal</h4>
        <div class="sidebarItems">
          <p class="text-uppercase small mt-3 mb-1 text-light">Inspire</p>
          <a href="index.php"
            ><i class="ri-home-4-line"></i><span>Dashboard Home</span></a
          >
          <a href="progress.php" class="activeNav"
            ><i class="ri-calendar-event-line"></i
            ><span>Progress Tracking</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Share</p>
          <a href="learning.php"
            ><i class="ri-video-line"></i><span>Learning Tools</span></a
          >
          <a href="support.php"
            ><i class="ri-file-download-line"></i><span>Support Center</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Heal</p>
          <a href="billing.php"
            ><i class="ri-bill-line"></i><span>Billing & Growth</span></a
          >
        </div>
      </nav>

      <!-- Main Content -->
      <main class="contentMainDiv">
        <!-- Header -->
        <div class="dashboard-header">
  <div style="display: flex; justify-items: start; align-items: center; gap: 5rem;">
            <div>
            <h1 class="fw-bold">Learning Tools</h1>
            <p class="text-light mb-0">
            Access your lessons, material and resources
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
            <div class="stat-number">78%</div>
            <div class="stat-label">Overall Progress</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">24</div>
            <div class="stat-label">Lessons Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">12</div>
            <div class="stat-label">Practice Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">5</div>
            <div class="stat-label">Skills Mastered</div>
          </div>
        </div>

        <div class="row">
          <!-- Course Progress -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-progress-4-line me-2"></i> Course Progress
                <a
                  href="#"
                  class="ms-auto text-decoration-none small"
                  style="color: #ffc745"
                  >View Details</a
                >
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-guitar-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-1">Guitar Mastery Series</h6>
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span class="text-light small"
                      >Module 4: Advanced Techniques</span
                    >
                    <span class="text-light">78%</span>
                  </div>
                  <div class="progress mb-2">
                    <div class="progress-bar" style="width: 78%"></div>
                  </div>
                  <small class="text-light">15/20 lessons completed</small>
                </div>
              </div>

              <div class="resource-item mt-3">
                <div class="resource-icon">
                  <i class="ri-piano-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-1">Piano Fundamentals</h6>
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span class="text-light small"
                      >Module 2: Chord Progressions</span
                    >
                    <span class="text-light">45%</span>
                  </div>
                  <div class="progress mb-2">
                    <div class="progress-bar" style="width: 45%"></div>
                  </div>
                  <small class="text-light">9/20 lessons completed</small>
                </div>
              </div>

              <div class="resource-item mt-3">
                <div class="resource-icon">
                  <i class="ri-music-2-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-1">Music Theory</h6>
                  <div
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <span class="text-light small"
                      >Module 3: Harmony & Composition</span
                    >
                    <span class="text-light">32%</span>
                  </div>
                  <div class="progress mb-2">
                    <div class="progress-bar" style="width: 32%"></div>
                  </div>
                  <small class="text-light">6/20 lessons completed</small>
                </div>
              </div>
            </div>

            <!-- Lesson Completion History -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-history-line me-2"></i> Recent Completed Lessons
              </h5>

              <div class="table-responsive">
                <table
                  class="table"
                  style="color: white; border-color: #dadada4d"
                >
                  <thead>
                    <tr>
                      <th>Lesson</th>
                      <th>Course</th>
                      <th>Date Completed</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Fingerstyle Techniques</td>
                      <td>Guitar Mastery</td>
                      <td>Oct 3, 2023</td>
                      <td>
                        <span class="status-badge status-completed"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>Basic Chord Transitions</td>
                      <td>Guitar Mastery</td>
                      <td>Oct 1, 2023</td>
                      <td>
                        <span class="status-badge status-completed"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>Major Scales</td>
                      <td>Piano Fundamentals</td>
                      <td>Sep 28, 2023</td>
                      <td>
                        <span class="status-badge status-completed"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>Rhythm Patterns</td>
                      <td>Music Theory</td>
                      <td>Sep 25, 2023</td>
                      <td>
                        <span class="status-badge status-completed"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>Strumming Techniques</td>
                      <td>Guitar Mastery</td>
                      <td>Sep 22, 2023</td>
                      <td>
                        <span class="status-badge status-completed"
                          >Completed</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">View Full History</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Performance Reviews -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-feedback-line me-2"></i> Performance Reviews
              </h5>

              <div class="review-item">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Guitar Technique Assessment</h6>
                  <span class="text-light small">Sep 30, 2023</span>
                </div>
                <div class="rating mb-2">
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-half-line"></i>
                </div>
                <p class="text-light small mb-0">
                  "Excellent progress on chord transitions. Your finger
                  positioning has improved significantly. Focus on maintaining
                  consistent tempo during transitions."
                </p>
                <div class="text-end mt-2">
                  <small class="text-light">- Coach Sarah</small>
                </div>
              </div>

              <div class="review-item">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Music Theory Quiz</h6>
                  <span class="text-light small">Sep 20, 2023</span>
                </div>
                <div class="rating mb-2">
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-line"></i>
                </div>
                <p class="text-light small mb-0">
                  "Good understanding of basic harmony concepts. Would recommend
                  more practice on identifying chord progressions by ear."
                </p>
                <div class="text-end mt-2">
                  <small class="text-light">- Coach Michael</small>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">Request New Review</button>
                </div>
              </div>
            </div>

            <!-- Upcoming Goals -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-flag-line me-2"></i> Learning Goals
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-checkbox-circle-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Complete Guitar Module 4</h6>
                  <small class="text-light">Due: Oct 15, 2023</small>
                </div>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-checkbox-blank-circle-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Practice 30 mins daily</h6>
                  <small class="text-light">Ongoing</small>
                </div>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-checkbox-blank-circle-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Learn 2 new songs</h6>
                  <small class="text-light">Due: Oct 31, 2023</small>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">Set New Goal</button>
                </div>
              </div>
            </div>

            <!-- Skills Mastered -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-medal-line me-2"></i> Skills Mastered
              </h5>

              <div class="d-flex flex-wrap gap-2">
                <span class="status-badge status-completed">Basic Chords</span>
                <span class="status-badge status-completed"
                  >Strumming Patterns</span
                >
                <span class="status-badge status-completed"
                  >Finger Positioning</span
                >
                <span class="status-badge status-completed"
                  >Reading Sheet Music</span
                >
                <span class="status-badge status-completed">Major Scales</span>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Skills</button>
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
