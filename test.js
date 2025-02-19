function generateuique() {
    return Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number
  }
  
  console.log(generateOTP4()); // Output: Random 4-digit OTP (e.g., 1234)
  