function setTracker(trackerType, data) {
    $('.container-tracker').empty();
    if (trackerType === "Progress") {
        $(".container-tracker").append(`<div class="container-tracker">
            <div class="wrapper-progress-bar">
                <p>0%</p>
                <div class="progress-bar">
                    <div class="progress-bar-internal"></div>
                </div>
                <p>100%</p>
            </div>
            <p class="progress-bar-state">---</p>
            <p class="progress-bar-deadline"></p>
            <div class="progress-bar-input-wrapper">
                <button id="progress-bar-button-minus" class="progress-bar-button">-</button>
                <input class="progress-bar-input" type="text">
                <button id="progress-bar-button-plus" class="progress-bar-button">+</button>
            </div>
            <p class="progress-bar-notification"></p>
        </div>`);
        new ProgressBar(data.id, data.name, data.goal, data.currVal, data.units, data.deadline);
    } else if (trackerType === "Mean") {
        $(".container-tracker").append(`<div class="container-tracker">
            <p class="tracker-target">-</p>
            <div class="wrapper-progress-bar">
                <p class="progress-bar-min">-</p>
                    <div class="progress-bar">
                    <div class="progress-bar-divider"></div>
                    <div class="progress-bar-internal"></div>
                    </div>
                <p class="progress-bar-max">-</p>
            </div>
            <p class="progress-bar-state">---</p>
            <p class="progress-bar-deadline"></p>
            <div class="progress-bar-input-wrapper">
            <button id="progress-bar-button-minus" class="progress-bar-button">-</button>
            <input class="progress-bar-input" type="text">
            <button id="progress-bar-button-plus" class="progress-bar-button">+</button>
            </div>
            <p class="progress-bar-notification"></p>
        </div>`);
        new TargetBar(data.id, data.name, data.goal, data.currVal, data.units, data.deadline, data.positive);
    } else if (trackerType === "ToDo") {
        $(".container-tracker").append(`<div class="container">
        <div class="task__head task--row">(CLICK & HOLD TO REMOVE)</div>
            <form action="">
                <div class="task__list">
                </div>
                <div class="task--row task__footer">
                    <input class="task__add" type="text" value="+ add new task">
                </div>
            </form>
        </div>`);
        new TodoList(data.id, data.name, data.deadline, tasks = []);
    }
}