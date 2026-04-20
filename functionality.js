const button = document.getElementById("addTask")

button.addEventListener("click", doSomething)

function doSomething()
{
let  menu= prompt(
`1. Create issue
2. Edit issue`)



    switch (menu) {
        case "1":
            let ticket= 
            {
            discoverer:    prompt('Who identified the issue?'),
            project:       prompt('Which project is this related to ?'),
            description:   prompt('Summary and description of the issue?'),
            assignment:    prompt('Who will solve this issue? Leave blank if still deciding.'),
            status:        prompt('Issue status [open/ resolved/ overdue]'),
            priority:      prompt('Priority of the issue [ low/ medium/ high]'),
            targetDate:    prompt('Target resolution date?'),
            dateSolved:    prompt('Actual resolution date? Leave blank if not solved yet.'),
            resolution:    prompt('Resolution summary')

            }
            
            console.log(ticket)
            break;

        case "2":
            break;
    }
}
