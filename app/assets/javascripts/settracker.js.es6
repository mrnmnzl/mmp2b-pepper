function setTracker(data) {
    //Add logic to add different trackers

    $('.container-tracker').empty();
    $(".container-tracker").append(`<p class="tracker-title">---</p>
    <div class="wrapper-progress-bar">
        <p>0%</p>
        <div class="progress-bar">
            <div class="progress-bar-internal"></div>
        </div>
        <p>100%</p>
    </div>
    <p class="progress-bar-state">---</p>
    <p class="progress-bar-deadline">---</p>
    <div class="progress-bar-input-wrapper">
        <button id="progress-bar-button-minus" class="progress-bar-button">-</button>
        <input class="progress-bar-input" type="text">
        <button id="progress-bar-button-plus" class="progress-bar-button">+</button>
    </div>
    <p class="progress-bar-notification"></p>`);

    new ProgressBar(data.name, data.goal, data.currVal, data.units, data.deadline);
}