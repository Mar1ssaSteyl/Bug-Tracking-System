const button = document.getElementById("addTask")
button.addEventListener("click", doSomething)

const cards = document.getElementsByClassName("card")

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
            project:       prompt('Which project is this related to?'),
            description:   prompt('Summary and description of the issue?'),
            assignment:    prompt('Who will solve this issue?'),
            status:        prompt('Issue status [backlog/assigned/underway/done]'),
            priority:      prompt('Priority of the issue [low/medium/high]'),
            targetDate:    prompt('Target resolution date?'),
            dateSolved:    prompt('Actual resolution date? Leave blank if not solved yet.'),
            resolution:    prompt('Resolution summary')
            }

            
            switch (true) {

                case ticket.status == "backlog":
                const newSection = document.createElement('section')
                newSection.classList.add('cardBody')
                newSection.innerHTML = 
                `${ticket.description} <br>
                ${ticket.assignment}   <br>
                ${ticket.priority}     <br>
                <button>Edit</button>
                `;
                cards[0].appendChild(newSection);

                const editButton = newSection.querySelector("button")
                editButton.addEventListener("click", function () {
                    changeSection(newSection)
                })
                function changeSection(section) {
                    let description = prompt("Change the description:")
                    let assignment = prompt("Change the assignment:")
                    let priority = prompt("Change the priority")

                    section.innerHTML=
                    `${description} <br>
                    ${assignment}   <br>
                    ${priority}     <br>
                    <button>Edit</button>
                    `;

                const editButton = newSection.querySelector("button")
                editButton.addEventListener("click", function () {
                    changeSection(section)
                })}   
                break;
            
                case ticket.status == "assigned":
                const newSection1 = document.createElement('section')
                newSection1.classList.add('cardBody')
                newSection1.innerHTML = 
                `${ticket.description} <br>
                ${ticket.assignment}   <br>
                ${ticket.priority}     <br>
                <button>Edit</button>
                `;
                cards[1].appendChild(newSection1);

                
                const editButton1 = newSection1.querySelector("button")
                editButton1.addEventListener("click", function () {
                    changeSection(newSection1)
                })
                function changeSection(section) {
                    let description = prompt("Change the description:")
                    let assignment = prompt("Change the assignment:")
                    let priority = prompt("Change the priority")

                    section.innerHTML=
                    `${description} <br>
                    ${assignment}   <br>
                    ${priority}     <br>
                    <button>Edit</button>
                    `;

                const editButton1 = newSection1.querySelector("button")
                editButton1.addEventListener("click", function () {
                    changeSection(section)
                })}   
                break;

                case ticket.status == "underway":
                const newSection2 = document.createElement('section')
                newSection2.classList.add('cardBody')
                newSection2.innerHTML = 
                `${ticket.description} <br>
                ${ticket.assignment}   <br>
                ${ticket.priority}     <br>
                <button>Edit</button>
                `
                cards[2].appendChild(newSection2)



                const editButton2 = newSection2.querySelector("button")
                editButton2.addEventListener("click", function () {
                    changeSection(newSection2)
                })
                function changeSection(section) {
                    let description = prompt("Change the description:")
                    let assignment = prompt("Change the assignment:")
                    let priority = prompt("Change the priority")

                    section.innerHTML=
                    `${description} <br>
                    ${assignment}   <br>
                    ${priority}     <br>
                    <button>Edit</button>
                    `;

                const editButton2 = newSection2.querySelector("button")
                editButton2.addEventListener("click", function () {
                    changeSection(section)
                })}   
                break;

                case ticket.status == "done":
                const newSection3 = document.createElement('section');
                newSection3.classList.add('cardBody')
                newSection3.innerHTML = 
                `${ticket.description} <br>
                ${ticket.assignment}   <br>
                ${ticket.priority}     <br>
                <button>Edit</button>
                `;
                cards[3].appendChild(newSection3);


                 const editButton3 = newSection3.querySelector("button")
                editButton3.addEventListener("click", function () {
                    changeSection(newSection3)
                })
                function changeSection(section) {
                    let description = prompt("Change the description:")
                    let assignment = prompt("Change the assignment:")
                    let priority = prompt("Change the priority")

                    section.innerHTML=
                    `${description} <br>
                    ${assignment}   <br>
                    ${priority}     <br>
                    <button>Edit</button>
                    `;

                const editButton3 = newSection3.querySelector("button")
                editButton3.addEventListener("click", function () {
                    changeSection(section)
                })}   
                break;
            }


            break;

        case "2":
            
            break;
    }

}
