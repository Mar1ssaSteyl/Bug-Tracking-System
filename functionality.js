//Main event listener to add whatever the user types to the webpage
const button = document.getElementById("addTask")
button.addEventListener("click", doSomething)

//Getting card elements and storing in collection to distinguise which card to place info
const cards = document.getElementsByClassName("card")

//Function to edit info
function changeSection(section) {
                    

                    let description = prompt("Change the description:")
                    let assignment = prompt("Change the assignment:")
                    let priority = prompt("Change the priority")
                
                    section.innerHTML=
                    `<p class="desc">${description}</p> 
                    <p class="assign">${assignment}</p>   
                    <p class="prority" ${priority}>${priority}</p>
                    <button>Edit</button>
                    `;

                const editButton = section.querySelector("button")
                editButton.addEventListener("click", function () {
                    changeSection(section)

                const viewButton=section.querySelector(".viewButton")
                viewButton.addEventListener("click", function () {
                    viewTheTicket(section)
                })
                })}   

//Function to view the full ticket
function viewTheTicket(ticket) {
    alert(
`Discoverer: ${ticket.discoverer}
Project: ${ticket.project}
Description: ${ticket.description}
Assignment: ${ticket.assignment}
Status: ${ticket.status}
Priority: ${ticket.priority}
targetDate: ${ticket.targetDate}
dateSolved: ${ticket.dateSolved}
resolution: ${ticket.resolution}`
)}


//Event that takes place when button is pressed
function doSomething()
{
            //Input from user
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

            //Switch to decide which card to place into. Using DOM and sections to output it on the webpage
            switch (true) {

                case ticket.status == "backlog":
                const newSection = document.createElement('section')
                newSection.classList.add('cardBody')
                newSection.innerHTML = 
                `<p class="desc">${ticket.description}</p> 
                <p class="assign">${ticket.assignment}</p>   
                <p class="priority ${ticket.priority}">${ticket.priority}</p>
                <button>Edit</button>
                <button class="viewButton">View</button>
                    `;
                cards[0].appendChild(newSection);

                const editButton = newSection.querySelector("button")
                editButton.addEventListener("click", function () {
                changeSection(newSection)
                })

                const viewButton=newSection.querySelector(".viewButton")
                viewButton.addEventListener("click", function () {
                    viewTheTicket(ticket)
                })
                break;
            
                //--------------------------------------------------------------------
                //--------------------------------------------------------------------

                case ticket.status == "assigned":
                const newSection1 = document.createElement('section')
                newSection1.classList.add('cardBody')
                newSection1.innerHTML = 
                `<p class="desc">${ticket.description}</p> 
                <p class="assign">${ticket.assignment}</p>   
                <p class="priority ${ticket.priority}">${ticket.priority}</p>
                <button>Edit</button>
                <button class="viewButton">View</button>
                    `;
                cards[1].appendChild(newSection1);

                
                const editButton1 = newSection1.querySelector("button")
                editButton1.addEventListener("click", function () {
                changeSection(newSection1)
                })

                const viewButton1=newSection1.querySelector(".viewButton")
                viewButton1.addEventListener("click", function () {
                    viewTheTicket(ticket)
                })
                break;

                //--------------------------------------------------------------------
                //--------------------------------------------------------------------

                case ticket.status == "underway":
                const newSection2 = document.createElement('section')
                newSection2.classList.add('cardBody')
                newSection2.innerHTML = 
                `<p class="desc">${ticket.description}</p> 
                <p class="assign">${ticket.assignment}</p>   
                <p class="priority ${ticket.priority}">${ticket.priority}</p>
                <button>Edit</button>
                <button class="viewButton">View</button>
                    `;
                cards[2].appendChild(newSection2)

                const editButton2 = newSection2.querySelector("button")
                editButton2.addEventListener("click", function () {
                    changeSection(newSection2) 
                })

                const viewButton2=newSection2.querySelector(".viewButton")
                viewButton2.addEventListener("click", function () {
                    viewTheTicket(ticket)
                })
                break;

                //--------------------------------------------------------------------
                //--------------------------------------------------------------------
                
                case ticket.status == "done":
                const newSection3 = document.createElement('section');
                newSection3.classList.add('cardBody')
                newSection3.innerHTML = 
               `<p class="desc">${ticket.description}</p> 
                <p class="assign">${ticket.assignment}</p>   
                <p class="priority ${ticket.priority}">${ticket.priority}</p>
                <button>Edit</button>
                <button class="viewButton">View</button>
                    `;
                cards[3].appendChild(newSection3);

                const editButton3 = newSection3.querySelector("button")
                editButton3.addEventListener("click", function () {
                changeSection(newSection3)
                })

                const viewButton3=newSection3.querySelector(".viewButton")
                viewButton3.addEventListener("click", function () {
                    viewTheTicket(ticket)
                })
                break;

                //--------------------------------------------------------------------
                //--------------------------------------------------------------------
            
            }

}
