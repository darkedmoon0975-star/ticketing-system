// ======================================================
// LOGIN
// ======================================================

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username =
        document.getElementById("username").value.trim();


    const password =
        document.getElementById("password").value;


    const error =
        document.getElementById("loginError");


    // Demo account

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "username",
            username
        );


        error.innerText = "";

        showApplication();

    } else {

        error.innerText =
            "Invalid username or password.";

    }

});



// ======================================================
// SHOW APPLICATION
// ======================================================

function showApplication() {

    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    const username =
        localStorage.getItem("username")
        || "Admin";


    document
        .getElementById("topUsername")
        .innerText = username;


    document
        .getElementById("topAvatar")
        .innerText =
        username.charAt(0).toUpperCase();


    updateDashboard();

    displayTickets();

}



// ======================================================
// LOGOUT
// ======================================================

function logout() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (!confirmLogout) {

        return;

    }


    localStorage.removeItem("loggedIn");

    localStorage.removeItem("username");


    document
        .getElementById("app")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("username")
        .value = "";

    document
        .getElementById("password")
        .value = "";

}



// ======================================================
// CHECK LOGIN
// ======================================================

if (
    localStorage.getItem("loggedIn") === "true"
) {

    showApplication();

}



// ======================================================
// TICKET DATA
// ======================================================

let tickets =
    JSON.parse(
        localStorage.getItem("tickets")
    ) || [

        {
            id: "TK-001",

            subject:
                "Computer not turning on",

            category:
                "Hardware",

            priority:
                "High",

            status:
                "Open",

            technician:
                "Dave",

            description:
                "Desktop computer does not power on.",

            date:
                "2026-09-02"

        },


        {
            id: "TK-002",

            subject:
                "Internet connection problem",

            category:
                "Network",

            priority:
                "Medium",

            status:
                "In Progress",

            technician:
                "Network Team",

            description:
                "Computer cannot connect to the internet.",

            date:
                "2026-09-02"

        },


        {
            id: "TK-003",

            subject:
                "Printer not printing",

            category:
                "Printer",

            priority:
                "Low",

            status:
                "Resolved",

            technician:
                "Dave",

            description:
                "Office printer is not printing.",

            date:
                "2026-09-01"

        }

    ];



// ======================================================
// SAVE TICKETS
// ======================================================

function saveTickets() {

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

}



// ======================================================
// PAGE NAVIGATION
// ======================================================

function showPage(
    pageName,
    clickedElement = null
) {


    // Hide pages

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    // Show selected page

    const selectedPage =
        document.getElementById(pageName);


    if (!selectedPage) {

        return;

    }


    selectedPage.classList.add(
        "active-page"
    );


    // Page titles

    const titles = {

        dashboard:
            "Dashboard",

        tickets:
            "My Tickets",

        create:
            "Create Ticket",

        allTickets:
            "All Tickets",

        users:
            "Users",

        reports:
            "Reports",

        settings:
            "Settings"

    };


    const descriptions = {

        dashboard:
            "Overview of your IT support tickets",

        tickets:
            "Tickets assigned to you",

        create:
            "Submit a new IT support request",

        allTickets:
            "View and manage all support tickets",

        users:
            "System users and technicians",

        reports:
            "Ticket statistics and reports",

        settings:
            "Manage your system preferences"

    };


    document
        .getElementById("pageTitle")
        .innerText =
        titles[pageName];


    document
        .getElementById("pageDescription")
        .innerText =
        descriptions[pageName];


    // Remove active menu

    document
        .querySelectorAll(".menu-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    // Activate clicked menu

    if (clickedElement) {

        clickedElement.classList.add(
            "active"
        );

    } else {

        const menu =
            document.querySelector(
                `.menu-item[data-page="${pageName}"]`
            );


        if (menu) {

            menu.classList.add("active");

        }

    }


    updateDashboard();

    displayTickets();

}



// ======================================================
// CREATE TICKET
// ======================================================

document
    .getElementById("ticketForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();


            const category =
                document.getElementById(
                    "category"
                ).value;


            const priority =
                document.getElementById(
                    "priority"
                ).value;


            const technician =
                document.getElementById(
                    "technician"
                ).value;


            const description =
                document.getElementById(
                    "description"
                ).value.trim();


            // Generate ID

            let number =
                tickets.length + 1;


            let ticketID =
                "TK-" +
                String(number).padStart(3, "0");


            // Current date

            const today =
                new Date()
                .toISOString()
                .split("T")[0];


            // Create object

            const newTicket = {

                id:
                    ticketID,

                subject:
                    subject,

                category:
                    category,

                priority:
                    priority,

                status:
                    "Open",

                technician:
                    technician,

                description:
                    description,

                date:
                    today

            };


            // Add ticket

            tickets.push(newTicket);


            // Save

            saveTickets();


            // Reset form

            document
                .getElementById("ticketForm")
                .reset();


            updateDashboard();

            displayTickets();


            alert(
                "Ticket " +
                ticketID +
                " created successfully!"
            );


            showPage("dashboard");

        }
    );



