class ProgressBar {
    constructor(id, title, goal, currentState, units, deadline, done) {
        this.id = id;
        this.goal = goal;
        this.currentState = currentState;
        this.units = units;
        this.deadline = deadline;
        this.title = title;
        this.done = done;

        this.calculatePercentage();
        $("#progress-bar-button-minus").on('click', () => this.removeProgress());
        $("#progress-bar-button-plus").on('click', () => this.addProgress());
    }

    changeState(value) {
        $(".progress-bar-notification").text("");

        if (this.currentState + value === this.goal) {
            $(".progress-bar-notification").append("<span style=\"color: green;\">Concrats! You reached your goal!</span>");
            this.currentState += value;
            $.ajax({
                type: "PATCH", 
                url: "/peppers/" + this.id + ".json",
                data: { "pepper[done]": true }, 
                success: (status) => {
                    console.log(status);
                }
            });
        } else {
            $.ajax({
                type: "PATCH", 
                url: "/peppers/" + this.id + ".json",
                data: { "pepper[done]": false }, 
                success: (status) => {
                    console.log(status);
                }
            });
            this.currentState += value;
        }
        this.calculatePercentage();
    }

    calculatePercentage() {
        this.currentPercentage = this.currentState / this.goal;
        this.setTrackerView();
    }

    setTrackerView() {
        var maxWidth = $(".progress-bar").width() - 10;
        var progressBar = $(".progress-bar-internal");
        $(".progress-bar-state").text(this.currentState + " " + this.units + " (" + parseInt(this.currentPercentage * 100) + "%)");

        if (this.deadline !== null) {
            var oneDay = 24 * 60 * 60 * 1000;
            var goalDate = new Date(this.deadline);
            var goalDateString = goalDate.getDate() + "." + (goalDate.getMonth() + 1) + "." + goalDate.getFullYear();
            var today = Date.now();
            var daysLeft = Math.round(Math.abs((goalDate.getTime() - today) / (oneDay)));
            var realDaysLeft = (goalDate.getTime() - today) / (oneDay);
            
            if(realDaysLeft < 0) {
                $(".progress-bar-deadline").text("Deadline ist abgelaufen!");    
            } else {
                $(".progress-bar-deadline").text("Deadline: " + goalDateString + " (" + daysLeft + " days left)");
            }
        }
        
        progressBar.width(this.currentPercentage * maxWidth);
    }

    addProgress() {
        var value = $(".progress-bar-input").val();
        if (this.tryParseInt(value) === true) {
            value = parseInt(value);
            if(this.currentState + value <= this.goal) {
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
        $(".progress-bar-input").val("");
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
        $(".progress-bar-input").val("");
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