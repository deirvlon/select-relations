
/*
--------------------------------------------------
@ Select Relations JS @
Version: 1.0.0

Author: Kamran Gasimov
Created: 09.04.2024
Updated: 09.04.2024
© All rights are reserved Deirvlon Technologies.
--------------------------------------------------
*/

// Define a function to create the filtering select elements
function SelectRelations() {
    document.addEventListener('DOMContentLoaded', function () {
        initializeFiltering();

        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            select.addEventListener('change', function () {
                updateFiltering(this);
            });
        });
    });

    function initializeFiltering() {
        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            updateFiltering(select);
        });
    }

    function updateFiltering(select) {
        const selectedOption = select.options[select.selectedIndex];
        const parentId = select.getAttribute('id');
        const parentValues = parentId.split(',').map(parentId => document.getElementById(parentId).value).join(',');

        document.querySelectorAll(`[data-sf-parent*="${parentId}"]`).forEach(childSelect => {
            childSelect.querySelectorAll('option').forEach(option => {
                const relationData = option.getAttribute('data-pr');
                if (relationData) {
                    const displayOption = relationData.split(',').some(pair => {
                        const [selectId, selectValues] = pair.split(':');
                        return document.getElementById(selectId).value === selectValues;
                    });
                    option.style.display = displayOption ? '' : 'none';
                }
            });
        });

        // Reset parent selects' selected options if they are hidden due to filtering
        resetParentSelects();
    }

    function resetParentSelects() {
        document.querySelectorAll(`[data-sf-parent]`).forEach(childSelect => {
            let selectOption = childSelect.options[childSelect.selectedIndex];
            if (selectOption.style.display === 'none') {
                childSelect.selectedIndex = -1; // Reset to default
            }
        });
    }


}

// Export the SelectFiltering function for reuse
// module.exports = SelectFiltering;// Define a function to create the filtering select elements
function SelectRelations() {
    document.addEventListener('DOMContentLoaded', function () {
        initializeFiltering();

        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            select.addEventListener('change', function () {
                updateFiltering(this);
            });
        });
    });

    function initializeFiltering() {
        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            updateFiltering(select);
        });
    }

    function updateFiltering(select) {
        const selectedOption = select.options[select.selectedIndex];
        const parentId = select.getAttribute('id');
        const parentValues = parentId.split(',').map(parentId => document.getElementById(parentId).value).join(',');

        document.querySelectorAll(`[data-sf-parent*="${parentId}"]`).forEach(childSelect => {
            childSelect.querySelectorAll('option').forEach(option => {
                const relationData = option.getAttribute('data-pr');
                if (relationData) {
                    const displayOption = relationData.split(',').some(pair => {
                        const [selectId, selectValues] = pair.split(':');
                        return document.getElementById(selectId).value === selectValues;
                    });
                    option.style.display = displayOption ? '' : 'none';
                }
            });
        });

        // Reset parent selects' selected options if they are hidden due to filtering
        resetParentSelects();
    }

    function resetParentSelects() {
        document.querySelectorAll(`[data-sf-parent]`).forEach(childSelect => {
            let selectOption = childSelect.options[childSelect.selectedIndex];
            if (selectOption.style.display === 'none') {
                childSelect.selectedIndex = -1; // Reset to default
            }
        });
    }


}

