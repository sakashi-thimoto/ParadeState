function parade_state_script(copypaste) {
    var parade_state = copypaste.trim();

    // Extracting overall information (Total Strength, In Camp, Out Camp, etc.)
    const summaryPattern = /\*Total Strength\*:\s*(\d+).*?\*In Camp:\*\s*(\d+).*?\*Out Camp:\*\s*(\d+)/s;
    const summaryMatch = parade_state.match(summaryPattern);
    if (!summaryMatch) {
        alert("Summary information could not be found. Please check the input format.");
        return;
    }
    let Total_Strength = parseInt(summaryMatch[1]);
    let In_Camp = parseInt(summaryMatch[2]);
    let Out_Camp = parseInt(summaryMatch[3]);

    // Initialize counters for different categories
    var Stay_out = 0, MA = 0, MC = 0, Leaves = 0, OVL = 0, Off = 0, Course = 0, Others = 0, HL = 0;

    // Define rank types
    let ranks = ["REC", "PTE", "SCT", "LCP", "CPL", "CFC", "3SG", "2SG", "1SG", "SSG", "MSG", "3WO", "2WO", "1WO", "MWO", "SWO", "CWO", "2LT", "OCT", "LTA", "CPT", "MAJ", "LTC", "SLTC", "COL", "BG", "CO", "B2", "RSM", "USO"];

    // Split the input into individual departments based on "*Department*" pattern
    var departments = parade_state.split(/\*\w+ Department\*/);

    departments.forEach(department => {
        let lines = department.split("\n").map(line => line.trim());

        // Extracting specific sections from the department
        let currentLeave = false;
        let currentOff = false;
        let currentHL = false;
        let currentMA = false;
        let currentCourse = false;
        let currentOthers = false;

        lines.forEach(line => {
            // Update the state based on header keywords
            if (line.startsWith("Leave:")) {
                currentLeave = true;
                currentOff = currentHL = currentMA = currentCourse = currentOthers = false;
            } else if (line.startsWith("Off:")) {
                currentOff = true;
                currentLeave = currentHL = currentMA = currentCourse = currentOthers = false;
            } else if (line.startsWith("HOSPITALISATION LEAVE:")) {
                currentHL = true;
                currentLeave = currentOff = currentMA = currentCourse = currentOthers = false;
            } else if (line.startsWith("Medical Appointment:") || line.startsWith("MA:")) {
                currentMA = true;
                currentLeave = currentOff = currentHL = currentCourse = currentOthers = false;
            } else if (line.startsWith("Course:") || line.startsWith("COURSE:")) {
                currentCourse = true;
                currentLeave = currentOff = currentHL = currentMA = currentOthers = false;
            } else if (line.startsWith("Others:")) {
                currentOthers = true;
                currentLeave = currentOff = currentHL = currentMA = currentCourse = false;
            }

            // Count personnel for each category
            if (currentLeave) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        Leaves += 1;
                    }
                });
            } else if (currentOff) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        Off += 1;
                    }
                });
            } else if (currentHL) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        HL += 1;
                    }
                });
            } else if (currentMA) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        MA += 1;
                    }
                });
            } else if (currentCourse) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        Course += 1;
                    }
                });
            } else if (currentOthers) {
                ranks.forEach(rank => {
                    if (line.includes(rank)) {
                        Others += 1;
                    }
                });
            }
        });
    });

    // Calculate current strength and other values
    let Current_Strength = Total_Strength - Out_Camp;
    let time = "0845";
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString().slice(2, 4);
    let sun = "Morning";

    // Update time for first or second parade
    if (summaryMatch[0].includes("0845HRS")) {
        time = "0845";
        sun = "Morning";
    } else {
        time = "2100";
        sun = "Evening";
    }

    // Generate the output text
    document.getElementById("pState").value = `
HQ COY ${day}/${month}/${year} ${time} HRS
${sun} Strength: ${Current_Strength} / ${Total_Strength}
Course: ${Course}
Off/Wkend: ${Off}
Detention: ${0}
Hospitalisation: ${HL} 
Local Leave: ${Leaves}
Overseas Leave: ${OVL}
MC: ${MC}
Others: ${Others}
MA/Dental: ${MA}
Stay-Out: ${Out_Camp}
(Subtotal) Out camp: ${Out_Camp}`.trim();
}

function copyText() {
    // Get the textarea element
    var copyText = document.getElementById("pState");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value).then(() => {
        alert("Copied the text!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}
