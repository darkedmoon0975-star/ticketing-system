class Ticket {
    constructor(id, title, description, priority = 'Medium', createdBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = 'Open';
        this.createdBy = createdBy;
        this.assignedTo = null;
        this.createdAt = new Date();
        this.comments = [];
    }

    assign(agent) {
        this.assignedTo = agent;
        this.status = 'In Progress';
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }
}

class TicketingSystem {
    constructor() {
        this.tickets = [];
        this.counter = 1;
    }

    createTicket(title, description, priority, createdBy) {
        const ticket = new Ticket(this.counter++, title, description, priority, createdBy);
        this.tickets.push(ticket);
        return ticket;
    }

    getAllTickets() {
        return this.tickets;
    }
}

// Initialize System & Mock Data
const system = new TicketingSystem();
system.createTicket('Cannot connect to VPN', 'Getting error 691 when attempting connection.', 'High', 'Bob');
system.createTicket('Password Reset', 'Need a reset link for my corporate account.', 'Medium', 'Charlie');

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeUser = document.getElementById('welcomeUser');
const ticketForm = document.getElementById('ticketForm');
const ticketGrid = document.getElementById('ticketGrid');

// Check if user is logged in
function checkAuth() {
    const currentUser = sessionStorage.getItem('currentUser');
    const currentRole = sessionStorage.getItem('currentRole');

    if (currentUser) {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        welcomeUser.textContent = `Welcome, ${currentUser} (${currentRole})`;
        renderTickets();
    } else {
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
}

// Handle Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('role').value;

    if (username) {
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('currentRole', role);
        loginForm.reset();
        checkAuth();
    }
});

// Handle Logout Button
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentRole');
    checkAuth();
});

// Render Tickets to Grid
function renderTickets() {
    ticketGrid.innerHTML = '';
    const tickets = system.getAllTickets();

    if (tickets.length === 0) {
        ticketGrid.innerHTML = '<p class="text-muted">No tickets found.</p>';
        return;
    }

    tickets.forEach(ticket => {
        const card = document.createElement('div');
        card.className = 'ticket-card';
        const statusClass = `badge-${ticket.status.toLowerCase().replace(' ', '-')}`;

        card.innerHTML = `
            <div>
                <div class="ticket-header">
                    <div>
                        <span class="ticket-id">#${ticket.id}</span>
                        <h3 class="ticket-title">${escapeHTML(ticket.title)}</h3>
                    </div>
                    <span class="badge ${statusClass}">${ticket.status}</span>
                </div>
                <p class="ticket-desc">${escapeHTML(ticket.description)}</p>
            </div>
            <div class="ticket-footer">
                <span>By: ${escapeHTML(ticket.createdBy)}</span>
                <span>Priority: <strong>${ticket.priority}</strong></span>
            </div>
        `;
        ticketGrid.appendChild(card);
    });
}

// Handle New Ticket Submission
ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const createdBy = sessionStorage.getItem('currentUser') || 'Anonymous';

    system.createTicket(title, description, priority, createdBy);
    ticketForm.reset();
    renderTickets();
});

// Helper to prevent basic XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Run auth check on initial script load
checkAuth();
