function parade_state_script(copypaste){
    var parade_state = copypaste
    var array = parade_state.split("Department")
    array.pop()
    var first_parade = true
    var Total_Strength = 0
    var Stay_out = 0
    var MA = 0
    var MC = 0
    var Leaves = 0
    var OVL = 0
    var Off = 0
    var Course = 0
    var Others = 0
    let ranks = ["REC","PTE","SCT","LCP", "CPL", "CFC", "3SG", "2SG", "1SG", "SSG", "MSG", "3WO", "2WO", "1WO", "MWO", "SWO", "CWO", "2LT", "OCT", "LTA", "CPT","MAJ","LTC","SLTC","COL","BG","CO","B2","RSM","USO","S1", "S2","S3","S4"]
    for (let index = 0; index < array.length; index++) {
        var Department = array[index];
        let MA_index = 0;
        let MC_index = 0;
        let Leave_index = 0;
        let OVL_index = 0;
        let Off_index = 0;
        let course_index = 0;
        let others_index = 0;
        let stayout_index = 0;
        let stayin_index = 0
        Department = Department.split("\n")
        for (let index = 0; index < Department.length; index++) {
            var word = Department[index];
            word = word.trim()
            if (word.toUpperCase().includes("TOTAL STRENGTH")) {
                let number = word.split(" ")
                Total_Strength += parseInt(number[number.length-1]);
            }
            if (word.toUpperCase().includes("LAST PARADE")) {
                first_parade = false
            }
            if (word.toUpperCase().includes("STAY OUT")) {
                stayout_index = index;
            }
            if (word.toUpperCase().includes("STAY IN")) {
                stayin_index = index;
            }
            if (word.toUpperCase().includes("MEDICAL APPOINTMENT")) {
                MA_index = index;
            }
            if (word.toUpperCase().includes("MEDICAL LEAVE")) {
                MC_index = index;
            }
            if (word.toUpperCase().includes("LEAVES")) {
                Leave_index = index;
            }
            if (word.toUpperCase().includes("OVERSEAS LEAVE")) {
                OVL_index = index;
            }
            if (word.toUpperCase().includes("OFF")) {
                Off_index = index;
            }
            if (word.toUpperCase().includes("OTHERS")) {
                others_index = index;
            }
            if (word.toUpperCase().includes("COURSE")) {
                course_index = index;
            }
        }
        if (!first_parade) {
            let stayout_array = Department.slice(stayout_index,stayin_index);
            for (let index = 0; index < stayout_array.length; index++) {
                const element = stayout_array[index];
                ranks.forEach(rank => {
                    if (element.includes(rank)) {
                        Stay_out += 1;
                    }
                });
            }
        }
        let MA_array = Department.slice(MA_index,MC_index);
        for (let index = 0; index < MA_array.length; index++) {
            const element = MA_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    MA += 1;
                }
            });
        }
        let MC_array = Department.slice(MC_index,Leave_index);
        for (let index = 0; index < MC_array.length; index++) {
            const element = MC_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    MC += 1;
                }
            });
        }
        let leave_array = Department.slice(Leave_index,OVL_index);
        for (let index = 0; index < leave_array.length; index++) {
            const element = leave_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    Leaves += 1;
                }
            });
        }
        let ovl_array = Department.slice(OVL_index,Off_index);
        for (let index = 0; index < ovl_array.length; index++) {
            const element = ovl_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    OVL += 1;
                }
            });
        }
        let off_array = Department.slice(Off_index,course_index);
        for (let index = 0; index < off_array.length; index++) {
            const element = off_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    Off += 1;
                }
            });
        }
        let course_array = Department.slice(course_index,others_index);
        for (let index = 0; index < course_array.length; index++) {
            const element = course_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    Course += 1;
                }
            });
        }
        let other_array = Department.slice(others_index, Department.length);
        for (let index = 0; index < other_array.length; index++) {
            const element = other_array[index];
            ranks.forEach(rank => {
                if (element.includes(rank)) {
                    Others += 1;
                }
            });
        }
    }
    let Out_Camp = Course + Off + Leaves + OVL + MC + MA + Others + Stay_out;
    let Current_Strength = Total_Strength - Out_Camp
    let time = "0800"
    const date = new Date();
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let sun = "Morning"
    year = year.toString().slice(2,4)
    if (!first_parade) {
        time = "2100"
        sun = "Evening"
    }
    else {
        day += 1;
    }
    document.getElementById("pState").value = `
HQ COY ${day}/${month}/${year} ${time} HRS
${sun} Strength: ${Current_Strength} / ${Total_Strength}
Course: ${Course}
Off/Wkend: ${Off}
Detention: ${0}
Hospitalisation: ${0} 
Local Leave: ${Leaves}
 Overseas Leave: ${OVL}
MC: ${MC}
Others: ${Others}
MA/Dental: ${MA}
Stay-Out: ${Stay_out}
(Subtotal) Out camp: ${Out_Camp}`
    document.getElementById("submitButton").remove()
}
function copyText() {
  // Get the text field
  var copyText = document.getElementById("pState");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}
