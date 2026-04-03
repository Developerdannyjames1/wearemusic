<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login - Music Coaching Platform</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css"
      rel="stylesheet"
    />
    <style>
      /* ====== EXACT THEME FROM DASHBOARD ====== */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #b1cfff, #ffb3f5, #ffd04e);
        color: #fff;
        min-height: 100vh;
        overflow-x: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .gradientwrapper {
        background-blend-mode: darken;
        background-color: #0000008f;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-image: url("https://stage7.demolinkdesign.com/wp-content/uploads/2025/07/image-39.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: -1;
      }

      /* Auth Container */
      .auth-container {
        width: 100%;
        max-width: 420px;
        z-index: 2;
      }

      .auth-card {
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        border: 1px solid #dadada4d;
        padding: 30px;
        margin-bottom: 20px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }

      .auth-card:hover {
        border-color: #fb4c37;
        transform: translateY(-5px);
      }

      .auth-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .auth-logo {
        font-size: 2.5rem;
        background: linear-gradient(120deg, #89f7fe, #fbd786, #f7797d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 15px;
      }

      .auth-title {
        font-weight: bold;
        margin-bottom: 10px;
        background: linear-gradient(120deg, #c589fe, #fbd786, #f7797d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .auth-subtitle {
        color: white;
        font-size: 0.95rem;
      }

      /* Form Styling */
      .form-control {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        color: white;
        padding: 12px 15px;
        border-radius: 10px;
        margin-bottom: 20px;
      }

      .form-control:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #ffd04eb2;
        box-shadow: 0 0 0 0.2rem rgba(255, 126, 5, 0.877);
        color: white;
      }

      .form-label {
        color: #fff;
        font-weight: 500;
        margin-bottom: 8px;
        display: block;
      }

      .input-icon {
        position: relative;
      }

      .input-icon i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
      }

      .input-icon .form-control {
        padding-left: 45px;
      }

      /* Buttons */
      .auth-btn {
        background: linear-gradient(120deg, #c589fe, #fbc486, #ff6017c7);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s ease;
        margin-bottom: 20px;
      }

      .auth-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(251, 76, 55, 0.4);
      }

      .auth-btn-outline {
        background: transparent;
        border: 1px solid #dadada4d;
        color: white;
        padding: 12px 20px;
        border-radius: 10px;
        font-weight: 600;
        width: 100%;
        transition: all 0.3s ease;
      }

      .auth-btn-outline:hover {
        border-color: #ffd04eb2;
        background: rgba(251, 166, 55, 0.692);
      }

      /* Links */
      .auth-link {
        color: #ffd04eb2;
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 500;
      }

      .auth-link:hover {
        color: #e02870;
        text-decoration: underline;
      }

      /* Divider */
      .divider {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 25px 0;
        color: #aaa;
      }

      .divider::before,
      .divider::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #dadada4d;
      }

      .divider::before {
        margin-right: 10px;
      }

      .divider::after {
        margin-left: 10px;
      }

      /* Social Buttons */
      .social-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 20px;
      }

      .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #dadada4d;
        color: white;
        transition: all 0.3s ease;
      }

      .social-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: #fb4c37;
      }

      /* Form Toggle */
      .form-toggle {
        text-align: center;
        margin-top: 20px;
        color: #aaa;
      }

      /* Auth Footer */
      .auth-footer {
        text-align: center;
        color: #aaa;
        font-size: 0.85rem;
        margin-top: 30px;
      }

      /* Form Pages */
      .form-page {
        display: none;
      }

      .form-page.active {
        display: block;
      }

      /* Responsive Design */
      @media (max-width: 576px) {
        .auth-card {
          padding: 20px;
        }

        .social-buttons {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="gradientwrapper"></div>

    <div class="auth-container">
      <!-- Login Form -->
      <div class="form-page active" id="login-form">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-logo">
              <i class="ri-music-2-fill"></i>
            </div>
            <h2 class="auth-title">Welcome Back</h2>
            <p class="auth-subtitle">Sign in to your coaching account</p>
          </div>

          <form>
            <div class="input-icon">
              <i class="ri-user-line"></i>
              <input
                type="email"
                class="form-control"
                placeholder="Email address"
                required
              />
            </div>

            <div class="input-icon">
              <i class="ri-lock-line"></i>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="rememberMe"
                />
                <label class="form-check-label" for="rememberMe"
                  >Remember me</label
                >
              </div>
              <a href="#" class="auth-link" onclick="showForm('forgot-form')"
                >Forgot password?</a
              >
            </div>

            <button type="submit" class="auth-btn">Sign In</button>

            <div class="divider">or continue with</div>

            <div class="social-buttons">
              <button type="button" class="social-btn">
                <i class="ri-google-fill"></i>
              </button>
              <button type="button" class="social-btn">
                <i class="ri-facebook-fill"></i>
              </button>
              <button type="button" class="social-btn">
                <i class="ri-apple-fill"></i>
              </button>
            </div>

            <div class="form-toggle">
              Don't have an account?
              <a href="#" class="auth-link" onclick="showForm('register-form')"
                >Sign up</a
              >
            </div>
          </form>
        </div>
      </div>

      <!-- Register Form -->
      <div class="form-page" id="register-form">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-logo">
              <i class="ri-music-2-fill"></i>
            </div>
            <h2 class="auth-title">Create Account</h2>
            <p class="auth-subtitle">Join as student or coach</p>
          </div>

          <form>
            <div class="row">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  required
                />
              </div>
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <input
              type="email"
              class="form-control"
              placeholder="Email address"
              required
            />

            <div class="input-icon">
              <i class="ri-lock-line"></i>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                required
              />
            </div>

            <div class="input-icon">
              <i class="ri-lock-line"></i>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm password"
                required
              />
            </div>

            <select class="form-control" required>
              <option value="" disabled selected>I am a...</option>
              <option value="student">Student</option>
              <option value="coach">Music Coach</option>
            </select>

            <div class="form-check mb-4">
              <input
                type="checkbox"
                class="form-check-input"
                id="termsAgree"
                required
              />
              <label class="form-check-label" for="termsAgree"
                >I agree to the
                <a href="#" class="auth-link">Terms & Conditions</a></label
              >
            </div>

            <button type="submit" class="auth-btn">Create Account</button>

            <div class="form-toggle">
              Already have an account?
              <a href="#" class="auth-link" onclick="showForm('login-form')"
                >Sign in</a
              >
            </div>
          </form>
        </div>
      </div>

      <!-- Forgot Password Form -->
      <div class="form-page" id="forgot-form">
        <div class="auth-card">
          <div class="auth-header">
            <div class="auth-logo">
              <i class="ri-music-2-fill"></i>
            </div>
            <h2 class="auth-title">Reset Password</h2>
            <p class="auth-subtitle">Enter your email to reset your password</p>
          </div>

          <form>
            <div class="input-icon">
              <i class="ri-mail-line"></i>
              <input
                type="email"
                class="form-control"
                placeholder="Email address"
                required
              />
            </div>

            <button type="submit" class="auth-btn">Reset Password</button>

            <div class="form-toggle">
              Remember your password?
              <a href="#" class="auth-link" onclick="showForm('login-form')"
                >Sign in</a
              >
            </div>
          </form>
        </div>
      </div>

      <div class="auth-footer">
        &copy; 2023 Music Coaching Platform. All rights reserved.
      </div>
    </div>

    <script>
      function showForm(formId) {
        // Hide all forms
        document.querySelectorAll(".form-page").forEach((form) => {
          form.classList.remove("active");
        });

        // Show the selected form
        document.getElementById(formId).classList.add("active");
      }

      // Form validation and submission
      document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", function (e) {
          e.preventDefault();

          if (form.id === "login-form") {
            // Simulate login process
            const email = form.querySelector('input[type="email"]').value;
            alert(`Login successful! Redirecting to dashboard...`);
            // In a real app, you would redirect to the dashboard here
          } else if (form.id === "register-form") {
            // Simulate registration process
            alert(
              "Account created successfully! Please check your email to verify your account."
            );
            showForm("login-form");
          } else if (form.id === "forgot-form") {
            // Simulate password reset process
            alert("Password reset instructions have been sent to your email.");
            showForm("login-form");
          }
        });
      });
    </script>
  </body>
</html>