// Admin Dashboard JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeDynamicFields();
    initializeFormValidation();
    initializeConfirmDialogs();
    initializeTooltips();
});

// Dynamic form fields (for features, details, etc.)
function initializeDynamicFields() {
    const addButtons = document.querySelectorAll('.btn-add-field');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const container = this.parentElement.querySelector('.dynamic-fields');
            const fieldType = this.dataset.field;
            addDynamicField(container, fieldType);
        });
    });
    
    // Initialize remove buttons for existing fields
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-remove-field')) {
            e.target.parentElement.remove();
        }
    });
}

function addDynamicField(container, fieldType) {
    if (!container || !fieldType) {
        console.error('Invalid container or fieldType for addDynamicField');
        return;
    }
    
    const fieldCount = container.children.length;
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'field-item';
    
    fieldDiv.innerHTML = `
        <input type="text" name="${fieldType}_${fieldCount}" placeholder="Enter ${fieldType}" required>
        <button type="button" class="btn-remove-field btn-remove">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(fieldDiv);
}

// Form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    if (!form) {
        console.error('No form provided for validation');
        return false;
    }
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value || !field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    if (!field || !field.parentElement) {
        console.error('Invalid field provided for error display');
        return;
    }
    
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff453a';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentElement.appendChild(errorDiv);
    field.style.borderColor = '#ff453a';
}

function clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Confirmation dialogs for delete actions
function initializeConfirmDialogs() {
    const deleteButtons = document.querySelectorAll('form[action*="delete"]');
    
    deleteButtons.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const itemName = this.dataset.itemName || 'this item';
            if (confirm(`Are you sure you want to delete ${itemName}? This action cannot be undone.`)) {
                this.submit();
            }
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.dataset.tooltip;
    tooltip.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
    }
}

// Auto-hide flash messages
setTimeout(() => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        message.style.transition = 'opacity 0.5s ease-out';
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    });
}, 5000);

// Sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.admin-sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const tableRows = document.querySelectorAll('.data-table tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });
}

// Initialize search if table exists
if (document.querySelector('.data-table')) {
    initializeSearch();
}

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});