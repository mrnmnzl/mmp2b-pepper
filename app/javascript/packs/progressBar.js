export class ProgressBar {
    constructor(title, goal, currentState, units, deadline) {
        this.goal = goal;
        this.currentState = currentState;
        this.units = units;
        this.deadline = deadline;
        this.title = title;

        this.calculatePercentage();
        $("#progress-bar-button-minus").on('click', () => this.removeProgress());
        $("#progress-bar-button-plus").on('click', () => this.addProgress());
    }

    changeState(value) {
        $(".progress-bar-notification").text("");

        if (this.currentState + value > this.goal) {
            $(".progress-bar-notification").text("You can only add " + (this.goal - this.currentState) + " more " + this.units);
        } else if (this.currentState + value < 0) {
            $(".progress-bar-notification").text("You can only remove " + this.currentState + " " + this.units);
        } else if (this.currentState + value === this.goal) {
            $(".progress-bar-notification").append("<span style=\"color: green;\">Concrats! You reached your goal!</span>");
            this.currentState += value;
        } else {
            this.currentState += value;
        }
        this.calculatePercentage();
    }

    calculatePercentage() {
        this.currentPercentage = this.currentState / this.goal;
        this.setTrackerView();
    }

    setTrackerView() {
        $(".tracker-title").text(this.title);
        var maxWidth = $(".progress-bar").width() - 10;
        var progressBar = $(".progress-bar-internal");
        $(".progress-bar-state").text(this.currentState + " " + this.units);

        var oneDay = 24 * 60 * 60 * 1000;
        var goalDate = new Date(this.deadline);
        var goalDateString = goalDate.getDate() + "." + (goalDate.getMonth() + 1) + "." + goalDate.getFullYear();
        var today = Date.now();

        var daysLeft = Math.round(Math.abs((goalDate.getTime() - today) / (oneDay)));
        $(".progress-bar-deadline").text("Deadline: " + goalDateString + " (" + daysLeft + " days left)");
        if (this.currentPercentage > 0.05) progressBar.width(this.currentPercentage * maxWidth);
        else progressBar.width(0.05 * maxWidth)
    }

    addProgress() {
        var value = $(".progress-bar-input").val();
        if (this.tryParseInt(value) === true) {
            this.changeState(parseInt(value));
        } else {
            $(".progress-bar-notification").text("Only numbers can be entered!");
        }
    }

    removeProgress() {
        var value = $(".progress-bar-input").val();
        if (this.tryParseInt(value) === true) {
            this.changeState(parseInt(value) * (-1));
        } else {
            $(".progress-bar-notification").text("Only numbers can be entered!");
        }
    }

    tryParseInt(input) {
        if (input !== null) {
            if (input.length > 0) {
                if (!isNaN(input)) {
                    return true;
                }
            }
        }
        return false;
    }
}
