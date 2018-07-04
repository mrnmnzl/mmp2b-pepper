function setTracker(trackerType, data, tasks) {
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
                <button id="progress-bar-button-minus" class="progress-bar-button">
                    <i class="now-ui-icons ui-1_simple-delete"></i>
                </button>
                <input class="progress-bar-input" type="text">
                <button id="progress-bar-button-plus" class="progress-bar-button">
                    <i class="now-ui-icons ui-1_simple-add"></i>
                </button>
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
                <button id="progress-bar-button-minus" class="progress-bar-button">
                    <i class="now-ui-icons ui-1_simple-delete"></i>
                </button>
                <input class="progress-bar-input" type="text">
                <button id="progress-bar-button-plus" class="progress-bar-button">
                    <i class="now-ui-icons ui-1_simple-add"></i>
                </button>
            </div>
            <p class="progress-bar-notification"></p>
        </div>`);
        new TargetBar(data.id, data.name, data.goal, data.currVal, data.units, data.deadline, data.positive);
    } else if (trackerType === "ToDo") {
        $(".container-tracker").append(`<div class="container-task">
        <div class="task-head task-row">Task list</div>
            <form action="" id="task-form">
                <div class="task-list">
                </div>
                <div class="task-row task-footer">
                    <input class="task-add" type="text" value="+ add new task">
                </div>
            </form>
        </div>`);
        new TodoList(data.id, data.name, data.deadline, tasks);
    }
}