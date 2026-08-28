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

// Check Session Authentication State
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

// Handle Login Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username');
        const roleInput = document.getElementById('role');
        
        if (usernameInput && usernameInput.value.trim() !== '') {
            sessionStorage.setItem('currentUser', usernameInput.value.trim());
            sessionStorage.setItem('currentRole', roleInput.value);
            loginForm.reset();
            checkAuth();
        }
    });
}

// Handle Logout Button
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentRole');
        checkAuth();
    });
}

// Render Tickets Function
function renderTickets() {
    if (!ticketGrid) return;
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

// Handle Ticket Creation Form Submission
if (ticketForm) {
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titleInput = document.getElementById('title');
        const descInput = document.getElementById('description');
        const priorityInput = document.getElementById('priority');

        if (!titleInput || !descInput || !priorityInput) return;

        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        const priority = priorityInput.value;
        const createdBy = sessionStorage.getItem('currentUser') || 'Anonymous';

        if (title && description) {
            system.createTicket(title, description, priority, createdBy);
            ticketForm.reset();
            renderTickets();
        }
    });
}

// Helper to prevent basic XSS injections
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Run initial check on load
checkAuth();
