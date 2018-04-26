class TargetBar {
    constructor(id, title, goal, currentState, units, deadline, mode) {
        this.id = id;
        this.goal = goal;
        this.currentState = currentState;
        this.units = units;
        this.deadline = deadline;
        this.title = title;
        //positive for everything over target is good
        //negative for the opposite
        this.mode = mode;

        this.calculatePercentage();
        $("#progress-bar-button-minus").on('click', () => this.removeProgress());
        $("#progress-bar-button-plus").on('click', () => this.addProgress());
    }

    changeState(value) {
        $(".progress-bar-notification").empty();

        if (this.currentState + value > this.goal * 2) {
            $(".progress-bar-notification").text("You can only add " + (this.goal * 2 - this.currentState) + " more " + this.units);
        } else if (this.currentState + value < 0) {
            $(".progress-bar-notification").text("You can only remove " + this.currentState + " " + this.units);
        } else if (this.currentState + value === this.goal) {
            $(".progress-bar-notification").append("<span style=\"color: green;\">Concrats! You reached your target!</span>");
            this.currentState += value;
        } else if (this.currentState > this.goal && this.mode === false) {
            $(".progress-bar-notification").append("You missed your goal. Try again next time.");
            this.currentState += value;
        } else {
            this.currentState += value;
        }
        this.calculatePercentage();
    }

    calculatePercentage() {
        this.currentPercentage = this.currentState / this.goal / 2;
        this.setTrackerView();
    }

    setTrackerView() {
        //Display title, target, current state
        $(".tracker-title").text(this.title);
        if(this.mode === false) $(".tracker-target").text("Your target are " + this.goal + " " + this.units + " or less.");
        else $(".tracker-target").text("Your target are " + this.goal + " " + this.units + " or more.");
        $(".progress-bar-state").text(this.currentState + " " + this.units);

        var maxWidth = $(".progress-bar").width() - 10;
        var progressBar = $(".progress-bar-internal");

        //Display deadline
        if (this.deadline !== null) {
            var oneDay = 24 * 60 * 60 * 1000;
            var goalDate = new Date(this.deadline);
            var goalDateString = goalDate.getDate() + "." + (goalDate.getMonth() + 1) + "." + goalDate.getFullYear();
            var today = Date.now();
            var daysLeft = Math.round(Math.abs((goalDate.getTime() - today) / (oneDay)));

            $(".progress-bar-deadline").text("Deadline: " + goalDateString + " (" + daysLeft + " days left)");
        }

        //Calculate progress width
        progressBar.width(this.currentPercentage * maxWidth);

        $(".progress-bar-min").text("0");
        $(".progress-bar-max").text(this.goal * 2);

        if (this.mode === false) {
            if (this.currentPercentage <= 0.5) $(".progress-bar-internal").css("background", "green");
            else $(".progress-bar-internal").css("background", "red");
        } else {
            if (this.currentPercentage <= 0.5) $(".progress-bar-internal").css("background", "red");
            else $(".progress-bar-internal").css("background", "green");
        }
    }

    addProgress() {
        var value = $(".progress-bar-input").val();
        if (this.tryParseInt(value) === true) {
            value = parseInt(value);
            if(this.currentState + value <= this.goal*2) {
                $.ajax({
                    type: "PATCH", 
                    url: "/peppers/" + this.id + ".json",
                    data: { "pepper[currVal]": (this.currentState + value) }, 
                    success: (status) => {
                        console.log(status);
                    }
                });
                this.changeState(value);
            } else {
                $(".progress-bar-notification").text("Only " + (this.goal - this.currentState) + " " + this.units + " can be added.");
            }
        } else {
            $(".progress-bar-notification").text("Only numbers can be entered!");
        }
    }

    removeProgress() {
        var value = $(".progress-bar-input").val();
        if (this.tryParseInt(value) === true) {
            value = parseInt(value);
            if(this.currentState - value >= 0) {
                $.ajax({
                    type: "PATCH", 
                    url: "/peppers/" + this.id + ".json",
                    data: { "pepper[currVal]": (this.currentState - value) }, 
                    success: (status) => {
                        console.log(status);
                    }
                });
                this.changeState(value * -1);
            } else {
                $(".progress-bar-notification").text("Only " + (this.currentState) + " " + this.units + " can be removed.");
            }
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