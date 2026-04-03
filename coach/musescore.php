<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coach Dashboard - MuseScore Sheets</title>
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

      /* Sheet Items */
      .sheet-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.05);
        margin-bottom: 15px;
        transition: all 0.3s ease;
      }

      .sheet-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .sheet-icon {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        background: linear-gradient(135deg, #a748ff, #ffc745, #ff3419be);
        font-size: 1.5rem;
      }

      .sheet-info {
        flex-grow: 1;
      }

      .sheet-title {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .sheet-meta {
        color: #aaa;
        font-size: 0.85rem;
      }

      .sheet-actions {
        display: flex;
        gap: 10px;
      }

      /* Form Styling */
      .form-control,
      .form-select {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        color: white;
        padding: 12px 15px;
      }

      .form-control::placeholder {
        color: #ffffffa6;
      }

      .form-control:focus,
      .form-select:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #ffc107;
        box-shadow: 0 0 0 0.2rem rgba(251, 215, 55, 0.25);
        color: white;
      }

      .form-label {
        color: #fff;
        font-weight: 500;
        margin-bottom: 8px;
      }

      /* Preview Panel */
      .preview-panel {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 20px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .preview-icon {
        font-size: 4rem;
        color: #ffc107;
        margin-bottom: 20px;
      }

      /* Button alignment fixes */
      .btn-align-fix {
        display: flex;
        align-items: center;
        justify-content: end;
        margin-top: 15px;
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

        .sheet-item {
          flex-direction: column;
          text-align: center;
        }

        .sheet-icon {
          margin-right: 0;
          margin-bottom: 10px;
        }

        .sheet-actions {
          margin-top: 10px;
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

        .sheet-item {
          padding: 10px;
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
          <a href="calendar.php"
            ><i class="ri-calendar-check-line"></i
            ><span>Booking Calendar</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Heal</p>
          <a href="musescore.php" class="activeNav"
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
              <h1 class="fw-bold">Musescore Sheets</h1>
              <p class="text-light mb-0">
                Manage your links your sheets music to lessons
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

        <div class="row">
          <!-- Sheet Music List -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <h5 class="d-flex align-items-center mb-4">
                <i class="ri-file-music-line me-2"></i> My Sheet Music
                <div class="ms-auto">
                  <div class="button-outer">
                    <button
                      class="gradient-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#addSheetModal"
                    >
                      Add New Sheet
                    </button>
                  </div>
                </div>
              </h5>

              <div class="mb-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search sheet music..."
                />
              </div>

              <div class="sheet-item">
                <div class="sheet-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div class="sheet-info">
                  <div class="sheet-title">Autumn Leaves - Jazz Standard</div>
                  <div class="sheet-meta">Intermediate · 3 pages · Guitar</div>
                </div>
                <div class="sheet-actions">
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-link"></i>
                  </button>
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn" style="color: #aaa">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <div class="sheet-item">
                <div class="sheet-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div class="sheet-info">
                  <div class="sheet-title">Moonlight Sonata - 1st Movement</div>
                  <div class="sheet-meta">Advanced · 5 pages · Piano</div>
                </div>
                <div class="sheet-actions">
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-link"></i>
                  </button>
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn" style="color: #aaa">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <div class="sheet-item">
                <div class="sheet-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div class="sheet-info">
                  <div class="sheet-title">Major Scales Exercises</div>
                  <div class="sheet-meta">
                    Beginner · 2 pages · All Instruments
                  </div>
                </div>
                <div class="sheet-actions">
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-link"></i>
                  </button>
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn" style="color: #aaa">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <div class="sheet-item">
                <div class="sheet-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div class="sheet-info">
                  <div class="sheet-title">Blues Progressions in C</div>
                  <div class="sheet-meta">
                    Intermediate · 4 pages · Guitar/Piano
                  </div>
                </div>
                <div class="sheet-actions">
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-link"></i>
                  </button>
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn" style="color: #aaa">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <div class="sheet-item">
                <div class="sheet-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div class="sheet-info">
                  <div class="sheet-title">Sight Reading Practice</div>
                  <div class="sheet-meta">Beginner · 6 pages · Piano</div>
                </div>
                <div class="sheet-actions">
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-link"></i>
                  </button>
                  <button class="btn" style="color: #ffc107">
                    <i class="ri-edit-line"></i>
                  </button>
                  <button class="btn" style="color: #aaa">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Linked Content -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-links-line me-2"></i> Linked Content
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-video-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Advanced Chord Progressions</h6>
                  <p class="text-light small mb-0">
                    Linked to: Autumn Leaves - Jazz Standard
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #aaa">
                  <i class="ri-link-unlink"></i>
                </button>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-video-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Blues Fundamentals</h6>
                  <p class="text-light small mb-0">
                    Linked to: Blues Progressions in C
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #aaa">
                  <i class="ri-link-unlink"></i>
                </button>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-video-line"></i>
                </div>
                <div class="flex-grow-1">
                  <h6 class="mb-0">Scale Mastery</h6>
                  <p class="text-light small mb-0">
                    Linked to: Major Scales Exercises
                  </p>
                </div>
                <button class="btn btn-sm" style="color: #aaa">
                  <i class="ri-link-unlink"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Sheet Preview -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-eye-line me-2"></i> Sheet Preview
              </h5>

              <div class="preview-panel">
                <i class="ri-file-music-line preview-icon"></i>
                <h5>Autumn Leaves - Jazz Standard</h5>
                <p class="text-light">Select a sheet to preview</p>
                <div class="button-outer mt-3">
                  <button class="gradient-btn">View on MuseScore</button>
                </div>
              </div>

              <div class="mt-4">
                <h6>Sheet Details</h6>
                <div class="resource-item">
                  <i class="ri-user-line"></i>
                  <div class="ms-2">
                    <div class="text-light small">Composer</div>
                    <div>Joseph Kosma</div>
                  </div>
                </div>

                <div class="resource-item">
                  <i class="ri-time-line"></i>
                  <div class="ms-2">
                    <div class="text-light small">Duration</div>
                    <div>3:45</div>
                  </div>
                </div>

                <div class="resource-item">
                  <i class="ri-bar-chart-line"></i>
                  <div class="ms-2">
                    <div class="text-light small">Difficulty</div>
                    <div>Intermediate</div>
                  </div>
                </div>

                <div class="resource-item">
                  <i class="ri-instrument-line"></i>
                  <div class="ms-2">
                    <div class="text-light small">Instrument</div>
                    <div>Guitar</div>
                  </div>
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
                    <i class="ri-upload-cloud-line me-2"></i> Import from
                    MuseScore
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-link me-2"></i> Link to Lesson
                  </button>
                </div>
                <div class="button-outer">
                  <button class="gradient-btn">
                    <i class="ri-download-cloud-line me-2"></i> Export
                    Collection
                  </button>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-line-chart-line me-2"></i> Sheet Music Stats
              </h5>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-file-music-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Total Sheets</h6>
                  <small class="text-light">24 sheets</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-links-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Linked to Lessons</h6>
                  <small class="text-light">18 sheets</small>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-download-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Total Downloads</h6>
                  <small class="text-light">142 downloads</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add Sheet Modal -->
    <div class="modal fade" id="addSheetModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" style="background: #1e1e1e; color: white">
          <div class="modal-header" style="border-color: #dadada4d">
            <h5 class="modal-title">Add New Sheet Music</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style="filter: invert(1)"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Sheet Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter sheet title"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">MuseScore Link</label>
                <input
                  type="url"
                  class="form-control"
                  placeholder="https://musescore.com/..."
                />
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Difficulty</label>
                  <select class="form-select">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Instrument</label>
                  <select class="form-select">
                    <option>Guitar</option>
                    <option>Piano</option>
                    <option>Violin</option>
                    <option>All Instruments</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  class="form-control"
                  rows="3"
                  placeholder="Enter sheet description"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer" style="border-color: #dadada4d">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              style="
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid #dadada4d;
                color: white;
              "
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn"
              style="
                background: linear-gradient(135deg, #fb4c37, #e02870);
                color: white;
              "
            >
              Add Sheet
            </button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // Simple interactivity for the sheet items
      document.querySelectorAll(".sheet-item").forEach((item) => {
        item.addEventListener("click", function (e) {
          if (!e.target.closest(".sheet-actions")) {
            const title = this.querySelector(".sheet-title").textContent;
            document.querySelector(".preview-panel h5").textContent = title;
            document.querySelector(".preview-panel p").textContent =
              "Preview for " + title;
          }
        });
      });

      // Link button functionality
      document.querySelectorAll(".sheet-actions .ri-link").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          alert("Linking this sheet to a lesson...");
        });
      });
    </script>
  </body>
</html>
