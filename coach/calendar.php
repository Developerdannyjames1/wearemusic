<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coach Dashboard - Booking Calendar</title>
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
      /* 
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

      /* Calendar Styling */
      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        margin-top: 15px;
      }

      .calendar-header {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .calendar-nav-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .calendar-nav-btn:hover {
        background: linear-gradient(135deg, #fb4c37, #ffc745);
        border-color: transparent;
      }

      .day-header {
        text-align: center;
        font-weight: 500;
        font-size: 0.9rem;
        color: #aaa;
        padding: 10px 5px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .calendar-day {
        height: 100px;
        padding: 8px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow-y: auto;
      }

      .calendar-day:hover {
        background-color: rgba(255, 255, 255, 0.08);
      }

      .calendar-day.other-month {
        opacity: 0.3;
      }

      .calendar-day.today {
        border: 2px solid #ffc745;
      }

      .day-number {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 5px;
      }

      .event-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fb4c37, #ffc745);
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .calendar-event {
        font-size: 0.7rem;
        padding: 2px 4px;
        border-radius: 4px;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .event-lesson {
        background: rgba(251, 76, 55, 0.2);
        color: #ff8d7a;
      }

      .event-available {
        background: rgba(40, 167, 69, 0.2);
        color: #6be38f;
      }

      .event-busy {
        background: rgba(108, 117, 125, 0.2);
        color: #aaa;
      }

      /* Time Slots */
      .time-slot {
        padding: 10px 15px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .time-range {
        font-weight: 500;
      }

      .slot-status {
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
      }

      .status-available {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
      }

      .status-booked {
        background: rgba(251, 76, 55, 0.2);
        color: #ffc107;
      }

      .status-break {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
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
      .form-check-input:checked {
        background-color: #ffc745;
        border: none;
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
          background: linear-gradient(135deg, #fb4c37, #ffc107);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .sidebarItems a span {
          display: none;
        }

        .contentMainDiv {
          margin-left: 70px;
        }

        .calendar-day {
          height: 80px;
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

        .calendar {
          gap: 4px;
        }

        .calendar-day {
          height: 70px;
          padding: 5px;
        }

        .calendar-event {
          font-size: 0.6rem;
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

        .calendar-day {
          height: 60px;
        }

        .day-number {
          font-size: 0.8rem;
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
          <a href="progress.php"
            ><i class="ri-database-line"></i><span>Student Progress</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Share</p>
          <a href="upload.php"
            ><i class="ri-upload-cloud-line"></i><span>Upload Content</span></a
          >
          <a href="calendar.php" class="activeNav"
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
              <h1 class="fw-bold">Bookings Calendar</h1>
              <p class="text-light mb-0">
                Manage your availability and scheduled lessons
              </p>
            </div>
            <img
              src="./icon.svg"
              alt=""
              style="object-fit: cover; scale: 1.3"
            />
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

        <div class="row">
          <!-- Calendar View -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <div class="calendar-header">
                <button class="calendar-nav-btn">
                  <i class="ri-arrow-left-s-line"></i>
                </button>
                <h4 class="mb-0">October 2023</h4>
                <button class="calendar-nav-btn">
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

                <!-- Previous Month -->
                <div class="calendar-day other-month">
                  <div class="day-number">24</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">25</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">26</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">27</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">28</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">29</div>
                </div>
                <div class="calendar-day other-month">
                  <div class="day-number">30</div>
                </div>

                <!-- Current Month -->
                <div class="calendar-day">
                  <div class="day-number">1</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">2</div>
                </div>
                <div class="calendar-day today">
                  <div class="day-number">3</div>
                  <span class="event-indicator"></span>
                  <div class="calendar-event event-lesson">Alex - 10:00 AM</div>
                  <div class="calendar-event event-available">
                    2:00 PM Available
                  </div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">4</div>
                  <span class="event-indicator"></span>
                  <div class="calendar-event event-lesson">Maria - 2:00 PM</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">5</div>
                  <div class="calendar-event event-available">
                    9:00 AM Available
                  </div>
                  <div class="calendar-event event-available">
                    4:30 PM Available
                  </div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">6</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">7</div>
                  <div class="calendar-event event-busy">
                    All day - Unavailable
                  </div>
                </div>

                <div class="calendar-day">
                  <div class="day-number">8</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">9</div>
                  <span class="event-indicator"></span>
                  <div class="calendar-event event-lesson">James - 4:30 PM</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">10</div>
                  <div class="calendar-event event-available">
                    3:00 PM Available
                  </div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">11</div>
                  <span class="event-indicator"></span>
                  <div class="calendar-event event-lesson">Maria - 2:00 PM</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">12</div>
                  <div class="calendar-event event-break">1:00 PM - Break</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">13</div>
                </div>
                <div class="calendar-day">
                  <div class="day-number">14</div>
                  <div class="calendar-event event-busy">
                    All day - Unavailable
                  </div>
                </div>
              </div>

              <div class="btn-align-fix mt-4">
                <div class="button-outer">
                  <button class="gradient-btn">Export Calendar</button>
                </div>
              </div>
            </div>

            <!-- Day Schedule -->
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-calendar-event-line me-2"></i> Schedule for Today,
                October 3
                <a href="#" class="ms-auto text-decoration-none small"
                  >View Week</a
                >
              </h5>

              <div class="time-slot">
                <div class="time-range">9:00 AM - 10:00 AM</div>
                <div class="slot-status status-available">Available</div>
              </div>

              <div class="time-slot">
                <div class="time-range">10:00 AM - 11:00 AM</div>
                <div class="slot-status status-booked">
                  Booked: Alex Johnson (Guitar)
                </div>
              </div>

              <div class="time-slot">
                <div class="time-range">11:00 AM - 12:00 PM</div>
                <div class="slot-status status-available">Available</div>
              </div>

              <div class="time-slot">
                <div class="time-range">12:00 PM - 1:00 PM</div>
                <div class="slot-status status-break">Lunch Break</div>
              </div>

              <div class="time-slot">
                <div class="time-range">1:00 PM - 2:00 PM</div>
                <div class="slot-status status-available">Available</div>
              </div>

              <div class="time-slot">
                <div class="time-range">2:00 PM - 3:00 PM</div>
                <div class="slot-status status-available">Available</div>
              </div>

              <div class="time-slot">
                <div class="time-range">3:00 PM - 4:00 PM</div>
                <div class="slot-status status-booked">
                  Booked: Sarah Wilson (Piano)
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Availability Settings -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-time-line me-2"></i> Set Availability
              </h5>

              <div class="mb-3">
                <label class="form-label text-light">Select Date</label>
                <input
                  type="date"
                  class="form-control"
                  style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #dadada4d;
                    color: white;
                  "
                  value="2023-10-03"
                />
              </div>

              <div class="mb-3">
                <label class="form-label text-light"
                  >Available Time Slots</label
                >
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot1"
                    checked
                  />
                  <label class="form-check-label" for="slot1"
                    >9:00 AM - 10:00 AM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot2"
                    checked
                  />
                  <label class="form-check-label" for="slot2"
                    >10:00 AM - 11:00 AM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot3"
                    checked
                  />
                  <label class="form-check-label" for="slot3"
                    >11:00 AM - 12:00 PM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="slot4" />
                  <label class="form-check-label" for="slot4"
                    >12:00 PM - 1:00 PM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot5"
                    checked
                  />
                  <label class="form-check-label" for="slot5"
                    >1:00 PM - 2:00 PM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot6"
                    checked
                  />
                  <label class="form-check-label" for="slot6"
                    >2:00 PM - 3:00 PM</label
                  >
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="slot7"
                    checked
                  />
                  <label class="form-check-label" for="slot7"
                    >3:00 PM - 4:00 PM</label
                  >
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label text-light"
                  >Recurring Availability</label
                >
                <select
                  class="form-select"
                  style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #dadada4d;
                    color: white;
                  "
                >
                  <option selected>Just this date</option>
                  <option>Every Monday</option>
                  <option>Every Tuesday</option>
                  <option>Every Wednesday</option>
                  <option>Every Thursday</option>
                  <option>Every Friday</option>
                  <option>Every Week</option>
                </select>
              </div>

              <div class="btn-align-fix">
                <div class="button-outer">
                  <button class="gradient-btn">Save Availability</button>
                </div>
              </div>
            </div>

            <!-- Upcoming Lessons -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-calendar-event-line me-2"></i> Upcoming Lessons
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Alex Johnson</h6>
                  <small class="text-light">Today, 10:00 AM · Guitar</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Sarah Wilson</h6>
                  <small class="text-light">Today, 3:00 PM · Piano</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Maria Garcia</h6>
                  <small class="text-light">Oct 4, 2:00 PM · Guitar</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">James Wilson</h6>
                  <small class="text-light"
                    >Oct 9, 4:30 PM · Music Theory</small
                  >
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Lessons</button>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-line-chart-line me-2"></i> Booking Stats
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-calendar-check-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">This Week</h6>
                  <small class="text-light">8 lessons booked</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-calendar-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">This Month</h6>
                  <small class="text-light">32 lessons booked</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-money-dollar-circle-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Revenue</h6>
                  <small class="text-light">$2,450 estimated</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // Simple calendar navigation
      document.querySelectorAll(".calendar-nav-btn").forEach((button) => {
        button.addEventListener("click", function () {
          alert("Calendar navigation would go to previous/next month");
        });
      });

      // Calendar day click
      document
        .querySelectorAll(".calendar-day:not(.other-month)")
        .forEach((day) => {
          day.addEventListener("click", function () {
            const dayNumber = this.querySelector(".day-number").textContent;
            alert(
              `You clicked on October ${dayNumber}. Would show details for this date.`
            );
          });
        });
    </script>
  </body>
</html>