// ======================================================
// UPDATE DASHBOARD
// ======================================================

function updateDashboard() {

    const total =
        tickets.length;


    const open =
        tickets.filter(
            ticket =>
                ticket.status === "Open"
        ).length;


    const progress =
        tickets.filter(
            ticket =>
                ticket.status === "In Progress"
        ).length;


    const resolved =
        tickets.filter(
            ticket =>
                ticket.status === "Resolved"
        ).length;


    document
        .getElementById("totalTickets")
        .innerText = total;


    document
        .getElementById("openTickets")
        .innerText = open;


    document
        .getElementById("progressTickets")
        .innerText = progress;


    document
        .getElementById("resolvedTickets")
        .innerText = resolved;


    document
        .getElementById("reportTotal")
        .innerText = total;


    document
        .getElementById("reportOpen")
        .innerText = open;


    document
        .getElementById("reportResolved")
        .innerText = resolved;


    // Notification count

    document
        .getElementById("notificationBadge")
        .innerText = open;

}



// ======================================================
// DISPLAY TICKETS
// ======================================================

function displayTickets() {

    displayRecentTickets();

    displayMyTickets();

    displayAllTickets();

}



// ======================================================
// RECENT TICKETS
// ======================================================

function displayRecentTickets() {

    const table =
        document.getElementById(
            "recentTickets"
        );


    table.innerHTML = "";


    const recent =
        [...tickets]
        .reverse()
        .slice(0, 5);


    recent.forEach(ticket => {

        table.innerHTML +=
            createTicketRow(
                ticket,
                false
            );

    });

}



// ======================================================
// MY TICKETS
// ======================================================

function displayMyTickets() {

    const table =
        document.getElementById(
            "myTickets"
        );


    table.innerHTML = "";


    tickets.forEach(ticket => {

        table.innerHTML +=
            createTicketRow(
                ticket,
                false
            );

    });

}



// ======================================================
// ALL TICKETS
// ======================================================

function displayAllTickets() {

    const table =
        document.getElementById(
            "allTicketsTable"
        );


    table.innerHTML = "";


    tickets.forEach(ticket => {

        table.innerHTML +=
            createTicketRow(
                ticket,
                true
            );

    });

}



// ======================================================
// CREATE TABLE ROW
// ======================================================

function createTicketRow(
    ticket,
    includeTechnician
) {


    let statusClass =
        "status-open";


    if (
        ticket.status ===
        "In Progress"
    ) {

        statusClass =
            "status-progress";

    }


    if (
        ticket.status ===
        "Resolved"
    ) {

        statusClass =
            "status-resolved";

    }


    let priorityClass =
        "priority-low";


    if (
        ticket.priority === "High"
    ) {

        priorityClass =
            "priority-high";

    }


    if (
        ticket.priority === "Medium"
    ) {

        priorityClass =
            "priority-medium";

    }


    if (
        ticket.priority === "Critical"
    ) {

        priorityClass =
            "priority-critical";

    }


    return `

        <tr>

            <td>
                <strong>
                    #${ticket.id}
                </strong>
            </td>


            <td>
                ${ticket.subject}
            </td>


            <td>
                ${ticket.category}
            </td>


            <td>
                <span class="priority ${priorityClass}">
                    ${ticket.priority}
                </span>
            </td>


            <td>

                <select
                    onchange="changeStatus('${ticket.id}', this.value)"
                    class="status-select">

                    <option
                        ${ticket.status === "Open" ? "selected" : ""}>
                        Open
                    </option>

                    <option
                        ${ticket.status === "In Progress" ? "selected" : ""}>
                        In Progress
                    </option>

                    <option
                        ${ticket.status === "Resolved" ? "selected" : ""}>
                        Resolved
                    </option>

                </select>

            </td>


            ${
                includeTechnician
                ?
                `<td>${ticket.technician}</td>`
                :
                ""
            }


            <td>
                ${ticket.date}
            </td>

        </tr>

    `;

}



