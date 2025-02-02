
/*
--------------------------------------------------
@ Select Relations JS @
Version: 1.2.1

Author: Kamran Gasimov
Created: 09.04.2024
Updated: 02.02.2025
© All rights are reserved Deirvlon Technologies.
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
        const selectedOption = select.options[select.selectedIndex];
        const parentId = select.getAttribute('id');
        const parentValues = parentId.split(',').map(parentId => document.getElementById(parentId).value).join(',');

        document.querySelectorAll(`[data-sf-parent*="${parentId}"]`).forEach(childSelect => {

            if (childSelect.tagName == "SELECT")
                // SELECT INPUT
                childSelect.querySelectorAll('option').forEach(option => {
                    const relationData = option.getAttribute('data-pr');
                    if (relationData) {
                        const displayOption = relationData.split('&').some(pair => {
                            const [selectId, selectValues] = pair.split(':');

                            var el_parent = document.getElementById(selectId);
                            var ids = selectValues.split(',');
                            return ids.includes(el_parent.value) || (el_parent.options[el_parent.selectedIndex] != undefined && ids.includes(el_parent.options[el_parent.selectedIndex].dataset.alt));
                        });
                        option.disabled = displayOption ? false : true;
                        option.hidden = displayOption ? false : true;
                        option.ariaHidden = displayOption ? false : true;
                    }
                });
            else {
                //NORMAL INPUTS
                const relationData = childSelect.getAttribute('data-pr');
                if (relationData) {
                    const displayOption = relationData.split('&').some(pair => {
                        const [selectId, selectValues] = pair.split(':');

                        var el_parent = document.getElementById(selectId);
                        var ids = selectValues.split(',');
                        return ids.includes(el_parent.value) || (el_parent.options[el_parent.selectedIndex] != undefined && ids.includes(el_parent.options[el_parent.selectedIndex].dataset.alt));
                    });
                    childSelect.style.display = (displayOption) ? '' : 'none';
                }
            }
        });


        // Reset parent selects' selected options if they are hidden due to filtering
        if (restart)
            resetParentSelects();
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
