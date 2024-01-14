const parade_state = `S1 Department

Total Strength: 15
Present Strength: 14

First Parade
15/01/24

Report Sick
Nil

Status

PTE BARATHAN 
PERM EX (UPPER LIMB)
EX PUSH UPS (RENEWING)
EX RMJ (RENEWING)

PTE CHIN HAO
EX HEAVY LOAD, RANGE, RMJ (271123 - 140223)

PTE DARIUS SOH WEIEN
EX VOC (191223-070324)

PTE YAP JIAN WEN JAREN
PERM EX (FLEGS)
PERM EX (STAY IN)

PTE JOSHUA WONG SHOU HUI 
PERM EX FLEGS
PERM EX SHARPS
EX STAY IN (281123-150224)

Medical Appointment
Nil

Medical Leaves
Nil

Leaves
Nil

Overseas Leave
Nil

Weekend/Off
Nil

Course
CPT WESLEY

Others
NIL

————

S2 Department

Total Strength: 07
Present Strength: 07

First Parade
15/01/24

Report Sick
Nil

Status
PTE DYLAN LD (050124-180224)

Medical Appointment
Nil

Medical Leaves
Nil

Leaves
Nil

Overseas Leave
Nil

Off
Nil

Course
Nil

Others
Nil
____________

Sigmed Department

First Parade
14/01/24

Total Strength: 13
Present Strength: 10

Report Sick
NIL

Status
LCP VANIEL
EX STAY IN 

LCP ERIC TOH ZHI YING
EX RMJ AND BOOTS (141223 - 110224)

CPL AVIER TAN KAI WEN
EX STAY IN (281123 - 150224)

Medical Appointment
NIL

Medical Leaves
LCP ERIC (080124 - 070324)

Leaves
CPL AVIER

Overseas Leave
NIL

Weekend/Off
2SG CHONG JUN (AM)

Course
NIL

Others
NIL
———————

S3 Department

Total Strength: 8
Present Strength: 7

First Parade
15/01/24

Report sick
NIL

Status
LCP CHRISTIAN 
PERM EX STAY IN, EX RMJ, HEAVY LOADS

PTE KIM KEAT
PERM EX FLEGS 

PTE IAN 
EX STAY IN, FLEGS (041223-210424)

Medical Appointment
NIL

Medical Leaves
NIL

Leaves
NIL

Overseas Leave
NIL

Weekend/Off
3SG MATT (AM OFF)

Course
NIL

Others
NIL
___________

S4 Department

First Parade
15/01/24

Total Strength: 13
Present Strength: 11

Report Sick
Nil

Status
PTE YANNIAN TAN
EX(PROLONGED STANDING, RMJ, HEAVY LOAD, STAY IN, FIREARMS, LIVE FIRING, EXPLOSIVES, GRENADES, SHARPS, IPPT, HL, LIGHT DUTY) - in the procrss of renewing 

PTE DERRICK LAU
PERM EX(STAY IN, FIREAMS, LIVE FIRING, EXPLOSIVES, GRENADES, SHARPS, RMJ, PHYSICAL ACTIVITIES)

PTE DING HENG
PERM EX FLEGS 
PERM EX STAY IN

PTE RALPH
Perm EX FLEGS (until 260125)
EX STAY IN (181223 - 100324)
EX DUTY (020124-080324)

PTE CHENG XIAO
PERM EX FLEGS (until 010225)
PERM EX STAY IN (until 010224)

PTE NIXON
PERM EX FLEGS
PERM EX STAY IN
EX DUTY (until 030124)

Medical Appointment
PTE RALPH (AM)

Medical Leave
Nil

Leaves
LCP YANNIAN

Overseas Leave
Nil

Off
Nil

Course
CPT

Others
Nil
____________

QM Department

Total Strength: 18
Present Strength: 16

First Parade
15/01/2024

Report Sick
NIL

Status
CPL IZZAT 
PERM EX RMJ

LCP JERIEL
EX STAY IN (EXP 010124), EX FLEGS

REC CEDRIC 
LD (EXP 260224), EX FIREARMS, EX UPPER LIMB (PROCESS OF RENEWING)

REC SAIFUL
EX Stay In (Perm), EX No.4 Uniform (Perm), EX Prolonged Heat/Sweat/Dust Exposure (Perm)

PTE SIBI 
EX STAYIN (PERM)
EX FLEG (PERM)

Medical Appointment
NIL

Medical Leaves
NIL

Leaves
NIL

Overseas Leave
NIL

Weekend/Off
CPL ILHAM
CPL RAZI

Course
CPT

Other
NIL
`
var array = parade_state.split("Department")
array.pop()
var Course = 0
for (let index = 0; index < array.length; index++) {
    var Department = array[index];
    let course_index = 0;
    let others_index = 0;
    Department = Department.split("\n")
    for (let index = 0; index < Department.length; index++) {
        const word = Department[index];
        if (word.toUpperCase() == "COURSE") {
            course_index = index
        }
        if (word.toUpperCase() == "OTHERS") {
            others_index = index
        }
    }
    let course_array = Department.slice(course_index,others_index);
    for (let index = 0; index < course_array.length; index++) {
        const element = course_array[index];
        if (element.includes("CPT")) {
            Course += 1;
        }
    }
}
console.log(Course);