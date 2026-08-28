class Ticket {
    constructor(id, title, description, priority = 'Medium', createdBy) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority; // Low, Medium, High, Urgent
        this.status = 'Open'; // Open, In Progress, Resolved, Closed
        this.createdBy = createdBy;
        this.assignedTo = null;
        this.createdAt = new Date();
        this.comments = [];
    }

    assign(agent) {
        this.assignedTo = agent;
        this.status = 'In Progress';
    }

    addComment(author, text) {
        this.comments.push({
            author,
            text,
            timestamp: new Date()
        });
    }

    updateStatus(newStatus) {
        const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
        if (validStatuses.includes(newStatus)) {
            this.status = newStatus;
        } else {
            throw new Error('Invalid status type.');
        }
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

    getTicketById(id) {
        return this.tickets.find(ticket => ticket.id === id);
    }

    getTicketsByStatus(status) {
        return this.tickets.filter(ticket => ticket.status === status);
    }

    assignTicket(ticketId, agentName) {
        const ticket = this.getTicketById(ticketId);
        if (ticket) {
            ticket.assign(agentName);
            return true;
        }
        return false;
    }

    addCommentToTicket(ticketId, author, text) {
        const ticket = this.getTicketById(ticketId);
        if (ticket) {
            ticket.addComment(author, text);
            return true;
        }
        return false;
    }

    updateTicketStatus(ticketId, status) {
        const ticket = this.getTicketById(ticketId);
        if (ticket) {
            ticket.updateStatus(status);
            return true;
        }
        return false;
    }

    getAllTickets() {
        return this.tickets;
    }
}

// ==========================================
// EXAMPLE USAGE:
// ==========================================

const supportSystem = new TicketingSystem();

// 1. Create Tickets
const ticket1 = supportSystem.createTicket(
    'Login Issue', 
    'User cannot log in with correct password.', 
    'High', 
    'Alice'
);

const ticket2 = supportSystem.createTicket(
    'Billing Error', 
    'Double charged for the monthly subscription.', 
    'Urgent', 
    'Bob'
);

// 2. Assign a Ticket to an Agent
supportSystem.assignTicket(1, 'SupportAgent_John');

// 3. Add Comments
supportSystem.addCommentToTicket(1, 'SupportAgent_John', 'Checking server logs now.');
supportSystem.addCommentToTicket(1, 'Alice', 'Thank you, please let me know.');

// 4. Update Status
supportSystem.updateTicketStatus(2, 'In Progress');

// 5. View Results
console.log('--- All Tickets ---');
console.log(supportSystem.getAllTickets());

console.log('--- Filtered: In Progress ---');
console.log(supportSystem.getTicketsByStatus('In Progress'));
