var question1Info = {
    attributeId = "ORC-CL1-01",
    title = "Internal Organization Workshops", 
    scores = [
        {
            value = 1,
            description = "Score of 1 indicates you have not run any workshops"
        },
        {
            value = 2,
            description = "Score of 2 indicates you ran one workshop and ran the consultant out"
        },
        {
            value = 3,
            description = "Score of 3 indicates you value the internal organization workshop"
        },
        {
            value = 4,
            description = "Score of 4 indicates you run regular workshops"
        },
        {
            value = 5,
            description = "Score of 5 indicates you are the best organization"
        }
    ],
    comparisonScore = 1,
    type = "dropdown"
    
}

var question2Info = {
    attributeId = "ORC-CL1-02",
    title = "3rd Party Vendor Educational Workshops/Meetings", 
    scores = [
        {
            value = 1,
            description = "Score of 1 indicates you have not run any 3rd party workshops"
        },
        {
            value = 2,
            description = "Score of 2 indicates you ran one workshop and ran the 3rd party out"
        },
        {
            value = 3,
            description = "Score of 3 indicates you value the 3rd party workshops"
        },
        {
            value = 4,
            description = "Score of 4 indicates you interact regularly with 3rd parties"
        },
        {
            value = 5,
            description = "Score of 5 indicates you and third parties are partners"
        }
    ],
    comparisonScore = 1,
    type = "dropdown"
    
}

var question3Info = {
    attributeId = "ORC-CL1-03",
    title = "Recognition for the need for Cloud Adoption: <strong>IT Management</strong>", 
    scores = [
        {
            value = 1,
            description = "Score of 1 indicates you have not run any 3rd party workshops"
        },
        {
            value = 2,
            description = "Score of 2 indicates you ran one workshop and ran the 3rd party out"
        },
        {
            value = 3,
            description = "Score of 3 indicates you value the 3rd party workshops"
        },
        {
            value = 4,
            description = "Score of 4 indicates you interact regularly with 3rd parties"
        },
        {
            value = 5,
            description = "Score of 5 indicates you and third parties are partners"
        }
    ],
    comparisonScore = 1,
    type = "dropdown"
    
}

var frameworkInfo = {
    sections = [
        {
            name = "Organizational Capability",
            capabilities = [
                {
                    name = "CL1",
                    description = "Recognition of need",
                    questions = [question1Info, question2Info, question3Info]
                }
            ]
        }
    ]
};
