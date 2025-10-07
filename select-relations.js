/*
--------------------------------------------------
@ Select Relations JS @
Version: 2.0.0

Author: Kamran Gasimov
Created: 09.04.2024
Updated: 08.10.2025
© All rights are reserved Deirvlon Technologies.

NEW FEATURES:
- OR logic support using | symbol
- Parenthesis grouping for complex conditions
- Backward compatible with existing & (AND) logic

SYNTAX EXAMPLES:
- AND: "select1:1,2&select2:3"
- OR: "select1:1,2|select2:3"
- Grouping: "(select1:1&select2:2)|(select3:3&select4:4)"
- Mixed: "select1:1&(select2:2|select3:3)"
--------------------------------------------------
*/

function SelectRelations() {
    // Expose a global function to manually update relations
    window.updateSelectRelations = function () {
        initializeFiltering();
    };

    document.addEventListener('DOMContentLoaded', function () {
        initializeFiltering();
    });

    function initializeFiltering() {
        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            // COLD START
            updateFiltering(select, false);

            // Check if Select2 is initialized
            const isSelect2Initialized = $(select).hasClass('select2') !== undefined;

            // Add event listener for change event
            select.addEventListener('change', function () {
                updateFiltering(this);
            });

            // If Select2 is initialized, also listen to its change event
            if (isSelect2Initialized) {
                $(select).on('change.select2', function () {
                    updateFiltering(this);
                });
            }
        });
        
        // Reset parent selects' selected options if they are hidden due to filtering
        resetParentSelects();
    }

    function updateFiltering(select, restart = true) {
        const parentId = select.getAttribute('id');
        document.querySelectorAll(`[data-sf-parent*="${parentId}"]`).forEach(childSelect => {

            if (childSelect.tagName == "SELECT") {
                // SELECT INPUT
                childSelect.querySelectorAll('option').forEach(option => {
                    const relationData = option.getAttribute('data-pr');
                    if (relationData) {
                        const displayOption = evaluateRelation(relationData);
                        option.disabled = !displayOption;
                        option.hidden = !displayOption;
                        option.ariaHidden = !displayOption;
                    }
                });
            } else {
                // NORMAL INPUTS
                const relationData = childSelect.getAttribute('data-pr');
                if (relationData) {
                    const displayOption = evaluateRelation(relationData);
                    childSelect.style.display = displayOption ? '' : 'none';
                }
            }
        });

        // Reset parent selects' selected options if they are hidden due to filtering
        if (restart)
            resetParentSelects();
    }

    /**
     * Evaluates a relation string with support for AND (&), OR (|), and parenthesis grouping
     * @param {string} relationData - The relation expression to evaluate
     * @returns {boolean} - Whether the condition is met
     */
    function evaluateRelation(relationData) {
        // Remove extra whitespace
        relationData = relationData.trim();
        
        // Handle parenthesis grouping
        while (relationData.includes('(')) {
            relationData = relationData.replace(/\(([^()]+)\)/g, (match, group) => {
                return evaluateSimpleExpression(group) ? '1' : '0';
            });
        }
        
        // After resolving all parentheses, evaluate the final expression
        return evaluateSimpleExpression(relationData);
    }

    /**
     * Evaluates a simple expression without parentheses
     * Handles OR (|) and AND (&) operators with proper precedence (AND before OR)
     * @param {string} expression - Expression without parentheses
     * @returns {boolean} - Result of evaluation
     */
    function evaluateSimpleExpression(expression) {
        // Handle boolean results from parenthesis evaluation
        if (expression === '1') return true;
        if (expression === '0') return false;
        
        // Split by OR operator (lower precedence)
        const orParts = expression.split('|');
        
        // If any OR part is true, return true
        return orParts.some(orPart => {
            // Split by AND operator (higher precedence)
            const andParts = orPart.split('&');
            
            // All AND parts must be true
            return andParts.every(andPart => {
                andPart = andPart.trim();
                
                // Handle already evaluated boolean values
                if (andPart === '1') return true;
                if (andPart === '0') return false;
                
                // Evaluate the condition
                return evaluateCondition(andPart);
            });
        });
    }

    /**
     * Evaluates a single condition (selectId:values)
     * @param {string} condition - Single condition string
     * @returns {boolean} - Whether condition is met
     */
    function evaluateCondition(condition) {
        const [selectId, selectValues] = condition.split(':');
        
        if (!selectId || !selectValues) return false;
        
        const el_parent = document.getElementById(selectId.trim());
        if (!el_parent) return false;
        
        const ids = selectValues.split(',').map(v => v.trim());
        
        if (el_parent.type === "checkbox") {
            return ids.includes(el_parent.checked ? '1' : '0');
        } else {
            const selectedOption = el_parent.options ? el_parent.options[el_parent.selectedIndex] : null;
            return ids.includes(el_parent.value) || 
                   (selectedOption && selectedOption.dataset.alt && ids.includes(selectedOption.dataset.alt));
        }
    }

    function resetParentSelects() {
        document.querySelectorAll(`[data-sf-parent]`).forEach(childSelect => {
            if (childSelect.tagName == "SELECT") {
                // SELECT INPUT
                if (childSelect.selectedIndex == null || childSelect.selectedIndex == -1)
                    return;

                let selectOption = childSelect.options[childSelect.selectedIndex];
                if (selectOption.disabled) {
                    $(childSelect).val(null).trigger('change.select2');
                }
            }
        });
    }
}

// autorun
SelectRelations(); //Init
