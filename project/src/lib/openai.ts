import OpenAI from 'openai';

class APIKeyError extends Error {
  constructor() {
    super('OpenAI API key is missing or invalid. Please check your configuration.');
    this.name = 'APIKeyError';
  }
}

const validateAPIKey = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new APIKeyError();
  }
  return apiKey;
};

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: validateAPIKey(),
  dangerouslyAllowBrowser: true
});

export async function analyzeImage(imageBase64: string) {
  try {
    validateAPIKey();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this DIY project image and provide: 1. Required materials, 2. Step-by-step instructions, 3. Tips and techniques" },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof APIKeyError) {
      throw error;
    }
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please try again later.');
  }
}

export async function analyzeText(description: string) {
  try {
    validateAPIKey();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a chatbot specialized in arts and crafts DIY projects. Only respond to queries related to arts, crafts, and creative DIY topics. If a question is unrelated, politely inform the user that you only handle arts and crafts topics and suggest related areas like painting, knitting, sewing, or origami. Format the response in three sections: MATERIALS:, STEPS:, and TIPS:"
        },
        {
          role: "user",
          content: description
        }
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof APIKeyError) {
      throw error;
    }
    console.error('Error analyzing text:', error);
    throw new Error('Failed to analyze text. Please try again later.');
  }
}