// employee-cli.js
const readline = require("readline");

// Create interface for user input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Employee list stored in memory (array of objects)
let employees = [];

// Display main menu
function showMenu() {
  console.log("\n=== Employee Management System ===");
  console.log("1. Add Employee");
  console.log("2. List Employees");
  console.log("3. Remove Employee");
  console.log("4. Exit");
  rl.question("Choose an option (1-4): ", handleMenu);
}

// Handle user selection
function handleMenu(option) {
  switch (option) {
    case "1":
      addEmployee();
      break;
    case "2":
      listEmployees();
      break;
    case "3":
      removeEmployee();
      break;
    case "4":
      console.log("Exiting... Goodbye!");
      rl.close();
      break;
    default:
      console.log("❌ Invalid choice. Please select 1-4.");
      showMenu();
  }
}

// Add employee
function addEmployee() {
  rl.question("Enter Employee ID: ", (id) => {
    // Check if ID already exists
    if (employees.some(emp => emp.id === id)) {
      console.log("❌ Employee with this ID already exists.");
      return showMenu();
    }
    rl.question("Enter Employee Name: ", (name) => {
      employees.push({ id, name });
      console.log(`✅ Employee added: { ID: ${id}, Name: ${name} }`);
      showMenu();
    });
  });
}

// List all employees
function listEmployees() {
  if (employees.length === 0) {
    console.log("📋 No employees found.");
  } else {
    console.log("\n📋 Employee List:");
    employees.forEach((emp, index) => {
  console.log(`${index + 1}. ID: ${emp.id}, Name: ${emp.name}`);
    });
  }
  showMenu();
}

// Remove employee by ID
function removeEmployee() {
  rl.question("Enter Employee ID to remove: ", (id) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const removed = employees.splice(index, 1);
  console.log(`✅ Removed Employee: { ID: ${removed[0].id}, Name: ${removed[0].name} }`);
    } else {
      console.log("❌ Employee not found.");
    }
    showMenu();
  });
}

// Start the program
showMenu();
