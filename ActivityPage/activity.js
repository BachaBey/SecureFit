const today = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let day = today.getDate();
    let monthIndex = today.getMonth(); 
    let year = today.getFullYear();

    const monthDate = document.getElementById("monthDate");
    monthDate.innerHTML = monthNames[monthIndex] + " " + year;

    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    const dateButtons = document.querySelectorAll(".date");

    let todayday = day;
    let daySelected="0"+todayday+"-"+(monthIndex+1)+"-"+year;
    for (let i = dateButtons.length - 1; i >= 0; i--) {
        dateButtons[i].innerHTML = todayday;
        if (todayday<10){
            dateButtons[i].id="0"+todayday+"-"+(monthIndex+1)+"-"+year;
        }else[
            dateButtons[i].id=todayday+"-"+(monthIndex+1)+"-"+year
        ]
        
        todayday--; 

        if (todayday < 1) {
            monthIndex--;

            if (monthIndex < 0) {
                monthIndex = 11;
                year--;
            }

            todayday = getDaysInMonth(monthIndex, year);
        }
    }
    
    dateButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove "selected" class from the currently selected button
            document.querySelector(".date.selected")?.classList.remove("selected");

            // Add "selected" class to the clicked button
            this.classList.add("selected");
            daySelected=this.id;
            
        }); 
    });