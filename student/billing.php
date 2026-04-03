<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student Dashboard - Billing & Payments</title>
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

      .dashboard-header h1 {
        position: relative;
      }
      .dashboard-header h1::after {
        content: "";
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: 2px solid rgba(250, 74, 59, 0.4);
        animation: pulseCircle 3s infinite;
      }

      @keyframes pulseCircle {
        0% {
          transform: scale(1) translateY(-50%);
          opacity: 0.7;
        }
        50% {
          transform: scale(1.2) translateY(-50%);
          opacity: 0.3;
        }
        100% {
          transform: scale(1) translateY(-50%);
          opacity: 0.7;
        }
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
      }

      .header-icon:hover {
        border-color: #fbd786;
        background-color: rgba(251, 76, 55, 0.1);
      }

      /* Cards */
      .dashboard-card {
        background-color: #00000065;
        border-radius: 12px;
        border: 1px solid #dadada4d;
        transition: all 0.3s ease;
        padding: 20px;
        margin-bottom: 20px;
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

      .status-paid {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
      }

      .status-pending {
        background: rgba(255, 193, 7, 0.2);
        color: #ffc107;
      }

      /* Table Styling */
      .invoice-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
      }

      .invoice-table th {
        text-align: left;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #aaa;
        font-weight: 500;
      }

      .invoice-table td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .invoice-table tr:last-child td {
        border-bottom: none;
      }

      .invoice-table tr {
        transition: background 0.2s ease;
      }

      .invoice-table tr:hover {
        background: rgba(255, 255, 255, 0.03);
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
          background: linear-gradient(120deg, #c589fe, #fbd786, #f7797d);
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
          <a href="support.php"
            ><i class="ri-file-download-line"></i><span>Support Center</span></a
          >

          <p class="text-uppercase small mt-3 mb-1 text-light">Heal</p>
          <a href="billing.php" class="activeNav"
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
            <h1 class="fw-bold">Billing & Payments</h1>
            <p class="text-light mb-0">
              View invoices, payment history, and subscription status
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

        <!-- Subscription Status Card -->
        <div class="dashboard-card">
          <h5 class="d-flex align-items-center mb-4">
            <i class="ri-vip-crown-line me-2"></i> Subscription Status
            <span class="ms-auto status-badge status-paid">Active</span>
          </h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <p class="mb-1 text-light">Current Plan</p>
              <h4 class="fw-bold">Premium Monthly</h4>
            </div>
            <div class="col-md-6 mb-3">
              <p class="mb-1 text-light">Renews On</p>
              <h4 class="fw-bold">Dec 31, 2025</h4>
            </div>
          </div>
          <hr class="my-3" style="border-color: rgba(255, 255, 255, 0.1)" />
          <div class="d-flex gap-2 flex-wrap">
            <div class="button-outer">
              <button class="gradient-btn">Renew Subscription</button>
            </div>
            <div class="button-outer">
              <button class="gradient-btn">Change Plan</button>
            </div>
            <div class="button-outer">
              <button class="gradient-btn">Buy Extra Sessions</button>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div class="dashboard-card">
          <h5 class="mb-3">
            <i class="ri-history-line me-2"></i> Payment History
          </h5>
          <p class="text-light mb-4">Your last 5 transactions</p>

          <div class="table-responsive">
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#12345</td>
                  <td>Nov 15, 2023</td>
                  <td>Monthly Subscription</td>
                  <td>$89.00</td>
                  <td><span class="status-badge status-paid">Paid</span></td>
                  <td>
                    <a href="#" class="text-decoration-none"
                      ><i class="ri-download-line"></i> Invoice</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>#12344</td>
                  <td>Oct 15, 2023</td>
                  <td>Monthly Subscription</td>
                  <td>$89.00</td>
                  <td><span class="status-badge status-paid">Paid</span></td>
                  <td>
                    <a href="#" class="text-decoration-none"
                      ><i class="ri-download-line"></i> Invoice</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>#12343</td>
                  <td>Sep 15, 2023</td>
                  <td>Monthly Subscription + 2 Extra Sessions</td>
                  <td>$129.00</td>
                  <td><span class="status-badge status-paid">Paid</span></td>
                  <td>
                    <a href="#" class="text-decoration-none"
                      ><i class="ri-download-line"></i> Invoice</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>#12342</td>
                  <td>Aug 15, 2023</td>
                  <td>Monthly Subscription</td>
                  <td>$89.00</td>
                  <td><span class="status-badge status-paid">Paid</span></td>
                  <td>
                    <a href="#" class="text-decoration-none"
                      ><i class="ri-download-line"></i> Invoice</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>#12341</td>
                  <td>Jul 15, 2023</td>
                  <td>Monthly Subscription</td>
                  <td>$89.00</td>
                  <td>
                    <span class="status-badge status-pending">Failed</span>
                  </td>
                  <td>
                    <a href="#" class="text-decoration-none"
                      ><i class="ri-download-line"></i> Invoice</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-end mt-3">
            <div class="button-outer">
              <button class="gradient-btn">View All Transactions</button>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="dashboard-card">
          <h5 class="mb-3">
            <i class="ri-bank-card-line me-2"></i> Payment Methods
          </h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <div
                class="d-flex align-items-center p-3"
                style="
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 10px;
                "
              >
                <i class="ri-bank-card-line me-3" style="font-size: 2rem"></i>
                <div>
                  <p class="mb-0">Visa ending in 4567</p>
                  <small class="text-light">Expires 05/2026</small>
                </div>
                <div class="ms-auto">
                  <button class="btn btn-sm text-danger p-0">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <div class="button-outer">
                <button class="gradient-btn">
                  <i class="ri-add-line me-2"></i> Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
