const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach( draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })

    draggable.addEventListener('touchstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('touchend', () => {
        draggable.classList.remove('dragging');
    })

    draggable.addEventListener('touchcancel', () => {
        draggable.classList.remove('dragging');
    })
})

containers.forEach( container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container,e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement) {
            container.insertBefore(draggable,afterElement);
        } else {
            container.appendChild(draggable);
        }
    })

    container.addEventListener('touchmove', e => {
        [...e.changedTouches].forEach(touch => {
            const afterElement = getDragAfterElement(container,touch.clientY);
            console.log(afterElement);
            const draggable = document.querySelector('.dragging');
            console.log(touch);
            if (afterElement) {
                const containerNew = afterElement.parentElement;
                containerNew.insertBefore(draggable,afterElement);
            } else {
                container.appendChild(draggable);
            }
        })
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height/2;
        if (offset < 0 && offset > closest.offset) {
            return {offset:offset, element:child};
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

}