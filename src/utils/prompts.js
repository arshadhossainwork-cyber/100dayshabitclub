const PROMPTS_KEY = 'habitClub_prompts';
const DEFAULT_PROMPTS = { firstHabit: false, secondHabit: false, streak: false };

export function loadPromptState() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROMPTS_KEY) || '{}');
    return { ...DEFAULT_PROMPTS, ...stored };
  } catch {
    return { ...DEFAULT_PROMPTS };
  }
}

export function dismissPrompt(key) {
  const state = loadPromptState();
  state[key] = true;
  localStorage.setItem(PROMPTS_KEY, JSON.stringify(state));
}

export function dismissAllPrompts() {
  const state = {};
  for (const key of Object.keys(DEFAULT_PROMPTS)) {
    state[key] = true;
  }
  localStorage.setItem(PROMPTS_KEY, JSON.stringify(state));
}
