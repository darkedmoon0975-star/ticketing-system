let tickets = [];
let ticketNumber = 1001;

function createTicket() {
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const description = document.getElementById("description").value;

    if (name === "" || subject === "" || description === "") {
        alert("Please complete all fields.");
        return;
    }

    const ticket = {
        id: ticketNumber++,
        name: name,
        subject: subject,
        description: description,
        status: "Open"
    };

    tickets.push(ticket);

    displayTickets();

    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("description").value = "";

    alert("Ticket created successfully!");
}

function displayTickets() {
    const table = document.getElementById("ticketTable");

    table.innerHTML = "";

    tickets.forEach(ticket => {
        const row = `
            <tr>
                <td>#${ticket.id}</td>
                <td>${ticket.name}</td>
                <td>${ticket.subject}</td>
                <td>${ticket.description}</td>
                <td>${ticket.status}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}
