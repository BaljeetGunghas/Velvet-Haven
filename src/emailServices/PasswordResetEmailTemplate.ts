export const PasswordResetEmailTemplate = (name: string, resetToken: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - Velvet Haven</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
      color: #333;
      line-height: 1.6;
      padding: 20px;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
    }
    .email-container {
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid #f0f0f0;
    }

    /* Header with Gradient - Velvet Haven Colors */
    .email-header {
      background: linear-gradient(135deg, #103F36 0%, #1a5a4f 100%);
      color: #ffffff;
      text-align: center;
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
    }
    .email-header::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: rgba(201, 166, 107, 0.1);
      border-radius: 50%;
    }
    .email-header h1 {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 5px;
      position: relative;
      z-index: 1;
    }
    .email-header p {
      font-size: 14px;
      color: #C9A66B;
      letter-spacing: 2px;
      text-transform: uppercase;
      position: relative;
      z-index: 1;
    }

    /* Body Content */
    .email-body {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #103F36;
      margin-bottom: 20px;
      font-weight: 500;
    }
    .greeting strong {
      color: #C9A66B;
    }
    .description {
      font-size: 14px;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.8;
    }

    /* Token Section - Premium Design */
    .token-section {
      background: linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%);
      border: 2px solid #C9A66B;
      border-radius: 10px;
      padding: 25px;
      margin: 30px 0;
      text-align: center;
    }
    .token-label {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .token-box {
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .token-value {
      font-size: 16px;
      font-weight: 700;
      color: #103F36;
      font-family: 'Courier New', monospace;
      letter-spacing: 1px;
      word-break: break-all;
      flex: 1;
      user-select: all;
    }
    .copy-hint {
      font-size: 12px;
      color: #C9A66B;
      font-weight: 600;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    /* Instructions */
    .instructions {
      background: #f0f8f7;
      border-left: 4px solid #103F36;
      padding: 15px 20px;
      margin: 25px 0;
      border-radius: 4px;
    }
    .instructions h3 {
      color: #103F36;
      font-size: 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .instructions ul {
      list-style: none;
      font-size: 13px;
      color: #555;
    }
    .instructions li {
      margin-bottom: 8px;
      padding-left: 20px;
      position: relative;
    }
    .instructions li:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #C9A66B;
      font-weight: bold;
    }

    /* Security Warning */
    .security-warning {
      background: linear-gradient(135deg, #fff9e6 0%, #fff5cc 100%);
      border: 1px solid #FFD700;
      border-radius: 8px;
      padding: 15px 20px;
      margin: 25px 0;
    }
    .security-warning h4 {
      color: #d4681f;
      font-size: 13px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .security-warning ul {
      list-style: none;
      font-size: 12px;
      color: #333;
    }
    .security-warning li {
      margin-bottom: 6px;
      padding-left: 20px;
      position: relative;
    }
    .security-warning li:before {
      content: '⚠';
      position: absolute;
      left: 0;
    }

    /* Closing */
    .closing {
      font-size: 14px;
      color: #666;
      margin: 25px 0 0 0;
    }
    .signature {
      color: #103F36;
      font-weight: 600;
      margin-top: 10px;
    }

    /* Footer */
    .email-footer {
      background: #f9f9f9;
      text-align: center;
      font-size: 12px;
      color: #999;
      padding: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .footer-logo {
      color: #103F36;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-container">

      <!-- Header -->
      <div class="email-header">
        <h1>Password Reset</h1>
        <p>Velvet Haven - Luxury Stays</p>
      </div>

      <!-- Body -->
      <div class="email-body">
        <div class="greeting">
          Hello <strong>${name.toUpperCase()}</strong>,
        </div>

        <div class="description">
          We received a request to reset your password for your <strong>Velvet Haven</strong> account.
          Use the code below to create a new password. This code will expire in <strong>1 hour</strong>.
        </div>

        <!-- Token Section -->
        <div class="token-section">
          <div class="token-label">Your Reset Code</div>
          <div class="token-box">
            <div class="token-value">${resetToken}</div>
          </div>
          <div class="copy-hint">📋 Easy to copy - select and copy the code above</div>
        </div>

        <!-- Instructions -->
        <div class="instructions">
          <h3>📍 How to Reset Your Password</h3>
          <ul>
            <li>Go to the password reset page on Velvet Haven</li>
            <li>Paste this code into the "Reset Code" field</li>
            <li>Enter your new password (minimum 6 characters)</li>
            <li>Confirm your new password</li>
            <li>Click "Reset Password" to complete</li>
          </ul>
        </div>

        <!-- Security Warning -->
        <div class="security-warning">
          <h4>🔐 Security Reminder</h4>
          <ul>
            <li>This code expires in 1 hour</li>
            <li>Never share this code with anyone</li>
            <li>We will never ask for your password via email</li>
            <li>If you didn't request this, ignore this email</li>
          </ul>
        </div>

        <!-- Closing -->
        <div class="closing">
          Need help? Contact our support team.
          <div class="signature">Best regards,<br>Velvet Haven Security Team</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="email-footer">
        © 2024 <span class="footer-logo">Velvet Haven</span>. All rights reserved. | Luxury Stays
      </div>

    </div>
  </div>
</body>
</html>`;
};
