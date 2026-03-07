const { Telegraf, Scenes, session } = require('telegraf');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('BOT_TOKEN is missing in .env file');
  process.exit(1);
}

const bot = new Telegraf(token);

// --- Constants & Data ---
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

// --- Scene Logic ---
const leadScene = new Scenes.WizardScene(
  'LEAD_GENERATION_SCENE',
  // Step 1: Welcome & Service Selection
  async (ctx) => {
    await ctx.reply(
      `Hello and welcome to Stilla Systems.\n\n` +
      `We help businesses Automate, Operate, and Scale using:\n` +
      `• Websites\n` +
      `• AI customer support agents\n` +
      `• Voice AI agents\n` +
      `• Business workflow automation\n\n` +
      `Which of these best describes what you need?\n\n` +
      `1️⃣ Website development\n` +
      `2️⃣ AI customer support assistant\n` +
      `3️⃣ Voice AI agent\n` +
      `4️⃣ Business automation\n` +
      `5️⃣ Consultation`
    );
    return ctx.wizard.next();
  },
  // Step 2: Handle Service Selection
  async (ctx) => {
    const choice = ctx.message?.text?.trim();
    if (SERVICES[choice]) {
      ctx.wizard.state.leadData = { serviceRequested: SERVICES[choice] };
      await ctx.reply(`Great! Let's get some details about your ${SERVICES[choice]} project.`);
      await ctx.reply(QUESTIONS[0].text);
      ctx.wizard.state.questionIndex = 0;
      return ctx.wizard.next();
    } else {
      await ctx.reply('Please select a valid option (1-5).');
      return;
    }
  },
  // Step 3-10: Dynamic Questioning
  async (ctx) => {
    const qIndex = ctx.wizard.state.questionIndex;
    const currentQuestion = QUESTIONS[qIndex];
    ctx.wizard.state.leadData[currentQuestion.id] = ctx.message?.text;

    const nextIndex = qIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      ctx.wizard.state.questionIndex = nextIndex;
      await ctx.reply(QUESTIONS[nextIndex].text);
      return; // Stay in this step until all questions are answered
    } else {
      // All questions answered, generate summary
      const data = ctx.wizard.state.leadData;
      const summary = 
        `New Lead — Stilla Systems\n` +
        `--------------------------\n` +
        `Client Name: ${ctx.from.first_name} ${ctx.from.last_name || ''}\n` +
        `Business Name: ${data.businessName}\n` +
        `Industry: ${data.businessType}\n` +
        `Service Requested: ${data.serviceRequested}\n` +
        `Problem Description: ${data.problem}\n` +
        `Goal: ${data.goal}\n` +
        `Budget Range: ${data.budget}\n` +
        `Timeline: ${data.timeline}\n` +
        `Contact: ${data.contact}\n` +
        `Recommended Solution: ${data.serviceRequested} Strategy\n`;

      await ctx.reply(summary);
      await ctx.reply(
        `Thank you. Your request has been recorded.\n\n` +
        `A Stilla Systems consultant will review your project and contact you shortly.\n\n` +
        `If you'd like, I can also prepare a project estimate preview.`
      );
      return ctx.scene.leave();
    }
  }
);

const stage = new Scenes.Stage([leadScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('LEAD_GENERATION_SCENE'));

bot.launch().then(() => {
  console.log('Stilla Systems Client Assistant is running in production mode...');
}).catch((err) => {
  console.error('Failed to launch bot:', err);
});

// Global error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('An unexpected error occurred. Please try again later.');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
