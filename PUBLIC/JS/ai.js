async function askAI() {

    const question =
        document.getElementById("question").value.trim();

    const answer =
        document.getElementById("answer");


    if (question === "") {

        answer.innerText =
            "Please enter your question.";

        return;
    }


    answer.innerText =
        "AI is thinking...";


    try {

        const response = await fetch(
            "/api/ai",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "AI request failed"
            );

        }


        answer.innerText =
            data.answer;


    } catch (error) {
    console.error("AI ERROR:", error);
    answer.innerText = "AI Error: " + error.message;
}
}