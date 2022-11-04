// Week 5 Coding Assignment: Menu App adding/deleting/creating employee ID #'s for New Hires for the company
class NewEmployee {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }

    describe() {
        return `${this.name} works as a ${this.job}.`;
    }
}

class HiredEmployee {
    constructor(name) {
        this.name = name;
        this.hires = [];
    }
 
    addWorker(worker) {
        if (worker instanceof NewEmployee) {
            this.hires.push(worker);
        } else {
            throw new Error(`You can only add an instance of an employee. Argument is not an employee: ${worker}`);
        }
    }
 
    describe() {
        return `${this.name} has ${this.hires.length} hires.`;
    }
}


class Options {
    constructor() {
        this.employee = [];
        this.selectedEmployee = null;
    }

    start() {
        let selection = this.mainMenuOptions();

        while (selection !=1) {
            switch(selection) {
                case '2':
                    this.addEmployee();
                    break;
                case '3':
                    this.viewEmployeeFile();
                    break;
                case '4':
                    this.deleteEmployeeFile();
                    break;
                case '5':
                    this.displayAllEmployees();
                    break;
                default:
                    selection = 1;
            }

            selection = this.mainMenuOptions();

        }

        alert('You have exited :)');

    }

    mainMenuOptions() {
        return prompt(`
        1) Exit
        2) Add Employee
        3) View Employee File
        4) Delete Employee File
        5) Display all employees
        `)
    }

    showEmployeeFileOption(employeeInfo) {
        return prompt(`
        1) Back
        2) Create Employee ID #
        3) Delete ID #
        -------------------------------
        ${employeeInfo}
        `);
    }

    displayAllEmployees() {
        let teamEmployees = '';
        for (let i = 0; i < this.employee.length; i++) {
            teamEmployees += i + ') ' + this.employee[i].name + '\n';
        }

        alert(teamEmployees);

    }

    addEmployee() {
        let name = prompt('Enter name of employee:');
        this.employee.push(new HiredEmployee(name));
    }

    viewEmployeeFile() {
        let number = prompt('Enter the number of the hired employee you wish to view:');
        if(number > -1 && number < this.employee.length) {
            this.selectedEmployee = this.employee[number];
            let description = 'Employee Name: ' + this.selectedEmployee.name + '\n';

            for(let i = 0; i < this.selectedEmployee.hires.length; i++) {
                description += i + ') ' + this.selectedEmployee.hires[i].name + ' - ' + this.selectedEmployee.hires[i].job + '\n';
            }

            let selection = this.showEmployeeFileOption(description);
            switch(selection) {
                case '2':
                    this.createEmployeeID();
                    break;
                case '3':
                    this.deleteEmployeeID();
            }
        }
    }

    deleteEmployeeFile() {
        let number = prompt('Enter the number of the employee you wish to delete:');
        if (number > -1 && number < this.employee.length) {
            this.employee.splice(number, 1);
        }
    }

    createEmployeeID() {
        let name = prompt('Enter Employee ID number for new hire:');
        let job = prompt('Enter position for new hire:');
        this.selectedEmployee.hires.push(new NewEmployee(name, job));
    }

    deleteEmployeeID() {
        let number = prompt('Enter the index of the Employee ID you wish to delete:');
        if(number > -1 && number < this.selectedEmployee.hires.length) {
            this.selectedEmployee.hires.splice(number, 1);
        }
    }
}

let options = new Options();
options.start();