// ======================================================
// CHANGE STATUS
// ======================================================

function changeStatus(
    ticketID,
    newStatus
) {


    const ticket =
        tickets.find(
            ticket =>
                ticket.id === ticketID
        );


    if (!ticket) {

        return;

    }


    ticket.status =
        newStatus;


    saveTickets();


    updateDashboard();

    displayTickets();


    alert(
        ticketID +
        " status changed to " +
        newStatus
    );

}



// ======================================================
// SEARCH
// ======================================================

function searchTickets() {

    const search =
        document
            .getElementById(
                "searchTicket"
            )
            .value
            .toLowerCase();


    const table =
        document.getElementById(
            "allTicketsTable"
        );


    table.innerHTML = "";


    const results =
        tickets.filter(ticket =>

            ticket.id
                .toLowerCase()
                .includes(search)

            ||

            ticket.subject
                .toLowerCase()
                .includes(search)

            ||

            ticket.category
                .toLowerCase()
                .includes(search)

            ||

            ticket.status
                .toLowerCase()
                .includes(search)

        );


    results.forEach(ticket => {

        table.innerHTML +=
            createTicketRow(
                ticket,
                true
            );

    });

}



// ======================================================
// DARK MODE
// ======================================================

function toggleDarkMode() {

    const enabled =
        document
            .getElementById(
                "darkMode"
            )
            .checked;


    document.body
        .classList
        .toggle(
            "dark",
            enabled
        );


    localStorage.setItem(
        "darkMode",
        enabled
    );

}



// ======================================================
// LOAD DARK MODE
// ======================================================

if (
    localStorage.getItem(
        "darkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );


    document
        .getElementById(
            "darkMode"
        )
        .checked = true;

}



// ======================================================
// NOTIFICATIONS
// ======================================================

function toggleNotifications() {

    const enabled =
        document
            .getElementById(
                "notifications"
            )
            .checked;


    localStorage.setItem(
        "notifications",
        enabled
    );


    alert(
        enabled
        ? "Notifications enabled."
        : "Notifications disabled."
    );

}



// ======================================================
// NOTIFICATION BUTTON
// ======================================================

function toggleNotification() {

    const openTickets =
        tickets.filter(
            ticket =>
                ticket.status === "Open"
        ).length;


    if (openTickets === 0) {

        alert(
            "You have no new ticket notifications."
        );

    } else {

        alert(
            "You have " +
            openTickets +
            " open ticket(s)."
        );

    }

}



// ======================================================
// CHANGE PROFILE
// ======================================================

function changeProfile() {

    const currentName =
        localStorage.getItem(
            "username"
        ) || "Admin";


    const newName =
        prompt(
            "Enter your new display name:",
            currentName
        );


    if (
        newName &&
        newName.trim() !== ""
    ) {

        localStorage.setItem(
            "username",
            newName.trim()
        );


        document
            .getElementById(
                "topUsername"
            )
            .innerText =
            newName.trim();


        document
            .getElementById(
                "topAvatar"
            )
            .innerText =
            newName
                .trim()
                .charAt(0)
                .toUpperCase();


        alert(
            "Profile updated successfully."
        );

    }

}



// ======================================================
// ADD USER
// ======================================================

function addUser() {

    const name =
        prompt(
            "Enter the new user's name:"
        );


    if (
        name &&
        name.trim() !== ""
    ) {

        alert(
            name +
            " has been added as a user."
        );

    }

}



// ======================================================
// CLEAR TICKETS
// ======================================================

function clearTickets() {

    const confirmClear =
        confirm(
            "WARNING: This will delete all tickets. Continue?"
        );


    if (!confirmClear) {

        return;

    }


    tickets = [];


    saveTickets();


    updateDashboard();

    displayTickets();


    alert(
        "All ticket data has been cleared."
    );

}
