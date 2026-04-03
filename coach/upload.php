<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coach Dashboard - Upload Content</title>
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

      /* Form Styling */
      .form-control,
      .form-select {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        color: white;
        padding: 12px 15px;
      }
      .form-control::placeholder {
        color: #ffffff75;
      }

      .form-control:focus,
      .form-select:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #ffc745;
        box-shadow: 0 0 0 0.2rem rgba(251, 205, 55, 0.25);
        color: white;
      }

      .form-label {
        color: #fff;
        font-weight: 500;
        margin-bottom: 8px;
      }

      /* Upload Area */
      .upload-area {
        border: 2px dashed #dadada4d;
        border-radius: 12px;
        padding: 40px 20px;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        margin-bottom: 20px;
      }

      .upload-area:hover {
        border-color: #ffc745;
        background-color: rgba(251, 76, 55, 0.05);
      }

      .upload-icon {
        font-size: 3rem;
        margin-bottom: 15px;
        color: #ffc745;
      }

      /* File List */
      .file-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .file-item {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.05);
        margin-bottom: 10px;
      }

      .file-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        background: linear-gradient(135deg, #fb4c37, #ffc745);
      }

      .file-info {
        flex-grow: 1;
      }

      .file-name {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .file-size {
        color: #aaa;
        font-size: 0.85rem;
      }

      .file-actions {
        display: flex;
        gap: 10px;
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

      .progress-bar {
        background: linear-gradient(to right, #fb4c37, #ffc745);
        border-radius: 4px;
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
          background: linear-gradient(135deg, #fb4c37, #ffc745);
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

        .upload-area {
          padding: 20px 10px;
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
          <a href="upload.php" class="activeNav"
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
              <h1 class="fw-bold">Upload Content</h1>
              <p class="text-light mb-0">
                Manage your lessons material and resources
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
          <!-- Upload Form -->
          <div class="col-lg-8">
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-upload-cloud-line me-2"></i> Upload New Content
              </h5>

              <form id="uploadForm">
                <div class="mb-4">
                  <label for="contentTitle" class="form-label"
                    >Content Title</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="contentTitle"
                    placeholder="Enter content title"
                  />
                </div>

                <div class="mb-4">
                  <label for="contentDescription" class="form-label"
                    >Description</label
                  >
                  <textarea
                    class="form-control"
                    id="contentDescription"
                    rows="3"
                    placeholder="Enter content description"
                  ></textarea>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="contentType" class="form-label"
                      >Content Type</label
                    >
                    <select class="form-select" id="contentType">
                      <option selected>Select content type</option>
                      <option value="video">Video Lesson</option>
                      <option value="audio">Audio File</option>
                      <option value="pdf">PDF Document</option>
                      <option value="sheet">Sheet Music</option>
                      <option value="exercise">Practice Exercise</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="contentCourse" class="form-label"
                      >Assign to Course</label
                    >
                    <select class="form-select" id="contentCourse">
                      <option selected>Select course</option>
                      <option value="guitar">Guitar Mastery</option>
                      <option value="piano">Piano Fundamentals</option>
                      <option value="theory">Music Theory</option>
                      <option value="vocal">Vocal Training</option>
                    </select>
                  </div>
                </div>

                <div class="mb-4">
                  <label class="form-label">Upload Files</label>
                  <div class="upload-area">
                    <i class="ri-upload-cloud-2-line upload-icon"></i>
                    <h5>Drag & Drop Files Here</h5>
                    <p class="text-light">or click to browse your files</p>
                    <input
                      type="file"
                      class="d-none"
                      id="fileUpload"
                      multiple
                    />
                    <div class="button-outer mt-3">
                      <button
                        type="button"
                        class="gradient-btn"
                        onclick="document.getElementById('fileUpload').click()"
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="musescoreLink" class="form-label"
                    >MuseScore Link (Optional)</label
                  >
                  <input
                    type="url"
                    class="form-control"
                    id="musescoreLink"
                    placeholder="https://musescore.com/..."
                  />
                </div>

                <div class="form-check mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="notifyStudents"
                  />
                  <label class="form-check-label" for="notifyStudents">
                    Notify students about this new content
                  </label>
                </div>

                <div class="btn-align-fix">
                  <div class="button-outer me-2">
                    <button type="reset" class="gradient-btn">Cancel</button>
                  </div>
                  <div class="button-outer">
                    <button type="submit" class="gradient-btn">
                      Upload Content
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-4">
            <!-- Recent Uploads -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-history-line me-2"></i> Recent Uploads
              </h5>

              <ul class="file-list">
                <li class="file-item">
                  <div class="file-icon">
                    <i class="ri-video-line"></i>
                  </div>
                  <div class="file-info">
                    <div class="file-name">Advanced Chord Progressions</div>
                    <div class="file-size">Video · 245 MB · Today</div>
                  </div>
                  <div class="file-actions">
                    <button class="btn btn-sm" style="color: #fb4c37">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm" style="color: #aaa">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </li>

                <li class="file-item">
                  <div class="file-icon">
                    <i class="ri-file-text-line"></i>
                  </div>
                  <div class="file-info">
                    <div class="file-name">Practice Exercises - Module 3</div>
                    <div class="file-size">PDF · 3.2 MB · Yesterday</div>
                  </div>
                  <div class="file-actions">
                    <button class="btn btn-sm" style="color: #fb4c37">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm" style="color: #aaa">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </li>

                <li class="file-item">
                  <div class="file-icon">
                    <i class="ri-music-2-line"></i>
                  </div>
                  <div class="file-info">
                    <div class="file-name">Autumn Leaves Sheet Music</div>
                    <div class="file-size">MuseScore · 2 days ago</div>
                  </div>
                  <div class="file-actions">
                    <button class="btn btn-sm" style="color: #fb4c37">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm" style="color: #aaa">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </li>

                <li class="file-item">
                  <div class="file-icon">
                    <i class="ri-file-pdf-line"></i>
                  </div>
                  <div class="file-info">
                    <div class="file-name">Music Theory Basics</div>
                    <div class="file-size">PDF · 5.7 MB · 3 days ago</div>
                  </div>
                  <div class="file-actions">
                    <button class="btn btn-sm" style="color: #fb4c37">
                      <i class="ri-edit-line"></i>
                    </button>
                    <button class="btn btn-sm" style="color: #aaa">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </li>
              </ul>

              <div class="btn-align-fix mt-3">
                <div class="button-outer">
                  <button class="gradient-btn">View All Uploads</button>
                </div>
              </div>
            </div>

            <!-- Storage Status -->
            <div class="dashboard-card">
              <h5 class="mb-4">
                <i class="ri-database-2-line me-2"></i> Storage Status
              </h5>

              <div class="mb-3">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span class="text-light">Used: 2.1 GB of 10 GB</span>
                  <span class="text-light">21%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div class="progress-bar" style="width: 21%"></div>
                </div>
              </div>

              <div class="resource-item">
                <div class="resource-icon">
                  <i class="ri-video-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Videos</h6>
                  <small class="text-light">1.4 GB · 12 files</small>
                </div>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-file-text-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Documents</h6>
                  <small class="text-light">0.6 GB · 24 files</small>
                </div>
              </div>

              <div class="resource-item mt-2">
                <div class="resource-icon">
                  <i class="ri-music-2-line"></i>
                </div>
                <div>
                  <h6 class="mb-0">Sheet Music</h6>
                  <small class="text-light">0.1 GB · 8 files</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // Form submission handler
      document
        .getElementById("uploadForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          alert("Content uploaded successfully!");
          this.reset();
        });

      // Drag and drop functionality
      const uploadArea = document.querySelector(".upload-area");
      const fileInput = document.getElementById("fileUpload");

      uploadArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        this.style.borderColor = "#fb4c37";
        this.style.backgroundColor = "rgba(251, 76, 55, 0.1)";
      });

      uploadArea.addEventListener("dragleave", function () {
        this.style.borderColor = "#dadada4d";
        this.style.backgroundColor = "transparent";
      });

      uploadArea.addEventListener("drop", function (e) {
        e.preventDefault();
        this.style.borderColor = "#dadada4d";
        this.style.backgroundColor = "transparent";

        if (e.dataTransfer.files.length > 0) {
          fileInput.files = e.dataTransfer.files;
          alert(`Added ${e.dataTransfer.files.length} file(s) for upload`);
        }
      });

      uploadArea.addEventListener("click", function () {
        fileInput.click();
      });
    </script>
  </body>
</html>
