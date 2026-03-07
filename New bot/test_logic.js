// Mocking the bot logic for validation
const SERVICES = {
  '1': 'Website Development',
  '2': 'AI Customer Support Assistant',
  '3': 'Voice AI Agent',
  '4': 'Business Automation',
  '5': 'Consultation'
};

const QUESTIONS = [
  { id: 'businessName', text: 'What is the name of your business?' },
  { id: 'businessType', text: 'What type of business do you run?' },
  { id: 'problem', text: 'What problem are you trying to solve?' },
  { id: 'goal', text: 'What result are you hoping to achieve?' },
  { id: 'existingSystem', text: 'Do you already have a website or system?' },
  { id: 'timeline', text: 'What is your expected timeline?' },
  { id: 'budget', text: 'What budget range are you considering?' },
  { id: 'contact', text: 'What is the best phone or email to reach you?' }
];

function simulateConversation(inputs) {
  let state = {
    leadData: {},
    questionIndex: -1,
    step: 0
  };

  console.log("--- Starting Conversation Simulation ---");

  for (let input of inputs) {
    if (state.step === 0) {
      console.log("Bot: Hello and welcome to Stilla Systems...");
      console.log("User: " + input);
      if (SERVICES[input]) {
        state.leadData.serviceRequested = SERVICES[input];
        state.step = 1;
        state.questionIndex = 0;
        console.log("Bot: Great! Let's get some details about your " + SERVICES[input] + " project.");
        console.log("Bot: " + QUESTIONS[0].text);
      } else {
        console.log("Bot: Please select a valid option (1-5).");
      }
    } else if (state.step === 1) {
      console.log("User: " + input);
      let currentQuestion = QUESTIONS[state.questionIndex];
      state.leadData[currentQuestion.id] = input;
      state.questionIndex++;

      if (state.questionIndex < QUESTIONS.length) {
        console.log("Bot: " + QUESTIONS[state.questionIndex].text);
      } else {
        console.log("--- Final Lead Summary ---");
        const summary = 
          `New Lead — Stilla Systems\n` +
          `--------------------------\n` +
          `Client Name: Test User\n` +
          `Business Name: ${state.leadData.businessName}\n` +
          `Industry: ${state.leadData.businessType}\n` +
          `Service Requested: ${state.leadData.serviceRequested}\n` +
          `Problem Description: ${state.leadData.problem}\n` +
          `Goal: ${state.leadData.goal}\n` +
          `Budget Range: ${state.leadData.budget}\n` +
          `Timeline: ${state.leadData.timeline}\n` +
          `Contact: ${state.leadData.contact}\n` +
          `Recommended Solution: ${state.leadData.serviceRequested} Strategy\n`;
        console.log(summary);
        console.log("Bot: Thank you. Your request has been recorded...");
        break;
      }
    }
  }
}

const testInputs = [
  '2', // AI Customer Support
  'TechCorp', // Business Name
  'SaaS', // Business Type
  'High support volume', // Problem
  'Reduce response time', // Goal
  'Zendesk', // Existing System
  '3 months', // Timeline
  '$5k - $10k', // Budget
  'test@example.com' // Contact
];

simulateConversation(testInputs);
