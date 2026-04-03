<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Dashboard - Communication & Support</title>
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

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: #141414;
        color: #fff;
        min-height: 100vh;
        overflow-x: hidden;
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

      /* Message Threads */
      .message-thread {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 15px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .message-thread:last-child {
        border-bottom: none;
      }

      .message-thread:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }

      .message-thread.unread {
        background-color: rgba(251, 76, 55, 0.1);
      }

      .message-preview {
        color: #aaa;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 70%;
      }

      /* Chat Interface */
      .chat-container {
        height: 400px;
        overflow-y: auto;
        padding: 15px;
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        margin-bottom: 15px;
      }

      .message {
        max-width: 80%;
        margin-bottom: 15px;
        padding: 12px 15px;
        border-radius: 18px;
      }

      .message.sent {
        background-image: linear-gradient(120deg, #a748ff, #ffc745, #ff5a28);
        margin-left: auto;
        border-bottom-right-radius: 5px;
      }

      .message.received {
        background: rgba(255, 255, 255, 0.1);
        margin-right: auto;
        border-bottom-left-radius: 5px;
      }

      .message-time {
        font-size: 0.7rem;
        color: #aaa;
        text-align: right;
        margin-top: 5px;
      }

      /* Support Tickets */
      .ticket-item {
        padding: 15px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
        border-left: 3px solid;
      }

      .ticket-item.open {
        border-left-color: #ffc107;
      }

      .ticket-item.resolved {
        border-left-color: #28a745;
      }

      .ticket-item.pending {
        border-left-color: #0d6efd;
      }

      /* Notification List */
      .notification-item {
        padding: 12px 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
      }

      .notification-item:last-child {
        border-bottom: none;
      }

      .notification-item:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }

      .notification-item.unread {
        background-color: rgba(251, 76, 55, 0.1);
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

        .message {
          max-width: 90%;
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
          <a href="progress.php"
            ><i class="ri-calendar-event-line"></i
            ><span>Progress Tracking</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Share</p>
          <a href="learning.php"
            ><i class="ri-video-line"></i><span>Learning Tools</span></a
          >
          <a href="support.php" class="activeNav"
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
           <div
            style="
              display: flex;
              justify-items: start;
              align-items: center;
              gap: 5rem;
            "
          >
            <div>
              <h1 class="fw-bold">Learning Tools</h1>
              <p class="text-light mb-0">
                Access your lessons, material and resources
              </p>
            </div>

            <img
              src="./icon.svg"
              alt=""
              style="object-fit: cover; scale: 1.3"
            />
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
          <!-- Messages -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-message-3-line me-2"></i> Messages
                <div class="ms-auto">
                  <div class="button-outer">
                    <button class="gradient-btn">New Message</button>
                  </div>
                </div>
              </h5>

              <div class="message-thread unread">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="resource-icon">
                      <i class="ri-user-line"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0">
                        Sarah Johnson
                        <span class="badge bg-danger ms-2">2</span>
                      </h6>
                      <small class="text-light">Guitar Coach</small>
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="message-preview">
                      Great progress on your chord transitions! Let's
                      schedule...
                    </div>
                    <small class="text-light">Today, 10:23 AM</small>
                  </div>
                </div>
              </div>

              <div class="message-thread">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="resource-icon">
                      <i class="ri-user-line"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0">Michael Chen</h6>
                      <small class="text-light">Music Theory Coach</small>
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="message-preview">
                      Your music theory homework was well done. I have some...
                    </div>
                    <small class="text-light">Yesterday, 3:45 PM</small>
                  </div>
                </div>
              </div>

              <div class="message-thread">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="resource-icon">
                      <i class="ri-user-line"></i>
                    </div>
                    <div class="ms-3">
                      <h6 class="mb-0">Support Team</h6>
                      <small class="text-light">Student Support</small>
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="message-preview">
                      Your technical issue has been resolved. Let us know if...
                    </div>
                    <small class="text-light">Sep 28, 2023</small>
                  </div>
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Messages</button>
                </div>
              </div>
            </div>

            <!-- Active Chat -->
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-user-line me-2"></i> Sarah Johnson
                <span class="ms-auto status-badge status-inprogress"
                  >Online</span
                >
              </h5>

              <div class="chat-container">
                <div class="message received">
                  <p class="mb-1">
                    Hi Alex! I reviewed your practice session from yesterday.
                    Great progress on your chord transitions!
                  </p>
                  <div class="message-time">10:15 AM</div>
                </div>

                <div class="message received">
                  <p class="mb-1">
                    Let's schedule some time to work on smoother changes between
                    G and C chords.
                  </p>
                  <div class="message-time">10:16 AM</div>
                </div>

                <div class="message sent">
                  <p class="mb-1">
                    Thanks Sarah! I've been practicing those transitions daily.
                    I'm available Thursday after 4 PM.
                  </p>
                  <div class="message-time">10:23 AM</div>
                </div>

                <div class="message received">
                  <p class="mb-1">
                    Perfect! I've scheduled you for Thursday at 4:30 PM. I'll
                    send some exercises to practice before then.
                  </p>
                  <div class="message-time">10:25 AM</div>
                </div>
              </div>

              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type your message..."
                  style="
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #dadada4d;
                    color: white;
                  "
                />
                <button
                  class="btn"
                  type="button"
                  style="
                    background: linear-gradient(
                      135deg,
                      #a748ff,
                      #ffc745,
                      #ff3419be
                    );
                    color: white;
                  "
                >
                  <i class="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Notifications -->
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-notification-3-line me-2"></i> Notifications
                <span class="ms-auto badge bg-danger">3 new</span>
              </h5>

              <div class="notification-item unread">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-0">Lesson Reminder</h6>
                    <p class="text-light small mb-0">
                      Your guitar lesson with Sarah starts in 30 minutes
                    </p>
                  </div>
                  <small class="text-light">Today, 2:30 PM</small>
                </div>
              </div>

              <div class="notification-item unread">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-0">New Resource Available</h6>
                    <p class="text-light small mb-0">
                      Sheet music for your next lesson has been added
                    </p>
                  </div>
                  <small class="text-light">Today, 11:15 AM</small>
                </div>
              </div>

              <div class="notification-item unread">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-0">Booking Confirmation</h6>
                    <p class="text-light small mb-0">
                      Your lesson on Thursday at 4:30 PM is confirmed
                    </p>
                  </div>
                  <small class="text-light">Today, 10:30 AM</small>
                </div>
              </div>

              <div class="notification-item">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="mb-0">Progress Report</h6>
                    <p class="text-light small mb-0">
                      Your monthly progress report is ready to view
                    </p>
                  </div>
                  <small class="text-light">Yesterday, 5:45 PM</small>
                </div>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Notifications</button>
                </div>
              </div>
            </div>

            <!-- Support Tickets -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-customer-service-2-line me-2"></i> Support Tickets
              </h5>

              <div class="ticket-item open">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Audio Quality Issue</h6>
                  <span class="status-badge status-inprogress"
                    >In Progress</span
                  >
                </div>
                <p class="text-light small mb-2">
                  Having trouble with audio during video lessons
                </p>
                <small class="text-light">Created: Oct 1, 2023</small>
              </div>

              <div class="ticket-item resolved">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <h6 class="mb-0">Payment Question</h6>
                  <span class="status-badge status-completed">Resolved</span>
                </div>
                <p class="text-light small mb-2">
                  Question about subscription renewal charge
                </p>
                <small class="text-light">Resolved: Sep 25, 2023</small>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">Create New Ticket</button>
                </div>
              </div>
            </div>

            <!-- Coaches -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-team-line me-2"></i> Your Coaches
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Sarah Johnson</h6>
                  <small class="text-light">Guitar Coach · Online</small>
                </div>
                <button
                  class="btn btn-sm"
                  style="
                    background: linear-gradient(
                      135deg,
                      #a748ff,
                      #ffc745,
                      #ff3419be
                    );
                    color: white;
                  "
                >
                  <i class="ri-message-3-line"></i>
                </button>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-user-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Michael Chen</h6>
                  <small class="text-light">Music Theory · Offline</small>
                </div>
                <button
                  class="btn btn-sm"
                  style="border: 1px solid #dadada4d; color: white"
                >
                  <i class="ri-message-3-line"></i>
                </button>
              </div>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Coaches</button>
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
