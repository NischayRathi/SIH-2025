// Simple test script to debug admin signup/login
const bcrypt = require("bcryptjs");

async function testAdminCreation() {
  console.log("Testing admin account creation...");

  // Test data
  const testAdmin = {
    name: "Test Admin",
    email: "testadmin@prakriti.com",
    password: "password123",
    contactNumber: "1234567890",
    department: "IT",
    employeeId: "EMP001",
    designation: "System Administrator",
    workLocation: "Head Office",
    adminKey: "PRAKRITI_ADMIN_2024_SECURE_KEY",
  };

  try {
    // Test password hashing
    const hashedPassword = await bcrypt.hash(testAdmin.password, 12);
    console.log("✅ Password hashing works");

    // Test API call
    const response = await fetch("http://localhost:3001/api/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testAdmin),
    });

    const result = await response.json();
    console.log("API Response:", response.status, result);

    if (response.ok) {
      console.log("✅ Admin account created successfully");

      // Now test login
      console.log("\nTesting admin login...");
      const loginResponse = await fetch(
        "http://localhost:3001/api/auth/callback/credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: testAdmin.email,
            password: testAdmin.password,
            role: "admin",
            callbackUrl: "/admin/dashboard",
          }),
        }
      );

      console.log("Login Response:", loginResponse.status);
    } else {
      console.log("❌ Admin account creation failed:", result);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testAdminCreation();
