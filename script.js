<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IT Help Desk Ticketing System</title>
    <style>
        :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --bg-color: #f8fafc;
            --card-bg: #ffffff;
            --text-color: #1e293b;
            --text-muted: #64748b;
            --border-color: #e2e8f0;
            --danger: #ef4444;
            --success: #22c55e;
            --warning: #f59e0b;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .hidden {
            display: none !important;
        }

        /* Login Container */
        #loginSection {
            background: var(--card-bg);
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            width: 100%;
            max-width: 400px;
        }

        h2, h3 {
            margin-bottom: 20px;
            color: var(--text-color);
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.875rem;
        }

        input[type="text"], select, textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }

        input[type="text"]:focus, select:focus, textarea:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        button {
            width: 100%;
            padding: 10px 16px;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: var(--primary-hover);
        }

        /* Dashboard Container */
        #dashboardSection {
            width: 100%;
            max-width: 900px;
            background: var(--card-bg);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 15px;
        }

        .logout-btn {
            width: auto;
            background-color: var(--danger);
            padding: 6px 12px;
            font-size: 0.875rem;
        }

        .logout-btn:hover {
            background-color: #dc2626;
        }

        .ticket-form-container {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }

        .ticket-grid {
            display: grid;
            gap: 15px;
        }

        .ticket-card {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        .ticket-id {
            font-size: 0.75rem;
            font-weight: bold;
            color: var(--text-muted);
            text-transform: uppercase;
        }

        .ticket-title {
            font-size: 1.1rem;
            margin-top: 2px;
        }

        .ticket-desc {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin-bottom: 15px;
        }

        .ticket-footer {
            display: flex;
            justify-content: space-between;
            font-size: 0.85rem;
            color: var(--text-muted);
            border-top: 1px solid var(--border-color);
            padding-top: 10px;
        }

        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .badge-open {
            background-color: #dbeafe;
            color: #1e40af;
        }

        .text-muted {
            color: var(--text-muted);
            font-style: italic;
        }
    </style>
</head>
<body>

    <!-- Login Section -->
    <div id="loginSection">
        <h2>System Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username or Name</label>
                <input type="text" id="username" placeholder="e.g., Alice" required autocomplete="off">
            </div>
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role">
                    <option value="Customer">Customer</option>
                    <option value="Support Agent">Support Agent</option>
                </select>
            </div>
            <button type="submit">Log In</button>
        </form>
    </div>

    <!-- Dashboard Section -->
    <div id="dashboardSection" class="hidden">
        <div class="dashboard-header">
            <div>
                <h2>IT Support Dashboard</h2>
                <p id="welcomeUser" class="text-muted" style="font-style: normal; font-size: 0.9rem;"></p>
            </div>
            <button id="logoutBtn" class="logout-btn">Log Out</button>
        </div>

        <div class="ticket-form-container">
            <h3>Create New Ticket</h3>
            <form id="ticketForm">
                <div class="form-group">
                    <label for="title">Issue Summary</label>
                    <input type="text" id="title" placeholder="Brief description of the problem" required>
                </div>
                <div class="form-group">
                    <label for="description">Detailed Description</label>
                    <textarea id="description" rows="3" placeholder="Provide steps or error details..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority">
                        <option value="Low">Low</option>
                        <option value="Medium" selected>Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <button type="submit">Submit Ticket</button>
            </form>
        </div>

        <h3>Active Tickets</h3>
        <div id="ticketGrid" class="ticket-grid">
            <!-- Tickets will dynamically load here -->
        </div>
    </div>

    <script>
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

            if (currentUser && loginSection && dashboardSection) {
                loginSection.classList.add('hidden');
                dashboardSection.classList.remove('hidden');
                if (welcomeUser) {
                    welcomeUser.textContent = `Welcome, ${currentUser} (${currentRole})`;
                }
                renderTickets();
            } else if (loginSection && dashboardSection) {
                loginSection.classList.remove('hidden');
                dashboardSection.classList.add('hidden');
            }
        }

        // Handle Login Submission Safely
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const usernameInput = document.getElementById('username');
                const roleInput = document.getElementById('role');
                
                if (usernameInput) {
                    const username = usernameInput.value.trim();
                    const role = roleInput ? roleInput.value : 'Customer';
                    
                    if (username !== '') {
                        sessionStorage.setItem('currentUser', username);
                        sessionStorage.setItem('currentRole', role);
                        loginForm.reset();
                        checkAuth(); // Switch views instantly
                    }
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

        // Run initial check on page load
        document.addEventListener('DOMContentLoaded', () => {
            checkAuth();
        });
    </script>
</body>
</html>
