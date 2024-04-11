
/*
--------------------------------------------------
@ Select Relations JS @
Version: 1.0.1

Author: Kamran Gasimov
Created: 09.04.2024
Updated: 11.04.2024
© All rights are reserved Deirvlon Technologies.
--------------------------------------------------
*/

function SelectRelations() {
    document.addEventListener('DOMContentLoaded', function () {

        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
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

        initializeFiltering();

    });

    function initializeFiltering() {
        const selectRelations = document.querySelectorAll('.select-relations');

        selectRelations.forEach(select => {
            updateFiltering(select, false);
        });

        // Reset parent selects' selected options if they are hidden due to filtering
        resetParentSelects();
    }

    function updateFiltering(select, restart = true) {
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
                    option.disabled = displayOption ? false : true;
                    option.hidden = displayOption ? false : true;
                    option.ariaHidden = displayOption ? false : true;
                }
            });


        });


        // Reset parent selects' selected options if they are hidden due to filtering
        if (restart)
            resetParentSelects();
    }

    function resetParentSelects() {
        document.querySelectorAll(`[data-sf-parent]`).forEach(childSelect => {
            if (childSelect.selectedIndex == null || childSelect.selectedIndex == -1)
                return;

            let selectOption = childSelect.options[childSelect.selectedIndex];
            if (selectOption.disabled) {
                $(childSelect).val(null).trigger('change.select2');
            }

        });
    }

}

// autorun
SelectRelations(); //Init
