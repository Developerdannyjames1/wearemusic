<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Dashboard - Home</title>
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
        height: auto; /* Changed from fixed height to auto */
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

      /* Calendar */
      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 5px;
        margin-top: 15px;
      }

      .calendar-header {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .calendar-day {
        text-align: center;
        padding: 8px 5px;
        border-radius: 8px;
        font-size: 0.9rem;
      }

      .calendar-day.other {
        color: #6c757d;
      }

      .calendar-day.today {
        background-image: linear-gradient(120deg, #a748ff, #ffc745, #ff5a28);
        color: white;
      }

      .calendar-day.booking {
        background-color: rgba(251, 205, 55, 0.2);
        border: 1px solid #ffc745;
      }

      .day-header {
        text-align: center;
        font-weight: 500;
        font-size: 0.8rem;
        color: #aaa;
        padding: 5px;
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
          <a href="index.php" class="activeNav"
            ><i class="ri-home-4-line"></i><span>Dashboard Home</span></a
          >
          <a href="progress.php"
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
            <h1 class="fw-bold">Welcome Back Alex</h1>
            <p class="text-light mb-0">
              Here's your learning overview for today
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

        <div class="row">
          <!-- Upcoming Lessons -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <div class="card-content">
                <h5 class="d-flex align-items-center mb-4">
                  <i class="ri-calendar-event-line me-2"></i> Upcoming Lessons
                  <a href="#" class="ms-auto text-decoration-none small"
                    >View All</a
                  >
                </h5>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <div class="resource-item">
                      <div class="resource-icon">
                        <i class="ri-music-2-line"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">Guitar Lesson</h6>
                        <small class="text-light"
                          >Today, 3:00 PM - 4:00 PM</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="resource-item">
                      <div class="resource-icon">
                        <i class="ri-piano-line"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">Piano Practice</h6>
                        <small class="text-light"
                          >Tomorrow, 5:00 PM - 6:00 PM</small
                        >
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="resource-item">
                      <div class="resource-icon">
                        <i class="ri-video-line"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">Music Theory</h6>
                        <small class="text-light">Wed, 4:00 PM - 5:00 PM</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="resource-item">
                      <div class="resource-icon">
                        <i class="ri-microphone-line"></i>
                      </div>
                      <div>
                        <h6 class="mb-0">Vocal Coaching</h6>
                        <small class="text-light">Fri, 2:00 PM - 3:00 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">Book New Lesson</button>
                </div>
              </div>
            </div>

            <!-- Learning Tools -->
            <div class="dashboard-card">
              <div class="card-content">
                <h5 class="mb-4">
                  <i class="ri-video-line me-2"></i> Continue Learning
                </h5>

                <div class="resource-item mb-4">
                  <div class="resource-icon">
                    <i class="ri-play-circle-line"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Advanced Chord Progressions</h6>
                    <p class="mb-2 text-light small">
                      Guitar Course - Module 3
                    </p>
                    <div class="progress mb-2">
                      <div class="progress-bar" style="width: 65%"></div>
                    </div>
                    <small class="text-light">65% completed</small>
                  </div>
                  <button
                    class="btn btn-sm"
                    style="
                      border: none;
                      background: linear-gradient(
                        135deg,
                        #a748ff,
                        #ffc745,
                        #ff3419be
                      );
                      color: white;
                    "
                  >
                    Continue
                  </button>
                </div>

                <div class="resource-item">
                  <div class="resource-icon">
                    <i class="ri-file-text-line"></i>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Sheet Music: Autumn Leaves</h6>
                    <p class="mb-2 text-light small">
                      Jazz Standards Collection
                    </p>
                    <span class="status-badge status-upcoming">New</span>
                  </div>
                  <button
                    class="btn btn-sm"
                    style="border: 1px solid #dadada4d; color: white"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Progress Overview -->
            <div class="dashboard-card">
              <div class="card-content">
                <h5 class="mb-4">
                  <i class="ri-progress-4-line me-2"></i> Progress Overview
                </h5>

                <div class="mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Guitar Course</span>
                    <span>78%</span>
                  </div>
                  <div class="progress mb-3">
                    <div class="progress-bar" style="width: 78%"></div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Music Theory</span>
                    <span>45%</span>
                  </div>
                  <div class="progress mb-3">
                    <div class="progress-bar" style="width: 45%"></div>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="d-flex justify-content-between mb-2">
                    <span>Sight Reading</span>
                    <span>32%</span>
                  </div>
                  <div class="progress mb-3">
                    <div class="progress-bar" style="width: 32%"></div>
                  </div>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">View Detailed Progress</button>
                </div>
              </div>
            </div>

            <!-- Calendar -->
            <div class="dashboard-card">
              <div class="card-content">
                <h5 class="mb-4">
                  <i class="ri-calendar-2-line me-2"></i> October 2023
                </h5>

                <div class="calendar-header">
                  <button class="btn btn-sm p-0" style="color: white">
                    <i class="ri-arrow-left-s-line"></i>
                  </button>
                  <span>October 2023</span>
                  <button class="btn btn-sm p-0" style="color: white">
                    <i class="ri-arrow-right-s-line"></i>
                  </button>
                </div>

                <div class="calendar">
                  <div class="day-header">Sun</div>
                  <div class="day-header">Mon</div>
                  <div class="day-header">Tue</div>
                  <div class="day-header">Wed</div>
                  <div class="day-header">Thu</div>
                  <div class="day-header">Fri</div>
                  <div class="day-header">Sat</div>

                  <div class="calendar-day other">24</div>
                  <div class="calendar-day other">25</div>
                  <div class="calendar-day other">26</div>
                  <div class="calendar-day other">27</div>
                  <div class="calendar-day other">28</div>
                  <div class="calendar-day other">29</div>
                  <div class="calendar-day other">30</div>

                  <div class="calendar-day">1</div>
                  <div class="calendar-day">2</div>
                  <div class="calendar-day today">3</div>
                  <div class="calendar-day booking">4</div>
                  <div class="calendar-day">5</div>
                  <div class="calendar-day">6</div>
                  <div class="calendar-day">7</div>

                  <div class="calendar-day">8</div>
                  <div class="calendar-day">9</div>
                  <div class="calendar-day">10</div>
                  <div class="calendar-day booking">11</div>
                  <div class="calendar-day">12</div>
                  <div class="calendar-day">13</div>
                  <div class="calendar-day">14</div>
                </div>
              </div>
            </div>

            <!-- Coach Messages -->
            <div class="dashboard-card">
              <div class="card-content">
                <h5 class="mb-4">
                  <i class="ri-message-2-line me-2"></i> Coach Messages
                </h5>

                <div class="resource-item">
                  <div class="resource-icon">
                    <i class="ri-user-line"></i>
                  </div>
                  <div>
                    <h6 class="mb-0">Sarah Johnson</h6>
                    <small class="text-light"
                      >Great progress on your chord transitions!</small
                    >
                  </div>
                  <span class="notification-badge">1</span>
                </div>

                <div class="resource-item mt-2">
                  <div class="resource-icon">
                    <i class="ri-user-line"></i>
                  </div>
                  <div>
                    <h6 class="mb-0">Michael Chen</h6>
                    <small class="text-light"
                      >Remember to practice your scales daily</small
                    >
                  </div>
                </div>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">View All Messages</button>
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
