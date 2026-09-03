// ==========================================
// TICKET DATA
// ==========================================

let tickets = JSON.parse(localStorage.getItem("tickets")) || [

    {
        id: "TK-001",
        subject: "Computer not turning on",
        category: "Hardware",
        priority: "High",
        status: "Open",
        technician: "Dave",
        description: "Desktop computer does not power on.",
        date: "2026-09-02"
    },

    {
        id: "TK-002",
        subject: "Internet connection problem",
        category: "Network",
        priority: "Medium",
        status: "In Progress",
        technician: "Network Team",
        description: "Computer cannot connect to the internet.",
        date: "2026-09-02"
    },

    {
        id: "TK-003",
        subject: "Printer not printing",
        category: "Printer",
        priority: "Low",
        status: "Resolved",
        technician: "Dave",
        description: "Office printer is not printing documents.",
        date: "2026-09-01"
    }

];


// ==========================================
// SAVE TICKETS
// ==========================================

function saveTickets() {

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

}


// ==========================================
// CHANGE PAGE
// ==========================================

function showPage(pageName) {

    // Hide all pages

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active-page");

    });


    // Show selected page

    document
        .getElementById(pageName)
        .classList.add("active-page");


    // Change title

    const titles = {

        dashboard: "Dashboard",

        tickets: "My Tickets",

        create: "Create Ticket",

        allTickets: "All Tickets",

        users: "Users",

        reports: "Reports"

    };


    document.getElementById("pageTitle").innerText =
        titles[pageName];


    // Update menu

    const menuItems =
        document.querySelectorAll(".menu li");

    menuItems.forEach(item => {

        item.classList.remove("active");

    });


    // Refresh information

    updateDashboard();

    displayTickets();

}


// ==========================================
// CREATE TICKET
// ==========================================

document
    .getElementById("ticketForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const subject =
            document.getElementById("subject").value;

        const category =
            document.getElementById("category").value;

        const priority =
            document.getElementById("priority").value;

        const technician =
            document.getElementById("technician").value;

        const description =
            document.getElementById("description").value;


        // Generate ticket ID

        const number = tickets.length + 1;

        const ticketID =
            "TK-" + String(number).padStart(3, "0");


        // Get today's date

        const today =
            new Date().toISOString().split("T")[0];


        // Create ticket

        const newTicket = {

            id: ticketID,

            subject: subject,

            category: category,

            priority: priority,

            status: "Open",

            technician: technician,

            description: description,

            date: today

        };


        // Add ticket

        tickets.push(newTicket);


        // Save

        saveTickets();


        // Clear form

        document
            .getElementById("ticketForm")
            .reset();


        // Update dashboard

        updateDashboard();

        displayTickets();


        alert(
            "Ticket " +
            ticketID +
            " created successfully!"
        );


        // Go dashboard

        showPage("dashboard");

    });


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const total = tickets.length;


    const open =
        tickets.filter(
            ticket => ticket.status === "Open"
        ).length;


    const progress =
        tickets.filter(
            ticket => ticket.status === "In Progress"
        ).length;


    const resolved =
        tickets.filter(
            ticket => ticket.status === "Resolved"
        ).length;


    document.getElementById("totalTickets").innerText =
        total;

    document.getElementById("openTickets").innerText =
        open;

    document.getElementById("progressTickets").innerText =
        progress;

    document.getElementById("resolvedTickets").innerText =
        resolved;


    // Reports

    document.getElementById("reportTotal").innerText =
        total;

    document.getElementById("reportOpen").innerText =
        open;

    document.getElementById("reportResolved").innerText =
        resolved;

}


// ==========================================
// DISPLAY TICKETS
// ==========================================

function displayTickets() {

    displayRecentTickets();

    displayMyTickets();

    displayAllTickets();

}


// ==========================================
// RECENT TICKETS
// ==========================================

function displayRecentTickets() {

    const table =
        document.getElementById("recentTickets");


    table.innerHTML = "";


    const recent =
        [...tickets].reverse().slice(0, 5);


    recent.forEach(ticket => {

        table.innerHTML += createTicketRow(ticket, false);

    });

}


// ==========================================
// MY TICKETS
// ==========================================

function displayMyTickets() {

    const table =
        document.getElementById("myTickets");


    table.innerHTML = "";


    tickets.forEach(ticket => {

        table.innerHTML += createTicketRow(ticket, false);

    });

}


// ==========================================
// ALL TICKETS
// ==========================================

function displayAllTickets() {

    const table =
        document.getElementById("allTicketsTable");


    table.innerHTML = "";


    tickets.forEach(ticket => {

        table.innerHTML += createTicketRow(ticket, true);

    });

}


// ==========================================
// CREATE TABLE ROW
// ==========================================

function createTicketRow(ticket, includeTechnician) {

    let statusClass = "";

    if (ticket.status === "Open") {

        statusClass = "status-open";

    } else if (ticket.status === "In Progress") {

        statusClass = "status-progress";

    } else {

        statusClass = "status-resolved";

    }


    let priorityClass = "";

    if (ticket.priority === "High") {

        priorityClass = "priority-high";

    } else if (ticket.priority === "Medium") {

        priorityClass = "priority-medium";

    } else if (ticket.priority === "Critical") {

        priorityClass = "priority-critical";

    } else {

        priorityClass = "priority-low";

    }


    return `

        <tr>

            <td>
                <strong>#${ticket.id}</strong>
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
                <span class="status ${statusClass}">
                    ${ticket.status}
                </span>
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


// ==========================================
// SEARCH TICKETS
// ==========================================

function searchTickets() {

    const search =
        document
            .getElementById("searchTicket")
            .value
            .toLowerCase();


    const table =
        document.getElementById("allTicketsTable");


    table.innerHTML = "";


    const results =
        tickets.filter(ticket =>

            ticket.id.toLowerCase().includes(search) ||

            ticket.subject.toLowerCase().includes(search) ||

            ticket.category.toLowerCase().includes(search) ||

            ticket.status.toLowerCase().includes(search)

        );


    results.forEach(ticket => {

        table.innerHTML +=
            createTicketRow(ticket, true);

    });

}


// ==========================================
// START SYSTEM
// ==========================================

updateDashboard();

displayTickets();
